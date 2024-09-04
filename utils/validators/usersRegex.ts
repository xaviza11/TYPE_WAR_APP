function IS_VALID_NAME(name: string) {
    const nameRegex = /^[A-Za-zÁÉÍÓÚáéíóúÑñ0-9\s-_]+$/;
    return nameRegex.test(name);
}

function IS_VALID_PASSWORD(password: string) {
    if (password.length < 6) return false
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d).+$/;
    return passwordRegex.test(password);
}

function IS_VALID_EMAIL(email: string) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email)
}

export { IS_VALID_EMAIL, IS_VALID_PASSWORD, IS_VALID_NAME }