<template>
	<div class="container ticket-page-container">
		<div v-if="!isLoading" class="ticket-page">
			<Header :event="event" />
			<CalendarWeek
				:selectedDate="selectedDate"
				:selectedDay="selectedDay"
				:nextDate="nextDate"
				:prevDate="prevDate"
				:selectTime="selectTime"
				:dates="dates"
				:dayIndex="dayIndex"
			/>
			<BuyCard
				v-if="
					selectedTimeId &&
					times &&
					$store.getters.getBookingById(selectedTimeId).length > 0
				"
				:selectedDate="selectedDate"
				:time="times.find(el => +el.id === selectedTimeId)?.time"
				:address="event.address"
				:adultPrice="event.adultPrice"
				:booking="$store.getters.getBookingById(selectedTimeId)"
				:childPrice="event.childPrice"
			/>
			<div
				v-if="times?.length !== 0 && isShowTime && !isLoadingTime"
				class="ticket-time-list"
			>
				<el-tooltip
					class="ticket-time-list__item"
					v-for="(item, index) in times"
					:key="index"
					effect="dark"
					:content="'Осталось ' + item.countPlaces + ' билетов'"
					placement="bottom"
				>
					<el-button
						:class="
							selectedTimeId == +item.id && 'ticket-time-list__item_selected'
						"
						@click="
							setSelectedTime(+item.id),
								$router.push({
									query: { ...$route.query, time: item.time.toString() }
								})
						"
						>{{ item.time.slice(0, 5) }}</el-button
					>
				</el-tooltip>
				<div
					v-if="countSelelected() === maxCountSelectedTicket"
					class="ticket-time-list__max-selected"
				>
					Выбрано максимально возможное количество билетов
				</div>
			</div>
			<div v-if="isLoadingTime" class="ticket-time-loading">
				<i class="el-icon-loading"></i>
			</div>
			<div
				v-else-if="times?.length === 0 && isShowTime && !isLoadingTime"
				class="ticket-time-not-found"
			>
				На данный момент все билеты проданы. Следите за сайтом
			</div>

			<div v-if="isCategory" class="ticket-category">
				<div class="ticket-category-header">
					<span class="ticket-category-header__category"> Категория</span>
					<span class="ticket-category-header__price">Стоимость</span>
					<span class="ticket-category-header__count">Количество</span>
				</div>
				<div class="ticket-category-item">
					<span class="ticket-category-item__category"
						>Взрослый (РФ и другие страны ЕАЭС)
					</span>
					<span class="ticket-category-item__price"
						>{{ event.adultPrice }} ₽
					</span>
					<div class="ticket-category-item-count">
						<i @click="decreaseAbultCount()" class="el-icon-remove-outline"></i>
						<span class="ticket-category-item-count__number">{{
							adultCountTicket
						}}</span>
						<i
							@click="increaseAdultCount()"
							class="el-icon-circle-plus-outline"
						></i>
					</div>
				</div>
				<div class="ticket-category-item">
					<span class="ticket-category-item__category"
						>Дети в возрасте до 6 лет включительно
					</span>
					<span class="ticket-category-item__price"
						>{{ event.childPrice }} ₽
					</span>
					<div class="ticket-category-item-count">
						<i @click="decreaseChildCount()" class="el-icon-remove-outline"></i>
						<span class="ticket-category-item-count__number">{{
							childCountTicket
						}}</span>
						<i
							@click="increaseChildCount()"
							class="el-icon-circle-plus-outline"
						></i>
					</div>
				</div>
			</div>
		</div>
		<div v-else class="ticket-loading">
			<i class="el-icon-loading"></i>
		</div>
	</div>
</template>
<script lang="ts">
import Vue from 'vue'

// Types
import { Event } from '~/types/events/tickets/Event'
import { Schedule } from '~/types/events/tickets/Schedule'
import { Time } from '~/types/events/tickets/Time'

// Components
import BuyCard from '@/components/events/tickets/BuyCard.vue'
import Header from '~/components/events/tickets/Header.vue'
import CalendarWeek from '~/components/events/tickets/CalendarWeek.vue'

export default Vue.extend({
	layout: 'pages',
	name: 'ticket-id',
	components: { BuyCard, Header, CalendarWeek },
	data() {
		return {
			// get axios
			schedule: null as unknown as Schedule[],
			times: null as unknown as Time[],
			event: null as unknown as Event,

			// date list(calendar)
			dates: [] as string[],
			dayIndex: 0,
			selectedDate: null as unknown as string,
			selectedDay: null as unknown as number,

			// time list
			selectedTimeId: null as unknown as number,
			isLoadingTime: false,
			isShowTime: false,

			// category
			isCategory: false,
			maxCountSelectedTicket: this.$store.getters.getMaxCountSelectedTicket,
			childCountTicket: 0,
			adultCountTicket: 0,

			// main
			isLoading: true
		}
	},
	async fetch() {
		await this.$axios
			.$get('/schedule/' + this.$route.params.id)
			.then(res => {
				this.schedule = res
			})
			.catch(err => {
				console.log(err)
			})
		await this.$axios
			.$get('/events/' + this.$route.params.id)
			.then(res => {
				this.event = res
			})
			.catch(err => {
				console.log(err)
			})

		let loop = true
		let startDate =
			new Date() > new Date(this.event.startDate)
				? new Date()
				: new Date(this.event.startDate)
		while (startDate.getDay() != 1) {
			startDate.setDate(startDate.getDate() - 1)
		}
		let endDate = new Date(this.event.expirationDate)

		while (loop) {
			this.dates.push(
				startDate.getFullYear() +
					'-' +
					('0' + (startDate.getMonth() + 1)).slice(-2) +
					'-' +
					('0' + startDate.getDate()).slice(-2)
			)
			startDate.setDate(startDate.getDate() + 1)

			if (startDate > endDate) {
				loop = false
			}
		}

		let dateRoute: string = this.$route.query.date?.toString()

		if (dateRoute) {
			let dayIndex = this.dates.findIndex(el => el === dateRoute)

			if (dayIndex > 6) {
				this.dayIndex = Math.floor(dayIndex / 7) * 7
			}

			this.selectedDate = dateRoute
			this.selectedDay = new Date(dateRoute).getDay()
			this.isShowTime = true
			await this.getTime()
			if (this.$route.query.time) {
				let selectTime = decodeURI(this.$route.query.time.toString())

				this.setSelectedTime(this.times.find(el => el.time === selectTime)?.id!)
			}
		}

		this.isLoading = false
	},
	methods: {
		prevDate() {
			this.dayIndex -= 7
			this.selectedDay = NaN
			this.selectedTimeId = NaN
			this.selectedDate = ''
			this.isShowTime = false
			this.isCategory = false
			this.clearCount()
			this.$router.push({ query: {} })
		},
		nextDate() {
			this.dayIndex += 7
			this.selectedDay = NaN
			this.selectedTimeId = NaN
			this.selectedDate = ''
			this.isShowTime = false
			this.isCategory = false
			this.clearCount()
			this.$router.push({ query: {} })
		},
		increaseAdultCount() {
			if (
				this.adultCountTicket < 5 &&
				this.countSelelected() < this.maxCountSelectedTicket
			) {
				this.adultCountTicket += 1
				this.$store.commit('setBooking', {
					id: +this.selectedTimeId,
					isChild: false
				})
			}
		},
		decreaseAbultCount() {
			if (this.adultCountTicket > 0) {
				this.adultCountTicket -= 1
				this.$store.commit('deleteBookingByIdAndIsChild', {
					id: this.selectedTimeId,
					isChild: false
				})
			}
		},
		increaseChildCount() {
			if (
				this.childCountTicket < 5 &&
				this.countSelelected() < this.maxCountSelectedTicket
			) {
				this.childCountTicket += 1
				this.$store.commit('setBooking', {
					id: +this.selectedTimeId,
					isChild: true
				})
			}
		},
		decreaseChildCount() {
			if (this.childCountTicket > 0) {
				this.childCountTicket -= 1
				this.$store.commit('deleteBookingByIdAndIsChild', {
					id: this.selectedTimeId,
					isChild: true
				})
			}
		},
		clearCount() {
			this.adultCountTicket = 0
			this.childCountTicket = 0
		},
		setCount() {
			this.adultCountTicket = this.$store.getters.getBookingCountByIdAndIsChild(
				{
					id: +this.selectedTimeId,
					isChild: false
				}
			)
			this.childCountTicket = this.$store.getters.getBookingCountByIdAndIsChild(
				{
					id: this.selectedTimeId,
					isChild: true
				}
			)
		},
		countSelelected(): number {
			return this.$store.getters.getBookingCount
		},
		setSelectedTime(timeId: number) {
			this.isCategory = true
			this.selectedTimeId = timeId
			this.setCount()
		},

		async selectTime(date: string, day: number) {
			this.selectedDay = day
			this.selectedDate = date
			this.selectedTimeId = NaN
			this.isCategory = false
			this.isShowTime = true

			this.clearCount()
			await this.getTime()
		},
		async getTime() {
			this.isLoadingTime = true
			let schedule = this.schedule.find(i => i.date == this.selectedDate)
			let now = new Date().setHours(0, 0, 0, 0)
			let date = new Date(schedule?.date!).setHours(0, 0, 0, 0)
			if (date >= now) {
				await this.$axios
					.$get(`/time/${schedule?.id}`)
					.then((res: Time[]) => {
						if (now === date) {
							this.times = res.filter(el => {
								if (+el.time.split(':')[0] > new Date().getHours()) {
									return +el.time.split(':')[0] > new Date().getHours()
								} else if (
									+el.time.split(':')[0] >= new Date().getHours() &&
									+el.time.split(':')[1] > new Date().getMinutes()
								) {
									return (
										+el.time.split(':')[0] >= new Date().getHours() &&
										+el.time.split(':')[1] > new Date().getMinutes()
									)
								}
							})
						} else {
							this.times = res
						}
					})
					.catch(err => {
						console.log(err)
					})
			} else {
				this.times = []
			}

			this.isLoadingTime = false
		}
	}
})
</script>
<style lang="scss">
.ticket-page {
	position: relative;
}
.ticket {
	&-container {
		width: 840px;
		margin: 0 auto;
	}
	&-loading {
		font-size: 50px;
		text-align: center;
		margin: 300px 0;
	}
	&-time {
		&-loading {
			font-size: 40px;
			margin: 50px 0;
			text-align: center;
		}
		&-not-found {
			font-size: 30px;
			opacity: 0.5;
			margin: 100px 0;
			text-align: center;
		}
		&-list {
			width: 840px;
			margin: 50px;
			&__max-selected {
				margin-top: 50px;
				color: rgb(200, 0, 0);
			}
			&__item {
				background-color: transparent;
				letter-spacing: 1.5px;
				display: inline-block;
				padding: 10px 20px;
				margin-right: 10px;
				&_selected {
					border: 1px solid orange;
				}
				&:hover {
					background-color: transparent;
					color: black;
					border-color: orange;
				}
				&:focus {
					background-color: transparent;
					color: black;
					border-color: orange;
				}
			}
		}
	}

	&-category {
		display: grid;
		width: 840px;
		margin-bottom: 50px;
		margin-left: 50px;
		grid-template-rows: 60px 80px 80px;
		&-header {
			display: grid;
			grid-template-columns: 60% 20% 20%;
			opacity: 0.5;
			font-size: 14px;
			text-transform: uppercase;
			&__category {
				align-self: center;
				justify-self: start;
			}
			&__price {
				align-self: center;
				justify-self: center;
			}
			&__count {
				align-self: center;
				justify-self: center;
			}
		}
		&-item {
			display: grid;
			grid-template-columns: 60% 20% 20%;
			border-top: 1px solid rgba(0, 0, 0, 0.5);
			&__category {
				align-self: center;
				justify-self: start;
			}
			&__price {
				align-self: center;
				justify-self: center;
			}
			&-count {
				align-self: center;
				justify-self: center;
				display: grid;
				grid-template-columns: 1fr auto 1fr;
				i {
					cursor: pointer;
					font-size: 40px;
					color: rgb(0, 0, 0);
					opacity: 0.5;
					transition: opacity 0.3s;
					&:hover {
						opacity: 0.8;
					}
				}
				&__number {
					padding: 0 10px;
					align-self: center;
					justify-self: center;
				}
			}
		}
	}
}
@media (max-width: 1600px) {
	.ticket {
		&-header {
			margin: 0 auto 50px auto;
		}
		&-page {
			&-container {
				width: 100% !important;
				padding: 0 50px;
			}
		}
	}
}
</style>
