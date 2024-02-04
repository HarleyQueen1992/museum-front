import Vuex from 'vuex'
import { Booking } from '~/types/Booking'

const createStore = () => {
	return new Vuex.Store({
		state: () => ({
			booking: [] as Booking[],
			maxCountSelectedTicket: 10
		}),
		getters: {
			getBooking: state => {
				return state.booking
			},
			getMaxCountSelectedTicket: state => {
				return state.maxCountSelectedTicket
			},
			getBookingCountByIdAndIsChild: state => (payload: Booking) => {
				return state.booking.filter(
					el => el.id == payload.id && el.isChild == payload.isChild
				).length
			},
			getBookingById: state => (payload: number) => {
				return state.booking.filter(el => el.id == payload)
			},
			getBookingCount: (state): number => {
				return state.booking.length
			}
		},
		mutations: {
			setBooking: (state, payload: Booking) => {
				state.booking?.push(payload)
			},
			clearBooking: (state, payload) => {
				state.booking = []
			},
			deleteBookingByIdAndIsChild: (state, payload: Booking) => {
				const idxObj = state.booking.findIndex(object => {
					return object.isChild === payload.isChild && object.id === payload.id
				})

				state.booking.splice(idxObj, 1)
			},
			deleteBookingById: (state, payload: number) => {
				state.booking = state.booking.filter(el => el.id != payload)
			}
		}
	})
}

export default createStore
