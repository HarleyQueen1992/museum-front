<template>
	<div v-if="!isLoadingEvent" class="event-page">
		<div class="event-banner">
			<div class="event-banner-description">
				<div class="event-banner-description__category">
					#{{ event.category?.name }}
				</div>
				<div class="event-banner-description__name">{{ event.name }}</div>
				<div class="event-banner-description__schedule">
					{{
						event.startDate.split('-')[2] +
						' ' +
						month(event.startDate.split('-')[1]) +
						' ' +
						event.startDate.split('-')[0]
					}}
					—
					{{
						event.expirationDate.split('-')[2] +
						' ' +
						month(event.expirationDate.split('-')[1]) +
						' ' +
						event.expirationDate.split('-')[0]
					}}
				</div>
			</div>
			<nuxt-link :to="'tickets/' + event.id" class="event-banner__buy-ticket"
				>Купить билет</nuxt-link
			>
			<div class="event-banner__audit">
				<span>{{ event.audits[0].name }}</span>
			</div>
			<img
				v-if="event.banner"
				:src="'http://localhost:5000/' + event.banner"
				alt="banner-image"
			/>
			<img v-else src="../../static/images/not-image.jpeg" alt="not-image" />
		</div>

		<div class="event-content">
			<div class="container">
				<div class="event-content-row-1">
					<div class="event-content-row-1-col-1">
						<h2 class="event-content-row-1-col-1__title">
							Адрес и часы работы
						</h2>
						<div class="event-content-row-1-col-1-content">
							<div class="event-content-row-1-col-1-content__item">
								<i class="el-icon-location"></i>
								<span>{{ event.address }}</span>
							</div>
							<div class="event-content-row-1-col-1-content__item">
								<i class="el-icon-phone"></i>
								<span>{{ event.phone }}</span>
							</div>
							<div class="event-content-row-1-col-1-content__item">
								<i class="el-icon-time"></i>
								<span>{{ event.schedule }}</span>
							</div>
						</div>
					</div>
					<div class="event-content-row-1-col-2">
						<h2 class="event-content-row-1-col-2__title">Билеты</h2>
						<div class="event-content-row-1-col-2-content">
							<div class="event-content-row-1-col-2-content__item">
								Взрослый — {{ event.adultPrice }} р.
							</div>
							<div class="event-content-row-1-col-2-content__item">
								Детский — {{ event.childPrice }} р.
							</div>
							<nuxt-link
								:to="'tickets/' + event.id"
								class="event-content-row-1-col-2-content__buy-ticket"
							>
								Купить билет
							</nuxt-link>
						</div>
					</div>
				</div>
			</div>
			<div class="event-content-row-2">
				<div class="container">
					<span>Описание</span>
				</div>
			</div>
			<div class="container">
				<div class="event-content-row-3">
					<div class="event-content-row-3__description">
						{{ event.description }}
					</div>
				</div>
				<div class="event-content-row-4">
					<h2 class="event-content-row-4__title">О мероприятии</h2>
					<div class="event-content-row-4__content">{{ event.aboutMe }}</div>
				</div>
			</div>
		</div>
	</div>
	<div v-else class="event-page-loading">
		<i class="el-icon-loading"></i>
	</div>
</template>
<script lang="ts">
import Vue from 'vue'

// Types
import { Event } from '~/types/Event'

// Utils
import { monthZeroWord } from '~/utils/month'

export default Vue.extend({
	layout: 'pages',
	name: 'event',
	data() {
		return {
			event: null as unknown as Event,
			isLoadingEvent: true
		}
	},
	async fetch() {
		await this.$axios
			.$get('/events/' + this.$route.params.id)
			.then(res => {
				this.event = res
			})
			.catch(err => {
				console.log(err)
			})
		this.isLoadingEvent = false
	},
	methods: {
		month(monthNumber: string): string {
			return monthZeroWord[monthNumber]
		}
	}
})
</script>
<style lang="scss">
.event-page {
	&-loading {
		margin: 300px 0;
		text-align: center;
		i {
			font-size: 50px;
		}
	}
}
.event {
	&-banner {
		height: 600px;
		width: 100%;
		position: relative;
		&::before {
			content: '';
			z-index: 2;
			position: absolute;
			width: 100%;
			top: 0;
			bottom: 0;
			right: 0;
			left: 0;
			background: rgb(0, 0, 0);
			background: radial-gradient(
				circle,
				rgba(0, 0, 0, 0) 0%,
				rgba(0, 0, 0, 0.5) 100%,
				rgba(0, 212, 255, 0) 100%
			);
		}
		img {
			position: absolute;
			top: 0;
			left: 0;
			object-fit: cover;
			width: 100%;
			height: 100%;
		}
		&__buy-ticket {
			font-size: 20px;
			font-weight: 400;
			position: absolute;
			bottom: 50px;
			left: 100px;
			color: white;
			padding: 15px 25px;
			z-index: 2;
			background-color: #d2bc94;
			transition: background-color 0.3s;
			&:hover {
				background-color: #ddc089;
			}
		}
		&__audit {
			height: 60px;
			width: 60px;
			font-size: 22px;
			display: grid;
			position: absolute;
			bottom: 50px;
			right: 50px;
			color: rgba(255, 255, 255, 0.8);
			border-radius: 50%;
			z-index: 2;
			border: 1px solid rgba(255, 255, 255, 0.8);
			span {
				align-self: center;
				justify-self: center;
			}
		}
		&-description {
			position: absolute;
			top: 50px;
			bottom: 50px;
			left: 100px;
			z-index: 2;
			max-width: 80%;
			&__category {
				font-weight: 400;
				color: white;
				text-transform: uppercase;
			}
			&__name {
				margin-top: 80px;
				width: 100%;
				font-size: 40px;
				color: white;
			}
			&__schedule {
				margin-top: 20px;
				font-size: 20px;
				color: white;
			}
		}
	}
	&-content {
		&-row-1 {
			margin-top: 50px;
			display: grid;
			grid-template-columns: 1fr 1fr;
			grid-column-gap: 200px;
			&-col-1 {
				&__title {
					font-weight: 500;
					font-size: 25px;
					color: rgba(0, 0, 0, 0.8);
				}
				&-content {
					margin-top: 30px;
					&__item {
						margin-bottom: 25px;
						display: grid;
						grid-template-columns: 30px 1fr;
						color: rgba(0, 0, 0, 0.7);
						font-size: 18px;
						i {
							opacity: 0.5;
							margin-top: 3px;
						}
						span {
							line-height: 25px;
							white-space: break-spaces;
						}
					}
				}
			}
			&-col-2 {
				&__title {
					font-size: 25px;
					font-weight: 500;
					color: rgba(0, 0, 0, 0.8);
				}
				&-content {
					margin-top: 30px;
					&__item {
						padding-left: 20px;
						margin-bottom: 20px;
						color: rgba(0, 0, 0, 0.7);
						font-size: 18px;
						position: relative;
						&::before {
							content: '';
							position: absolute;
							left: 0;
							top: 50%;
							transform: translateY(-50%);
							width: 5px;
							height: 5px;
							border-radius: 50%;
							background-color: rgba(0, 0, 0, 0.8);
						}
					}
					&__buy-ticket {
						text-align: center;
						display: block;
						width: 150px;
						padding: 10px 20px;
						border: 1px solid #d2bc94;
						transition: all 0.3s;
						color: black;
						&:hover {
							color: white;
							background-color: #ddc089;
						}
					}
				}
			}
		}
		&-row-2 {
			margin-top: 30px;
			width: 100%;
			height: 70px;
			background-color: #303034;
			span {
				color: #ddc089;
				font-size: 20px;
				line-height: 70px;
			}
		}
		&-row-3 {
			padding: 50px 0;
			line-height: 34px;
			font-size: 20px;
		}
		&-row-4 {
			padding-bottom: 50px;
			&__title {
				font-weight: 600;
				font-size: 30px;
			}
			&__content {
				margin-top: 30px;
				line-height: 34px;
				font-size: 20px;
				white-space: break-spaces;
			}
		}
	}
}

@media (max-width: 2000px) {
	.event {
		&-banner {
			height: 500px;
		}
	}
}
</style>
