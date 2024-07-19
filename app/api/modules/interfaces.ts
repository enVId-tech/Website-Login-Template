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
interface EventsPrelim {
    eventName: string;
    eventDescription: string;
    eventLocation: string;
    eventTime: string;
    eventDate: string;
    eventId: string;
}
interface EventsData<EventsPrelim> {
    [x: string]: unknown;
    events: EventsPrelim[];
    eventId: string;
    userId?: string;
    length?: number;
}

interface UserLoginData {
    username: string;
    password: string;
}

export type { UserData, RegisterData, EventsPrelim, EventsData, UserLoginData };