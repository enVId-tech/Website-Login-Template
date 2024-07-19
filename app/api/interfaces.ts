interface UserData {
    displayName: string;
    email: string;
    firstName: string;
    hd: string | null;
    lastName: string | null;
    profilePicture: string;
}

interface RegisterData {
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
}

export type { UserData, RegisterData };