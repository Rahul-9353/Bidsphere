export function validatePassword(password) {
    const errors = [];
    if (password.length < 8) {
        errors.push('At least 8 characters');
    }
    if (!/[a-z]/.test(password)) {
        errors.push('One lowercase letter');
    }
    if (!/[A-Z]/.test(password)) {
        errors.push('One uppercase letter');
    }
    if (!/\d/.test(password)) {
        errors.push('One number');
    }
    if (!/[@$!%*?&#^()_\-+=]/.test(password)) {
        errors.push('One special character');
    }
    return errors;
}