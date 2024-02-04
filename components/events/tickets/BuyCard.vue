<template>
	<div class="ticket-buy-card">
		<div class="ticket-buy-card-body">
			<div class="ticket-buy-card-body-row-1 ticket-buy-card-body-row">
				<div class="ticket-buy-card-body-row-1-item">
					<span class="ticket-buy-card-body-row-1-item__col-1">Дата</span>
					<span class="ticket-buy-card-body-row-1-item__col-2"
						>{{ selectedDate?.split('-')[2] }} {{ month() }}, {{ day() }}</span
					>
				</div>
				<div class="ticket-buy-card-body-row-1-item">
					<span class="ticket-buy-card-body-row-1-item__col-1">Время</span>
					<span class="ticket-buy-card-body-row-1-item__col-2">
						{{ time?.slice(0, 5) }}
					</span>
				</div>
				<div class="ticket-buy-card-body-row-1-item">
					<span class="ticket-buy-card-body-row-1-item__col-1">Адрес</span>
					<span class="ticket-buy-card-body-row-1-item__col-2">{{
						address
					}}</span>
				</div>
			</div>
			<div class="ticket-buy-card-body-row-2 ticket-buy-card-body-row">
				<div
					v-if="booking.find(el => el.isChild == false)"
					class="ticket-buy-card-body-row-2-item"
				>
					<span class="ticket-buy-card-body-row-2-item__col-1"
						>Взрослые (РФ и другие страны ЕАЭС)</span
					>
					<span class="ticket-buy-card-body-row-2-item__col-2"
						>{{ booking.filter(el => el.isChild === false).length }} ×
						{{ adultPrice }} ₽
					</span>
				</div>
				<div
					v-if="booking.find(el => el.isChild == true)"
					class="ticket-buy-card-body-row-2-item"
				>
					<span class="ticket-buy-card-body-row-2-item__col-1"
						>Дети в возрасте до 6 лет включительно</span
					>
					<span class="ticket-buy-card-body-row-2-item__col-2"
						>{{ booking.filter(el => el.isChild === true).length }} ×
						{{ childPrice }} ₽
					</span>
				</div>
			</div>
			<div class="ticket-buy-card-body-row-3">
				<div class="ticket-buy-card-body-row-3-item">
					<div class="ticket-buy-card-body-row-3-item__col-1">Итого:</div>
					<div class="ticket-buy-card-body-row-3-item__col-2">
						{{
							(booking.filter(el => el.isChild === true).length > 0
								? booking.filter(el => el.isChild === true).length * childPrice
								: 0) +
							(booking.filter(el => el.isChild === false).length > 0
								? booking.filter(el => el.isChild === false).length * adultPrice
								: 0)
						}}
						₽
					</div>
				</div>
			</div>
		</div>

		<nuxt-link to="cart" class="ticket-buy-card-btn"
			><span>Оформить заказ</span></nuxt-link
		>
	</div>
</template>
<script lang="ts">
import Vue, { PropType } from 'vue'

// Utils
import { dayWord } from '~/utils/day'
import { monthWord } from '~/utils/month'

// Types
import { Booking } from '~/types/Booking'

export default Vue.extend({
	name: 'buy-card-body',
	props: {
		selectedDate: String,
		time: String,
		address: String,
		booking: Array as PropType<Booking[]>,
		adultPrice: Number,
		childPrice: Number
	},
	methods: {
		month() {
			return monthWord[new Date(this.selectedDate).getMonth()]
		},
		day() {
			return dayWord[new Date(this.selectedDate).getDay()]
		}
	}
})
</script>
<style lang="scss">
.ticket-buy-card {
	position: absolute;
	top: 30%;
	right: 0;
	width: 350px;
	display: grid;
	grid-template-rows: auto 60px;
	border: 1px solid rgba(0, 0, 0, 0.4);
	&-body {
		padding: 30px;
		&-row {
			border-bottom: 1px solid rgba(0, 0, 0, 0.2);
			&-1 {
				&-item {
					margin-bottom: 20px;
					display: grid;
					grid-template-columns: 30% 70%;
					&__col {
						&-1 {
							opacity: 0.5;

							align-self: start;
							letter-spacing: 0.8px;
						}
						&-2 {
							justify-self: end;
							align-self: center;
							letter-spacing: 0.8px;
							text-align: right;
						}
					}
				}
			}
			&-2 {
				padding-top: 30px;
				&-item {
					margin-bottom: 30px;
					display: grid;
					grid-template-columns: 70% 30%;
					grid-column-gap: 10px;
					&__col {
						&-1 {
							font-size: 14px;
							opacity: 0.5;
						}
						&-2 {
							font-size: 18px;
							justify-self: end;
							font-weight: 500;
						}
					}
				}
			}
			&-3 {
				padding-top: 30px;
				&-item {
					display: grid;
					grid-template-columns: 1fr 1fr;

					&__col {
						&-1 {
							color: #b4966e;
							align-self: center;
							text-transform: uppercase;
						}
						&-2 {
							align-self: center;
							justify-self: end;
							font-size: 25px;
							font-weight: bold;
							color: #b4966e;
						}
					}
				}
			}
		}
	}
	&-btn {
		display: grid;

		transition: background-color 0.3s;
		background-color: #b4966e;
		cursor: pointer;
		span {
			color: white;
			text-transform: uppercase;
			align-self: center;
			justify-self: center;
		}
		&:hover {
			background-color: #bda07a;
		}
	}
}
</style>
