export class LoginFailedError extends Error {

    constructor() {
        super('Failed to login with the given credentials')
    }
}