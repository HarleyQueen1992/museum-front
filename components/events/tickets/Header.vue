<template>
	<div class="ticket-header">
		<div class="ticket-header__title">
			Входной билет на «{{ event.name }}» ({{ event.audits[0].name }})
		</div>
		<div class="ticket-header__address">{{ event.address }}</div>
		<div class="ticket-header__description">
			Билет дает право единоразового посещения: «{{ event.name }}» по
			{{ event.expirationDate.split('-')[2] }}.{{
				event.expirationDate.split('-')[1]
			}}.{{ event.expirationDate.split('-')[0] }}г.
		</div>
	</div>
</template>
<script lang="ts">
import Vue, { PropType } from 'vue'
import { Event } from '~/types/events/tickets/Event'

export default Vue.extend({
	name: 'ticket-header',
	props: {
		event: Object as PropType<Event>
	}
})
</script>
<style lang="scss">
.ticket {
	&-header {
		margin: 50px auto;
		&__title {
			font-size: 30px;
			font-weight: 500;
		}
		&__address {
			margin-top: 15px;
			font-size: 16px;
			color: black;
			opacity: 0.5;
		}
		&__description {
			line-height: 25px;
			font-size: 18px;
			margin-top: 15px;
			opacity: 0.8;
		}
	}
}
</style>
