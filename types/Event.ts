import { Audits } from './Audits'
import { Category } from './Category'

export interface Event {
	id: number
	name: string
	banner: string
	category: Category
	audits: Audits[]
	address: string
	startDate: string
	expirationDate: string
	phone: string
	schedule: string
	adultPrice: number
	childPrice: number
	description: string
	aboutMe: string
}
