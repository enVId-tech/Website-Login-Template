import { redirect } from 'next/navigation';

export default async function CredentialsRedirect() {
    redirect('/credentials/login');
}