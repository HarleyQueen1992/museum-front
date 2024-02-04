<template>
	<div class="news-page">
		<div class="container">
			<div v-if="!isLoadingNews" class="news">
				<div class="news-header">
					<h1 class="news-header__title">Новости</h1>
				</div>
				<div class="news-body">
					<div class="news-body-list">
						<nuxt-link
							:to="'/news/' + item.id"
							class="news-body-list__item"
							v-for="item in news"
							:key="item.id"
						>
							<NewsItem
								:title="item.title"
								:body="item.body"
								:created_at="item.created_at"
								:banner="item.banner"
							/>
						</nuxt-link>
					</div>
				</div>
			</div>
			<div class="news-page-loading" v-else>
				<i class="el-icon-loading"></i>
			</div>
			<el-pagination
				v-if="news?.length !== 0 && totalCount > limit"
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

// Components
import NewsItem from '~/components/news/NewsItem.vue'

// Types
import { News } from '~/types/News'

export default Vue.extend({
	name: 'news',
	layout: 'pages',
	components: { NewsItem },
	data() {
		return {
			news: null as unknown as News[],
			page: 0,
			limit: 12,
			totalCount: 0,
			isLoadingNews: true
		}
	},
	async fetch() {
		await this.getNews()
	},

	methods: {
		changePage(val: number) {
			this.page = val - 1
		},
		async getNews() {
			this.isLoadingNews = true
			await this.$axios
				.$get(this.$route.fullPath, {
					params: { limit: this.limit, page: this.page }
				})
				.then(res => {
					this.news = res.result
					this.totalCount = res.total
				})
				.catch(err => {
					console.log(err)
				})
			this.isLoadingNews = false
		}
	},
	watch: {
		$route(to, from) {},
		page() {
			this.getNews()
		}
	}
})
</script>

<style lang="scss">
.news-page {
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
.news {
	&-header {
		width: 100%;
		padding: 40px 0;
		margin-bottom: 50px;
		border-bottom: 2px solid rgba(0, 0, 0, 0.2);
		&__title {
			text-transform: uppercase;
			font-size: 50px;
			font-weight: 400;
			text-align: center;
		}
	}
	&-body {
		&-list {
			display: grid;
			grid-template-columns: 1fr 1fr 1fr;
			grid-column-gap: 5%;
			&__item {
				width: 100%;
				color: black;
				margin-bottom: 50px;
				background-color: white;
				transition: transform 0.3s ease 0s, box-shadow 0.3s ease 0s;
				&:hover {
					transform: translateY(-2px);
					box-shadow: 0px 0px 40px 10px rgba(0, 0, 0, 0.3);
				}
			}
		}
	}
}
</style>
