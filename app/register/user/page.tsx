import styles from '@/styles/userregister.module.scss';

export default function RegisterUserPage() {
    return (
        <div className={styles.registerUserPage}>
            <h1>Register User</h1>
            <form>
                <label htmlFor="username">Username</label>
                <input type="text" id="username" name="username" required />
                <label htmlFor="email">Email</label>
                <input type="email" id="email" name="email" required />
                <label htmlFor="password">Password</label>
                <input type="password" id="password" name="password" required />
                <label htmlFor="confirmPassword">Confirm Password</label>
                <input type="password" id="confirmPassword" name="confirmPassword" required />
                <button>Register</button>
            </form>
        </div>
    );
}