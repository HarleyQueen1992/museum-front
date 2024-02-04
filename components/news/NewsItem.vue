<template>
	<div class="news-item">
		<img class="news-item__banner" :src="'http://localhost:5000/' + banner" />
		<h2 class="news-item__title">{{ title }}</h2>
		<div class="news-item__date">{{ date() }}</div>
	</div>
</template>
<script lang="ts">
import Vue from 'vue'
import { shortDate } from '~/utils/date'

export default Vue.extend({
	name: 'news-item',
	props: {
		title: String,
		created_at: String,
		banner: String
	},
	methods: {
		date() {
			return shortDate(this.created_at)
		}
	}
})
</script>
<style lang="scss">
.news-item {
	min-height: 400px;
	display: grid;
	grid-template-rows: auto 1fr 50px;
	&__banner {
		width: 100%;
		object-fit: cover;
	}
	&__title {
		align-self: center;
		font-weight: 500;
		padding: 10px 20px;
	}
	&__date {
		align-self: center;
		padding: 10px 20px;
		color: #998e76;
	}
}
</style>
