import { hash, compare } from 'bcryptjs'

export class User {
	private _passwordHash = ''

	constructor(private readonly _email: string, private readonly _name: string, passwordHash?: string) {
		if (passwordHash) this._passwordHash = passwordHash
	}

	get email() {
		return this._email
	}

	get name() {
		return this._name
	}

	get password() {
		return this._passwordHash
	}

	async setPassword(pass: string, salt: number) {
		this._passwordHash = await hash(pass, salt)
	}

	async comparePassword(pass: string) {
		return compare(pass, this._passwordHash)
	}
}
