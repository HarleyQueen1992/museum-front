<template>
	<div class="login">
		<h1>Login Page</h1>
		<nuxt />
	</div>
</template>
<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
	middleware: 'auth'
})
</script>
