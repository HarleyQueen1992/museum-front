<template>
	<div>
		<el-input placeholder="Please login" v-model="login.login"></el-input>
		<el-input placeholder="Please password" v-model="login.password"></el-input>
		<el-button v-on:click="userLogin">Login</el-button>
		<el-button v-on:click="refresh">Refresh</el-button>
		<el-button v-on:click="request">Refresh</el-button>
	</div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
	layout: 'login',
	data() {
		return {
			login: {
				login: '',
				password: ''
			}
		}
	},
	methods: {
		async userLogin() {
			try {
				let response = await this.$auth.loginWith('local', {
					data: this.login
				})
				console.log(response)

				this.$auth.redirect('/')
				this.$router.push('/')
			} catch (err) {
				console.log(err)
			}
		},
		isLogin() {
			console.log(this.$auth.loggedIn)
		},
		async refresh() {
			try {
				let response = await this.$auth.refreshTokens()
				console.log(response)
			} catch (err) {
				console.log(err)
			}
		},
		async request() {
			try {
				let res = await this.$axios.$post('category', { name: 'Экспозиция' })
				console.log(res)
			} catch (err) {
				console.log(err)
			}
		}
	}
})
</script>
