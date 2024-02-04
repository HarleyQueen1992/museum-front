<template>
	<div class="cart-page">
		<div class="container">
			<div class="cart-header">
				<h1 class="cart-header__title">Корзина</h1>
			</div>
			<Dialog
				:dialogVisible="dialogVisible"
				:dialogVisibleFalse="dialogVisibleFalse"
			/>
			<div v-if="!isLoading && carts.length !== 0" class="cart-list">
				<div class="cart-list-header cart-list-column">
					<span></span>
					<span>Количество</span>
					<span>Стоимость</span>
					<span></span>
				</div>
				<div
					class="cart-list-item cart-list-column"
					v-for="item in carts"
					:key="item.id"
				>
					<div class="cart-list-item-col-1">
						<div class="cart-list-item-col-1__event">Мероприятие</div>
						<div class="cart-list-item-col-1__name">
							{{ item.date.event.name }}
						</div>
						<div
							class="cart-list-item-col-1__category"
							v-if="item.countAdult > 0"
						>
							Взрослый (РФ и другие страны ЕАЭС)
						</div>
						<div
							class="cart-list-item-col-1__category"
							v-if="item.countChild > 0"
						>
							Дети в возрасте до 6 лет включительно
						</div>
						<div class="cart-list-item-col-1-date-address">
							<span class="cart-list-item-col-1-date-address__date"
								>{{ item.date.date.split('-')[2] }}
								{{ month(item.date.date.split('-')[1]) }}
								{{ item.date.date.split('-')[0] }} г.,
								{{ item.time.slice(0, 5) }}</span
							>
							<span class="cart-list-item-col-1-date-address__address">
								<i class="el-icon-location"></i>
								{{ item.date.event.address }}</span
							>
						</div>
					</div>
					<div class="cart-list-item-col-2">
						<div class="cart-list-item-col-2-count" v-if="item.countAdult > 0">
							<span class="cart-list-item-col-2-count__row-1"
								>{{ item.countAdult }} шт</span
							>
							<span class="cart-list-item-col-2-count__row-2">(Взрослый)</span>
						</div>
						<div class="cart-list-item-col-2-count" v-if="item.countChild > 0">
							<span class="cart-list-item-col-2-count__row-1"
								>{{ item.countChild }} шт</span
							>
							<span class="cart-list-item-col-2-count__row-2">(Детский)</span>
						</div>
					</div>
					<div class="cart-list-item-col-3">
						<div class="cart-list-item-col-3-price">
							<span
								>{{
									item.countAdult > 0 && item.countChild > 0
										? item.countAdult * item.date.event.adultPrice +
										  item.countChild * item.date.event.childPrice
										: item.countAdult > 0
										? item.countAdult * item.date.event.adultPrice
										: item.countChild * item.date.event.childPrice
								}}
								₽
							</span>
						</div>
					</div>
					<div class="cart-list-item-col-4">
						<i @click="deleteItem(+item.id)" class="el-icon-close"></i>
					</div>
				</div>
			</div>
			<div v-if="carts.length === 0" class="cart-empty">
				<div>Корзина пуста</div>
				<button
					@click="$router.push('/events')"
					class="cart-btns__continue-shopping cart-btns__btn"
				>
					Продолжить покупки
				</button>
			</div>
			<div class="cart-loading" v-if="isLoading">
				<i class="el-icon-loading"></i>
			</div>
			<div v-if="carts.length !== 0" class="cart-total">
				<span>Итого</span>
				<span>{{ total() }} ₽ </span>
			</div>
			<div v-if="carts.length !== 0" class="cart-btns">
				<button
					@click="$router.push('/events')"
					class="cart-btns__continue-shopping cart-btns__btn"
				>
					Продолжить покупки
				</button>
				<button
					@click="dialogVisible = true"
					class="cart-btns__make-purchases cart-btns__btn"
				>
					Оформить покупки
				</button>
			</div>
		</div>
	</div>
</template>
<script lang="ts">
import Vue from 'vue'

// Utils
import { monthZeroWord } from '~/utils/month'

// Types
import { Cart } from '@/types/events/tickets/cart/Cart'

// Components
import Dialog from '~/components/events/tickets/Dialog.vue'

export default Vue.extend({
	name: 'cart',
	layout: 'pages',
	components: { Dialog },
	data() {
		return {
			carts: [] as Cart[],
			isLoading: true,
			dialogVisible: false
		}
	},
	async fetch() {
		let booking = this.$store.getters.getBooking
		const result: { id: any }[] = []
		for (let i = 0; i < booking.length; i++) {
			let exists = false
			let obj = { id: booking[i].id, countChild: 0, countAdult: 0 }
			for (let j = 0; j < result.length; j++) {
				if (booking[i].id === result[j].id) {
					exists = true
					break
				}
			}
			if (!exists) {
				result.push(obj)
			}
		}
		for (let i = 0; i < result.length; i++) {
			await this.$axios
				.get(`/time/detail/${result[i].id}`)
				.then(res => {
					this.carts.push({
						...res.data,
						countChild: this.$store.getters.getBookingCountByIdAndIsChild({
							id: result[i].id,
							isChild: true
						}),
						countAdult: this.$store.getters.getBookingCountByIdAndIsChild({
							id: result[i].id,
							isChild: false
						})
					})
				})
				.catch(err => {
					console.log(err)
				})
		}
		this.isLoading = false
	},
	methods: {
		month(monthNumber: string) {
			return monthZeroWord[monthNumber]
		},
		dialogVisibleFalse() {
			this.dialogVisible = false
		},
		total() {
			let sum = 0
			for (let i = 0; i < this.carts.length; i++) {
				if (this.carts[i].countAdult > 0) {
					sum += this.carts[i].countAdult * this.carts[i].date.event.adultPrice
				}
				if (this.carts[i].countChild > 0) {
					sum += this.carts[i].countChild * this.carts[i].date.event.childPrice
				}
			}
			return sum
		},
		deleteItem(itemId: number) {
			console.log(itemId)
			this.carts = this.carts.filter(el => el.id !== itemId.toString())
			this.$store.commit('deleteBookingById', itemId)
		}
	}
})
</script>

<style lang="scss">
.cart-page {
	margin-top: 30px;
	margin-bottom: 50px;
}
.dialog {
	z-index: 99999;
}
.cart {
	&-header {
		margin-bottom: 30px;
		&__title {
			font-weight: 500;
		}
	}
	&-list {
		&-column {
			display: grid;
			grid-template-columns: auto 20% 20% 50px;
		}
		&-header {
			height: 60px;
			span {
				align-self: center;
				justify-self: center;
				text-transform: uppercase;
				opacity: 0.5;
				font-size: 14px;
			}
		}
		&-item {
			border-top: 1px solid rgba(0, 0, 0, 0.2);
			padding: 30px 0;
			&-col-1 {
				&__event {
					display: block;
					font-size: 14px;
					text-transform: uppercase;
				}
				&__name {
					font-size: 25px;
					margin: 20px 0;
				}
				&__category {
					font-size: 14px;
					opacity: 0.5;
					margin: 20px 0;
				}
				&-date-address {
					display: grid;
					grid-template-columns: 200px 300px;
					&__date {
						align-self: center;
						font-size: 14px;
					}
					&__address {
						padding-left: 20px;
						font-size: 14px;
						border-left: 2px solid rgba(0, 0, 0, 0.2);
						opacity: 0.5;
					}
				}
			}
			&-col-2 {
				align-self: center;
				justify-self: center;
				&-count {
					margin: 10px;
					display: grid;
					grid-template-rows: 1fr 1fr;
					&__row-1 {
						font-size: 20px;
						align-self: center;
						justify-self: center;
					}
					&__row-2 {
						align-self: center;
						justify-self: center;
						display: block;
						font-size: 14px;
					}
				}
			}
			&-col-3 {
				align-self: center;
				justify-self: center;
				font-size: 20px;
				font-weight: 500;
			}
			&-col-4 {
				align-self: center;
				justify-self: center;
				font-size: 30px;
				i {
					opacity: 0.5;
					cursor: pointer;
					transition: opacity 0.3s;
					&:hover {
						opacity: 1;
					}
				}
			}
		}
	}
	&-total {
		font-size: 25px;
		color: #b4966e;
		text-align: right;
		span {
			margin-left: 150px;
		}
	}
	&-btns {
		margin-top: 50px;
		text-align: right;
		&__continue-shopping {
			transition: background-color 0.3s;
			&:hover {
				background-color: rgb(249, 241, 241);
			}
		}
		&__make-purchases {
			background-color: black;
			color: white;
			transition: background-color 0.3s;
			&:hover {
				background-color: rgb(54, 54, 54);
			}
		}
		&__btn {
			margin-left: 20px;
			font-size: 16px;
			cursor: pointer;
			padding: 15px 50px;
			border: 1px solid black;
		}
	}
	&-loading {
		text-align: center;
		margin: 300px 0;
		font-size: 50px;
	}
	&-empty {
		margin: 100px 0;
		text-align: center;
		div {
			font-size: 30px;
			opacity: 0.5;
			margin-bottom: 30px;
		}
	}
}
</style>
