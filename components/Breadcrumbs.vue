<template>
	<div class="breadcrumbs">
		<nuxt-link class="breadcrumbs__item" to="/">Главная</nuxt-link>
		<nuxt-link
			v-if="routes[0] !== 'index' && item !== 'id'"
			:to="breadcrumbsUrl(item)"
			class="breadcrumbs__item breadcrumbs__item_before"
			:key="index"
			v-for="(item, index) in routes"
		>
			{{ breadcrumbsName(item) }}</nuxt-link
		>
	</div>
</template>
<script lang="ts">
import Vue from 'vue'

import { breadcrumbsWords } from '@/utils/breadcrumbs'

export default Vue.extend({
	name: 'breadcrumbs',
	data() {
		return {
			routes: this.$route.name?.split('-') as string[]
		}
	},
	watch: {
		$route() {
			this.routes = this.$route.name?.split('-')!
			console.log(this.routes)

			console.log(this.routes[this.routes.length - 1])
		}
	},
	methods: {
		breadcrumbsName(item: string) {
			return breadcrumbsWords[item].name
		},
		breadcrumbsUrl(item: string) {
			return breadcrumbsWords[item].url
		}
	}
})
</script>

<style lang="scss">
.breadcrumbs {
	height: 60px;
	&__item {
		padding-right: 20px;
		line-height: 60px;
		color: black;
		opacity: 0.8;
		transition: opacity 0.3s;
		&:hover {
			opacity: 1;
		}
		&_before {
			padding: 0 20px;
			position: relative;
			&::before {
				content: '/';
				position: absolute;
				left: 0;
				top: 50%;
				transform: translateY(-50%);
			}
		}
	}
}
</style>
