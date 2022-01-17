export class HttpError extends Error {
	constructor(public statusCode: number, message: string, public errorCtx?: string) {
		super(message)
	}
}
