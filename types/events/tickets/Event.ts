import { Audits } from '~/types/Audits'

export interface Event {
	name: string
	address: string
	audits: Audits[]
	expirationDate: string
	adultPrice: number
	childPrice: number
	startDate: string
}
