<template>
	<div class="container">
		<div class="events-page">
			<div class="header-page">
				<h1 class="header-page-title">Билеты</h1>
				<nuxt-link to="#" class="header-page-title-info">
					<i class="header-page-title-info__icon el-icon-warning"></i>
					<span class="header-page-title-info__text"
						>Правила покупки билетов</span
					>
				</nuxt-link>
			</div>
			<div class="filter">
				<div class="filter-category">
					<span class="filter-category__name">Категории</span>
					<div
						class="filter-category__item"
						:class="
							category === item.id.toString()
								? 'filter-category__item_active'
								: ''
						"
						v-on:click="category = item.id.toString()"
						v-for="item in categorys"
					>
						<span>{{ item.name }}</span>
					</div>
					<div v-if="category" class="filter-category-clear">
						<i v-on:click="clearCategory" class="el-icon-close"></i>
					</div>
				</div>
				<div class="filter-audience">
					<el-select
						v-model="audiencesSelecetion"
						multiple
						collapse-tags
						placeholder="Аудитория"
						style="background-color: transparent; border: none"
						class="filter-audience-select"
					>
						<el-option
							v-for="item in audiences"
							:key="item.id"
							:label="item.name"
							:value="item.id"
						>
						</el-option>
					</el-select>
				</div>
				<div class="filter-date">
					<el-date-picker v-model="date" type="date" placeholder="Дата">
					</el-date-picker>
				</div>
				<div class="filter-search">
					Поиск билетов
					<input
						class="filter-search__input"
						autocomplete="off"
						v-model="search"
						placeholder="Введите название события, выставки, мероприятия..."
						type="text"
					/><i v-on:click="clearInput" class="el-icon-close"></i>
				</div>

				<div class="filter-btns">
					<el-button v-on:click="getEvents" type="warning">Найти</el-button>
				</div>
			</div>
			<div class="events" v-if="!isLoadingEvents">
				<div
					class="events__item"
					v-on:click="$router.push('/events/' + item.id)"
					v-for="item in events"
					:key="item.id"
				>
					<div class="events__item__category" v-if="item.category">
						#{{ item.category.name }}
					</div>
					<div
						v-on:click.stop="$router.push(`/events/tickets/${item.id}`)"
						class="events__item__buy-ticket"
					>
						Купить билет
					</div>
					<img
						v-if="item.banner"
						:src="'http://localhost:5000/' + item.banner"
						alt="banner-image"
					/>
					<img
						v-else
						src="../../static/images/not-image.jpeg"
						alt="not-image"
					/>
					<div class="events__item__schedule">
						{{
							item.startDate.split('-')[2] +
							' ' +
							month(item.startDate.split('-')[1]) +
							' ' +
							item.startDate.split('-')[0]
						}}
						—
						{{
							item.expirationDate.split('-')[2] +
							' ' +
							month(item.expirationDate.split('-')[1]) +
							' ' +
							item.expirationDate.split('-')[0]
						}}
					</div>
					<div class="events__item__name">
						{{ item.name }}
					</div>
					<div class="events__item__address">
						<i class="el-icon-location-outline"></i> {{ item.address }}
					</div>
				</div>
			</div>
			<div class="events-loading" v-else>
				<i class="el-icon-loading"></i>
			</div>
			<div class="not-events" v-if="events?.length === 0">
				Мероприятия не неайдены
			</div>
			<el-pagination
				v-if="events?.length !== 0 && totalCount > limit"
				class="pagination"
				:page-size="limit"
				@current-change="changePage"
				layout="prev, pager, next"
				:pager-count="11"
				:total="totalCount"
			>
			</el-pagination>
		</div>
	</div>
</template>
<script lang="ts">
import Vue from 'vue'

// Utils
import { monthZeroWord } from '~/utils/month'

// Types
import { Category } from '~/types/Category'
import { Audits } from '~/types/Audits'
import { Event } from '~/types/events/Event'

export default Vue.extend({
	layout: 'pages',
	data() {
		return {
			categorys: null as unknown as Category[],
			audiences: null as unknown as Audits[],
			audiencesSelecetion: null as unknown as string[],
			date: null as unknown as Date | null,
			search: '' as string,
			category: null as unknown as string,
			events: null as unknown as Event[],
			isMountedAudit: true,
			isMountedCategory: true,
			isMountedSearch: true,
			page: 0,
			limit: 10,
			totalCount: 10,
			isLoadingEvents: true
		}
	},
	async fetch() {
		await this.$axios
			.$get('/category')
			.then(res => {
				this.categorys = res
			})
			.catch(err => {
				console.log(err)
			})
		await this.$axios
			.$get('/audience')
			.then(res => {
				this.audiences = res
			})
			.catch(err => {
				console.log(err)
			})

		await this.getEvents()
	},
	mounted() {
		this.search = this.$route.query.slug?.toString() || ''
		this.category = this.$route.query.category?.toString() || ''
		this.audiencesSelecetion =
			this.$route.query.audit?.toString().split(',') || []
		if (this.$route.query.date?.toString() || '') {
			this.date = new Date(this.$route.query.date?.toString())
		}
	},
	methods: {
		clearInput() {
			this.search = ''
		},
		changePage(val: number) {
			this.page = val - 1
		},
		clearCategory() {
			this.category = ''
		},
		changeCategory(category: number) {
			this.category = category.toString()
		},
		month(monthNumber: string): string {
			return monthZeroWord[monthNumber]
		},
		async getEvents() {
			this.isLoadingEvents = true
			await this.$axios
				.$get(this.$route.fullPath, {
					params: { limit: this.limit, page: this.page }
				})
				.then(res => {
					this.events = res.result
					this.totalCount = res.total
				})
				.catch(err => {
					console.log(err)
				})
			this.isLoadingEvents = false
		}
	},
	watch: {
		$route(to, from) {},
		page() {
			this.getEvents()
		},
		audiencesSelecetion() {
			if (!this.isMountedAudit) {
				if (this.audiencesSelecetion?.length === 0) {
					let query = Object.assign({}, this.$route.query)
					delete query.audit
					this.$router.replace({ query })
				} else {
					this.$router.push({
						query: {
							...this.$route.query,
							audit: this.audiencesSelecetion.toString()
						}
					})
				}
			}
			this.isMountedAudit = false
		},
		category() {
			if (!this.isMountedCategory) {
				if (!this.category) {
					let query = Object.assign({}, this.$route.query)
					delete query.category
					this.$router.replace({ query })
				} else {
					this.$router.push({
						query: { ...this.$route.query, category: this.category }
					})
				}
			}
			this.isMountedCategory = false
		},
		search() {
			if (!this.isMountedSearch) {
				if (!this.search) {
					let query = Object.assign({}, this.$route.query)
					delete query.slug
					this.$router.replace({ query })
				} else {
					this.$router.push({
						query: { ...this.$route.query, slug: this.search }
					})
				}
			}
			this.isMountedSearch = false
		},
		date() {
			if (!this.date) {
				let query = Object.assign({}, this.$route.query)
				delete query.date
				this.$router.replace({ query })
			} else {
				this.$router.push({
					query: {
						...this.$route.query,
						date:
							this.date.getFullYear() +
							'-' +
							(this.date.getMonth() + 1) +
							'-' +
							this.date.getDate()
					}
				})
			}
		}
	}
})
</script>
<style lang="scss">
.el-input__inner {
	background-color: transparent;
	border: none;
	width: 150px;
	cursor: pointer;
}
.el-input__inner::placeholder {
	color: black;
	font-size: 15px;
}
.el-date-editor.el-input {
	width: 150px;
}
.el-select .el-input .el-select__caret {
	color: black;
}

.el-input__prefix {
	.el-icon-date {
		color: black;
	}
}

.header-page {
	margin: 30px 0 60px 0;
	&-title {
		font-size: 50px;
		font-weight: 400;
		margin-bottom: 5px;
		&-info {
			color: #b4966e;
			font-size: 20px;
			&__text {
				margin-left: 5px;
			}
		}
		&-info:hover {
			span {
				text-decoration: underline;
			}
		}
	}
}
.filter {
	border-top: 1px solid #cfcfcf;
	padding: 50px 0;
	&-category {
		margin-bottom: 25px;
		&__name {
			margin-right: 50px;
		}
		&__item {
			display: inline-block;
			padding: 10px 16px;
			margin-right: 22px;
			cursor: pointer;
			transition: all 0.3s;
			border: 1px solid #7d7c7c;
			span {
				text-transform: uppercase;
				font-size: 13px;
				text-align: center;
				color: #333;
				font-weight: 400;
			}
		}
		&__item:hover {
			background-color: rgb(155, 155, 155);
			span {
				color: white;
			}
		}
		&-clear {
			cursor: pointer;
			display: inline-block;
		}
	}
	&-audience {
		margin-right: 30px;
		display: inline-block;
		&-select {
			background-color: transparent;
			border: none;
		}
	}
	&-date {
		display: inline-block;
	}
	&-search {
		margin-top: 25px;
		text-transform: uppercase;
		font-size: 14px;

		&__input {
			border: none;
			width: 600px;
			margin-left: 50px;
			padding-bottom: 6px;
			font-size: 15px;
			background-color: transparent;
			padding-right: 40px;
			border-bottom: 1px solid #b3b3b3;
		}
		i {
			cursor: pointer;
			color: #333;
			transform: translateX(-20px);
			font-size: 20px;
		}
	}
	&-btns {
		margin-top: 25px;
		display: flex;
		justify-content: flex-end;
	}
}
.filter-category__item_active {
	background-color: rgb(108, 108, 108);
	span {
		color: white;
	}
}
.events-loading {
	width: 100%;
	display: grid;
	height: 500px;
	i {
		justify-self: center;
		align-self: center;
		font-size: 50px;
	}
}
.events {
	display: grid;
	grid-template-columns: 1fr 1fr 1fr;
	grid-column-gap: 5%;
	&__item {
		cursor: pointer;
		position: relative;
		width: 100%;
		min-width: 100%;
		height: 300px;
		margin-bottom: 50px;
		overflow: hidden;
		&::before {
			content: '';
			position: absolute;
			z-index: 1;
			width: 100%;
			top: 0;
			bottom: 0;
			right: 0;
			left: 0;
			transition: background 1s;
			background: rgba(0, 0, 0, 0.4);
		}
		&::after {
			content: '';
			position: absolute;
			width: 100%;
			top: 0;
			bottom: 0;
			right: 0;
			left: 0;
			transition: background 1s;
		}
		&:hover {
			&::after {
				background: rgb(0, 0, 0);
				background: radial-gradient(
					circle,
					rgba(0, 0, 0, 0) 0%,
					rgba(0, 0, 0, 0.5) 100%,
					rgba(0, 212, 255, 0) 100%
				);
			}
			img {
				transform: scale(110%);
			}
		}
		img {
			transition: transform 1s;
			width: 100%;
			height: 100%;
			object-fit: cover;
		}
		&__buy-ticket {
			position: absolute;
			top: 20px;
			cursor: pointer;
			right: 20px;
			padding: 10px 20px;
			font-size: 13px;
			z-index: 3;
			color: white;
			font-weight: 500;
			border: 1px solid white;
		}
		&__address {
			z-index: 2;
			position: absolute;
			color: white;
			bottom: 30px;
			left: 30px;
			white-space: nowrap;
			overflow: hidden;
			width: 90%;
			text-overflow: ellipsis;
			i {
				font-size: 20px;
				margin-right: 5px;
			}
		}
		&__schedule {
			z-index: 2;
			position: absolute;
			bottom: 110px;
			font-size: 16px;
			left: 30px;
			color: white;
		}
		&__name {
			position: absolute;
			bottom: 70px;
			left: 30px;
			z-index: 2;
			color: white;
			width: 90%;
			white-space: nowrap;
			overflow: hidden;
			text-overflow: ellipsis;
			font-size: 25px;
		}
		&__category {
			position: absolute;
			top: 30px;
			left: 30px;
			opacity: 0.8;
			color: white;
			z-index: 2;
		}
	}
}
.not-events {
	font-size: 30px;
	opacity: 0.5;
	text-align: center;
	margin: 100px 0 200px 0;
}
.pagination {
	text-align: center;
	margin-bottom: 50px;
}
.el-pagination {
	font-size: 25px;
	.el-pager {
		li {
			background-color: transparent;
			font-size: 18px;
			&:hover {
				color: orange !important;
			}
		}
		.active {
			font-weight: 500;
			color: orange;
		}
	}
	button {
		background-color: transparent !important;
		i {
			font-size: 18px !important;
		}
		&:hover {
			i {
				color: orange !important;
			}
		}
	}
}

@media (max-width: 1800px) {
	.events {
		grid-template-columns: 1fr 1fr;
	}
}
</style>
