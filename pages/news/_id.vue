<template>
	<div class="news-id-page">
		<div v-if="!isLoading" class="news-id-page-content">
			<div class="container">
				<div class="news-id-page-content-header">
					<h1 class="news-id-page-content-header__title">{{ news.title }}</h1>
					<span class="news-id-page-content-header__date">{{ date() }}</span>
				</div>

				<img
					class="news-id-page-content__banner"
					:src="'http://localhost:5000/' + news.banner"
					alt="news-banner"
				/>
				<div class="news-id-page-content__body">{{ news.body }}</div>
			</div>
		</div>

		<div v-else class="news-id-page-loading">
			<i class="el-icon-loading"></i>
		</div>
	</div>
</template>

<script lang="ts">
import Vue from 'vue'
import { News } from '~/types/News'
import { shortDate } from '~/utils/date'

export default Vue.extend({
	name: 'news-id',
	layout: 'pages',
	data() {
		return {
			isLoading: true,
			news: null as unknown as News
		}
	},
	async fetch() {
		await this.$axios
			.$get('/news/' + this.$route.params.id)
			.then(res => {
				this.news = res
			})
			.catch(err => {
				console.log(err)
			})
		this.isLoading = false
	},
	methods: {
		date() {
			return shortDate(this.news.created_at.toString())
		}
	}
})
</script>

<style lang="scss">
.news-id-page {
	width: 100%;
	margin-bottom: 50px;
	&-content {
		&-header {
			display: grid;
			grid-template-rows: 1fr 80px;
			&__title {
				align-self: center;
				justify-self: start;
				font-size: 50px;
				font-weight: 500;
			}
			&__date {
				align-self: center;
				color: rgba(0, 0, 0, 0.5);
				font-size: 22px;
			}
		}

		&__banner {
			object-fit: cover;
			width: 100%;
			max-height: 500px;
		}
		&__body {
			padding-top: 20px;
			font-size: 22px;
			text-align: justify;
			white-space: break-spaces;
			line-height: 25px;
		}
	}

	&-loading {
		height: calc(100vh - 500px);
		display: grid;
		i {
			align-self: center;
			justify-self: center;
			font-size: 50px;
		}
	}
}
</style>
