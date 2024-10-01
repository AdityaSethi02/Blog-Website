
export const validatePassword = (password: string): string | null => {
    const minLength = 6;
    const hasUpperCase = /[A-Z]/.test(password);
    const hasNumber = /\d/.test(password);

    if (password.length < minLength) {
        return "Password must be at least 6 characters long";
    }
    if (!hasUpperCase) {
        return "Password must contain at least one uppercase letter";
    }
    if (!hasNumber) {
        return "Password must contain at least one number";
    }
    return null;
};
