type FormErrorType = {
    email?: string
    password?: string
    checkPassword?: string
}
export const checkPasswordValidation = (values: FormErrorType, checkPassword: string | undefined) => {
    if (!values.checkPassword) {
        checkPassword = 'Required';
    } else if (values.checkPassword !== values.password) {
        checkPassword = 'Passwords should be equal';
    }
    return checkPassword
}
export const emailValidation = (values: FormErrorType, email: string | undefined) => {
    if (!values.email) {
        email = 'Required';
    } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        email = 'Invalid email address'
    }
    return email
}
export const passwordValidation = (values: FormErrorType, password: string | undefined) => {
    if (!values.password) {
        password = 'Required';
    } else if (values.password.length < 7) {
        password = 'Must be 7 characters at least';
    }
    return password
}
