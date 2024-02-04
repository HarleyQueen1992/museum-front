<template>
	<div class="app">
		<Header />
		<div class="content">
			<div class="container">
				<Breadcrumbs />
			</div>
			<nuxt />
		</div>

		<Footer />
		<div class="copyright">
			<div class="copyright-row container">
				<span
					>© 2021 Учреждение «Луганский Государственный музей истории Великой
					Отечественной войны»</span
				>
				<img src="../static/images/genshtab-logo.svg" alt="genshtab-logo" />
			</div>
		</div>
	</div>
</template>

<script lang="ts">
import Vue from 'vue'
import Header from '@/components/Header.vue'
import Footer from '~/components/Footer.vue'
import Breadcrumbs from '~/components/Breadcrumbs.vue'
export default Vue.extend({
	components: { Header, Footer, Breadcrumbs }
})
</script>
<style lang="scss">
.content {
	margin-top: 170px;
}
.copyright {
	background-color: #28282b;
	width: 100%;
	height: 70px;
	&-row {
		display: grid;
		grid-template-columns: auto 1fr;
		height: 100%;
		span {
			font-size: 14px;
			line-height: 115%;
			color: #998e76;
			align-self: center;
		}
		img {
			align-self: center;
			justify-self: end;
		}
	}
}
</style>
