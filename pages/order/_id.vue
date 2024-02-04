<template>
	<div class="orders">
		<div v-if="!isLoading" class="container">
			<div class="orders-item" v-for="item in order.tickets">
				<!-- <img
					:src="`http://localhost:5000/` + item.time.date.event.banner"
					alt="banner"
				/> -->
				<div class="orders-item-header">
					<div class="orders-item-header__description">
						ФГБУК ЛНР "Государственный Музей Великой отечественной войны", 1198,
						г.Луганск, Коцюбинского, 10, ИНН 79623746234 КПП 7864786
					</div>
					<!-- <img
						class="orders-item-header__qr"
						:src="`https://api.qrserver.com/v1/create-qr-code/?data=${
							order.id + '' + item.id
						}&size=100x100`"
						alt=""
						title=""
					/> -->
					<img
						class="orders-item-header__qr"
						src="../../static/images/qr.png"
						alt=""
						title=""
					/>
					<div class="orders-item-header__category">
						Категория:
						<span v-if="item.isChild"
							>Дети в возрасте до 6 лет включительно </span
						><span v-else>Взрослый (РФ и другие страны ЕАЭС)</span>
					</div>
					<div class="orders-item-header__price">
						Стоимость билета:
						<span v-if="item.isChild"
							>{{ item.time.date.event.childPrice }} руб.</span
						><span v-else>{{ item.time.date.event.adultPrice }} руб.</span>
					</div>

					<div class="orders-item-header__number-date">
						№ заказа:
						<span
							>{{ order.id }} от
							{{
								new Date().getDate() +
								'.' +
								new Date().getMonth() +
								'.' +
								new Date().getFullYear()
							}}</span
						>
					</div>
					<div class="orders-item-header__ticket">
						Электронный билет № {{ item.id }}
					</div>
				</div>
				<div class="orders-item-body">
					<div class="orders-item-body__description">Билет на 1 человека</div>
					<h2 class="orders-item-body__event-name">
						{{ item.time.date.event.name }}
					</h2>
					<div class="orders-item-body__event-address">
						{{ item.time.date.event.address }}
					</div>
					<div class="orders-item-body__event-date">
						Дата посещения: {{ item.time.date.date }} в
						{{ item.time.time.slice(0, 5) }}
					</div>
				</div>
			</div>
		</div>
		<div class="loading" v-else><i class="el-icon-loading"></i></div>
	</div>
</template>
<script lang="ts">
import Vue from 'vue'

interface Event {
	name: string
	banner: string
	adultPrice: number
	childPrice: number
	address: string
}

interface Date {
	date: string
	event: Event
}

interface Time {
	time: string
	date: Date
}

interface Ticket {
	id: number
	isChild: boolean
	time: Time
}

interface Order {
	id: number
	fio: string
	tickets: Ticket[]
}
export default Vue.extend({
	name: 'order',
	data() {
		return {
			order: null as unknown as Order,
			isLoading: true
		}
	},
	async fetch() {
		await this.$axios
			.$get(`/booking/${this.$route.params.id}`)
			.then((res: Order) => {
				this.order = res
			})
			.catch(err => {
				console.log(err)
			})
		this.isLoading = false
	}
})
</script>
<style lang="scss">
.loading {
	text-align: center;
	i {
		font-size: 50px;
	}
}
.orders {
	background-color: white;
	&-item {
		img {
			width: 100%;
		}
		&-header {
			margin: 20px 0 30px 0;
			div {
				font-size: 18px;
				line-height: 22px;
			}
			&__qr {
				float: right;
				max-width: 100px;
				height: 100px;
				margin: 0 50px;
			}
			&__description {
				margin-bottom: 10px;
				font-weight: bold;
			}
		}
		&-body {
			&__event-name {
				margin-top: 5px;
				line-height: 30px;
			}
			div {
				font-size: 18px;
			}
		}
		padding-bottom: 50px;
		border-bottom: 2px dashed black;
	}
}
</style>
