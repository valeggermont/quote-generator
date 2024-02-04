export class ApiError extends Error {

    constructor(public readonly msg: string, public readonly code: number) {
        super(msg)
    }
}