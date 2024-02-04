<template>
	<div>
		<h1>Ticket</h1>
		<nuxt-link to="/">Home</nuxt-link>
		<span class="demonstration">date</span>
		<el-date-picker
			v-model="value1"
			type="date"
			placeholder="Pick a date"
			default-value="2010-10-01"
		>
		</el-date-picker>
		<span class="demonstration">daterange</span>
		<el-date-picker
			v-model="value2"
			type="daterange"
			align="right"
			start-placeholder="Start Date"
			end-placeholder="End Date"
			default-value="2010-10-01"
		>
		</el-date-picker>
		<span>{{ value1 }}</span>
		<span>{{ value2 }}</span>
	</div>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
	layout: 'admin',
	name: 'ticket',

	data() {
		return {
			value1: new Date(),
			value2: ''
		}
	}
})
</script>
