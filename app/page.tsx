import { redirect } from "next/navigation";
import RootLayout from "./layout.tsx";

export default async function HomePageRedirect(): Promise<void> {
    <RootLayout>
        {redirect("/home")}
    </RootLayout>
}