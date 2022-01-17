import 'reflect-metadata'

const Injectable = (key: string) => (target: Function) => {
	Reflect.defineMetadata(key, key, target)

	const meta = Reflect.getMetadata(key, target)

	console.log('meta', meta)
}

const Inject = (key: string) => (target: any, propName: string, index: number) => {
	Reflect.defineMetadata(key, key, target)

	const meta = Reflect.getMetadata(key, target)

	console.log('meta', meta)
}

function Prop(target: Object, propName: string) {
	console.log(target, propName)
}

@Injectable('C')
export class C {
	@Prop
	prop: number
}

@Injectable('D')
export class D {
	constructor(@Inject('C') public c: C) {}
}
