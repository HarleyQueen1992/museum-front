import { Category } from '../Category'

export interface Event {
	id: number
	name: string
	banner: string
	category: Category
	address: string
	startDate: string
	expirationDate: string
}
