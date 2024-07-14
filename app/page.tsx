import { redirect } from "next/navigation";

export default async function HomePageRedirect(): Promise<void> {
    redirect("/home");
}