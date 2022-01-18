const Component = (id: number) => {
	console.log('init Component')

	return (target: Function) => {
		console.log('run Component')
		target.prototype.id = id
	}
}

const Logger = () => {
	console.log('init Logger')

	return (target: Function) => {
		console.log('run Logger')
	}
}

const Method = (target: Object, methodName: string, propertyDescriptor: PropertyDescriptor) => {
	console.log(target)
	console.log(methodName)
	const oldMethod = propertyDescriptor.value
	propertyDescriptor.value = function (...args: unknown[]) {
		if (typeof args[0] === 'number') {
			oldMethod.call(target, args[0] * 10)
		}
	}
}

function Prop(target: any, propName: string) {
	let value = 0
	const getter = () => {
		console.log('Get!', value)
		return value
	}

	const setter = (newValue: number) => {
		console.log('Set!', newValue)
		value = newValue
	}

	Object.defineProperty(target, propName, { get: getter, set: setter })
}

function Param(target: any, propName: string, index: number) {
	console.log(propName, index)
}

@Logger()
@Component(1)
export class UserTest {
	@Prop
	id: number

	@Method
	updateId(@Param newId: number) {
		this.id = newId
		return this.id
	}
}

console.log(new UserTest().id)
console.log(new UserTest().updateId(2))
