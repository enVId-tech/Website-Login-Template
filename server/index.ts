import express, { Express } from "express";
import {
    APP_HOSTNAME,
    SERVER_PORT,
    CLIENT_ID,
    CLIENT_SECRET,
    // CLIENT_PORT,
} from "./modules/env";
// import session from "express-session";
import session from "cookie-session";
import passport from "passport";
import GoogleStrategy from "passport-google-oauth20";
import dotenv from "dotenv";
import encrypts, {
    comparePassword,
    generateRandomNumber,
} from "./modules/encryption";
import {
    deleteFromDatabase,
    getItemsFromDatabase,
    modifyInDatabase,
    writeToDatabase,
} from "./modules/mongoDB";
import { EventsData, EventsPrelim } from "./modules/interface";
import cookieParser from "cookie-parser";
import path from "path";
import { fileURLToPath } from "url";
// import { createProxyMiddleware } from "http-proxy-middleware";

const app: Express = express();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(express.json());
app.set("trust proxy", true);
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));

// Host the client
const publicPath = path.join(__dirname, '..', 'public');
app.use(express.static(publicPath));

dotenv.config({ path: "./modules/credentials.env.local" });

const SECRET: string = await generateRandomNumber(128, "alphanumeric");

app.use(
    session({
        name: "session",
        keys: [SECRET],
        maxAge: 1000 * 60 * 60 * 24 * 3.5, // 3.5 days
        secure: false,
        httpOnly: true,
    })
);

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user, done) => {
    done(null, user as false | Express.User | null | undefined);
});

passport.use(
    // @ts-ignore
    new GoogleStrategy(
        {
            clientID: CLIENT_ID,
            clientSecret: CLIENT_SECRET,
            callbackURL: "/auth/google/callback",
        },
        (accessToken: any, _refreshToken: any, profile: any, done: (arg0: null, arg1: any) => any) => {
            return done(null, profile);
        }
    )
);

app.get("/auth/google", passport.authenticate("google", { scope: ["profile", "email"] }));

app.get(
    "/auth/google/callback",
    passport.authenticate("google", { session: false }),
    async (req, res) => {
        try {
            const userProfile: GoogleStrategy.Profile =
                req.user as GoogleStrategy.Profile;

            if (!userProfile) {
                throw new Error("No user profile found");
            }

            const fileData = JSON.parse(await getItemsFromDatabase("users"));

            let wasFound: boolean = false;

            fileData.forEach((element: { email: string }) => {
                if (element.email === userProfile.emails![0].value) {
                    wasFound = true;
                }
            });

            if (!wasFound) {
                const userId: string = await generateRandomNumber(128, "alphanumeric")

                const newUser = {
                    displayName: userProfile.displayName,
                    firstName: userProfile.name!.givenName,
                    lastName: userProfile.name!.familyName,
                    email: userProfile.emails![0].value,
                    profilePicture: userProfile.photos![0].value,
                    hd: userProfile._json.hd,
                    userId: userId
                };

                await writeToDatabase("users", newUser);

                await writeToDatabase("events", { userId: userId, events: [] });

                res.cookie("userId", userId, {
                    maxAge: 1000 * 60 * 60 * 24 * 3.5, // 3.5 days
                    httpOnly: true,
                });
            } else {
                const userId = fileData[0].userId;

                res.cookie("userId", userId, {
                    maxAge: 1000 * 60 * 60 * 24 * 3.5, // 3.5 days
                    httpOnly: true,
                });
            }

            // res.redirect(`http://${APP_HOSTNAME}:${CLIENT_PORT}`);
            res.redirect('/');
        } catch (error: unknown) {
            console.error("Error:", error as string);
        }
    }
);

app.get("/auth/logout", (req, res) => {
    try {
        res.clearCookie("userId");
        // res.redirect(`http://${APP_HOSTNAME}:${CLIENT_PORT}`);
        res.redirect('/');
    } catch (error: unknown) {
        console.error("Error:", error as string);
    }
});

app.get("/login/guest", async (req, res) => {
    try {
        res.cookie("userId", "guest", {
            maxAge: 1000 * 60 * 60 * 24 * 1, // 1 day
            httpOnly: true,
        });

        res.status(200).json({ status: 200, message: "Logged in as guest" });
    } catch (error: unknown) {
        console.error("Error:", error);
    }
});

app.post("/login/user", async (req, res) => {
    try {
        const data = req.body;

        if (!data) {
            throw new Error("No data found");
        }

        const fileData = JSON.parse(await getItemsFromDatabase("users", { email: data.username }));

        if (!fileData || fileData.length === 0) {
            res.status(404).json({ status: 404, message: "No data found" });
            throw new Error("No data found");
        } else if (fileData.length > 1) {
            res.status(500).json({ status: 500, message: "Multiple data found" });
            throw new Error("Multiple data found");
        }

        if (await comparePassword(data.password, fileData[0].password)) {
            res.cookie("userId", fileData[0].userId, {
                maxAge: 1000 * 60 * 60 * 24 * 3.5, // 3.5 days
                httpOnly: true,
            });

            res.status(200).json({ status: 200, message: "Logged in" });
        } else {
            res.status(401).json({ status: 401, message: "Incorrect password" });
        }
    } catch (error: unknown) {
        console.error("Error:", error);
    }
});

app.post("/post/user", async (req, res) => {
    try {
        if (req.cookies["userId"] === "guest") {
            res.status(401).json({ status: 401, message: "You must be logged in to view user data" });
            return;
        } else if (!req.cookies["userId"]) {
            res.status(404).json({ status: 404, message: "No data found" });
            return;
        }

        const fileData = JSON.parse(await getItemsFromDatabase("users", { userId: req.cookies["userId"] }));

        if (!fileData || fileData.length === 0) {
            res.status(404).json({ status: 404, message: "No data found" });
        } else if (fileData.length > 1) {
            await deleteFromDatabase({ userId: req.cookies["userId"] }, "users", "many");
            res.status(500).json({ status: 500, message: "Multiple data found" });
        }

        if (fileData[0]._id) {
            delete fileData[0]._id;
        }

        if (fileData[0].userId) {
            delete fileData[0].userId;
        }

        res.status(200).json(fileData);
    } catch (error: unknown) {
        console.error("Error:", error);
    }
});

app.post("/check/login", async (req, res) => {
    try {
        const data = req.cookies["userId"];

        if (!data) {
            res.status(404).json({ status: 404, message: "No data found" });
            return;
        }

        res.status(200).json({ status: 200, message: "Logged in" });
    } catch (error: unknown) {
        res.status(500).json({ status: 500, message: "Internal server error" });
        console.error("Error:", error);
    }
});

app.post("/credentials/logout", async (req, res) => {
    try {
        if (!req.session) {
            return res.status(400).json({ status: 400, message: "No data found" });
        }

        const data = req.cookies["userId"];

        if (!data) {
            return res.status(400).json({ status: 400, message: "No data found" });
        }

        await getItemsFromDatabase("users", { userId: data });

        res.clearCookie("userId");

        req.session.destroy((err: unknown) => {
            if (err) {
                console.error("Session destruction error:", err);
                return res.status(500).json({ status: 500, message: "Error during logout" });
            }
            res.clearCookie("userId");
            res.status(200).json({ status: 200, message: "Logged out" });
        });

    } catch (error) {
        console.error("Error:", error);
        res.status(500).json({ status: 500, message: "Internal server error" });
    }
});

app.get("/*", (req, res) => {
    if (req.url.includes("auth/google/callback") || req.url.includes("auth/google")) {
        return;
    } else {
        res.sendFile(path.join(publicPath, "index.html"), (err) => {
            if (err) {
                res.status(500).send(err);
            }
        });
    }
});


app.listen(SERVER_PORT, () => {
    console.log(`Server is running at http://${APP_HOSTNAME}:${SERVER_PORT}`);
});
