<template>
	<div class="ticket-week-calendar">
		<div class="ticket-week-calendar-description">
			<i class="el-icon-date"></i>
			<span>{{
				selectedDate
					? selectedDate.split('-')[2] +
					  ' ' +
					  month(selectedDate.split('-')[1]) +
					  ' ' +
					  selectedDate.split('-')[0]
					: 'Выберете дату'
			}}</span>
		</div>

		<div class="ticket-week-calendar-list">
			<i
				v-if="dayIndex > 0"
				@click="prevDate()"
				class="ticket-week-calendar-list__arrow ticket-week-calendar-list__arrow_left el-icon-arrow-left"
			></i>
			<div
				class="ticket-week-calendar-list__item"
				@click="selectDay(0, 1)"
				:class="
					(new Date(dates[dayIndex + 1]) < new Date()
						? 'ticket-week-calendar-list__item_opacity'
						: '') +
					' ' +
					(selectedDay === 1 ? 'ticket-week-calendar-list__item_selected' : '')
				"
			>
				<div class="ticket-week-calendar-list__item-row-1">Пн</div>
				<div class="ticket-week-calendar-list__item-row-2">
					<span class="ticket-week-calendar-list__item-row-2__date">{{
						dates[dayIndex].split('-')[2]
					}}</span>
					<span class="ticket-week-calendar-list__item-row-2__month">{{
						month(dates[dayIndex].split('-')[1])
					}}</span>
				</div>
			</div>
			<div
				class="ticket-week-calendar-list__item"
				@click="selectDay(1, 2)"
				:class="
					(new Date(dates[dayIndex + 2]) < new Date()
						? 'ticket-week-calendar-list__item_opacity'
						: '') +
					' ' +
					(selectedDay === 2 ? 'ticket-week-calendar-list__item_selected' : '')
				"
			>
				<div class="ticket-week-calendar-list__item-row-1">Вт</div>
				<div class="ticket-week-calendar-list__item-row-2">
					<span class="ticket-week-calendar-list__item-row-2__date">{{
						dates[dayIndex + 1]?.split('-')[2]
					}}</span>
					<span class="ticket-week-calendar-list__item-row-2__month">{{
						month(dates[dayIndex + 1]?.split('-')[1])
					}}</span>
				</div>
			</div>
			<div
				class="ticket-week-calendar-list__item"
				@click="selectDay(2, 3)"
				:class="
					(new Date(dates[dayIndex + 3]) < new Date()
						? 'ticket-week-calendar-list__item_opacity'
						: '') +
					' ' +
					(selectedDay === 3 ? 'ticket-week-calendar-list__item_selected' : '')
				"
			>
				<div class="ticket-week-calendar-list__item-row-1">Ср</div>
				<div class="ticket-week-calendar-list__item-row-2">
					<span class="ticket-week-calendar-list__item-row-2__date">{{
						dates[dayIndex + 2]?.split('-')[2]
					}}</span>
					<span class="ticket-week-calendar-list__item-row-2__month">{{
						month(dates[dayIndex + 2]?.split('-')[1])
					}}</span>
				</div>
			</div>
			<div
				class="ticket-week-calendar-list__item"
				@click="selectDay(3, 4)"
				:class="
					(new Date(dates[dayIndex + 4]) < new Date()
						? 'ticket-week-calendar-list__item_opacity'
						: '') +
					' ' +
					(selectedDay === 4 ? 'ticket-week-calendar-list__item_selected' : '')
				"
			>
				<div class="ticket-week-calendar-list__item-row-1">Чт</div>
				<div class="ticket-week-calendar-list__item-row-2">
					<span class="ticket-week-calendar-list__item-row-2__date">{{
						dates[dayIndex + 3]?.split('-')[2]
					}}</span>
					<span class="ticket-week-calendar-list__item-row-2__month">{{
						month(dates[dayIndex + 3]?.split('-')[1])
					}}</span>
				</div>
			</div>
			<div
				class="ticket-week-calendar-list__item"
				@click="selectDay(4, 5)"
				:class="
					(new Date(dates[dayIndex + 5]) < new Date()
						? 'ticket-week-calendar-list__item_opacity'
						: '') +
					' ' +
					(selectedDay === 5 ? 'ticket-week-calendar-list__item_selected' : '')
				"
			>
				<div class="ticket-week-calendar-list__item-row-1">Пт</div>
				<div class="ticket-week-calendar-list__item-row-2">
					<span class="ticket-week-calendar-list__item-row-2__date">{{
						dates[dayIndex + 4]?.split('-')[2]
					}}</span>
					<span class="ticket-week-calendar-list__item-row-2__month">{{
						month(dates[dayIndex + 4]?.split('-')[1])
					}}</span>
				</div>
			</div>
			<div
				class="ticket-week-calendar-list__item"
				@click="selectDay(5, 6)"
				:class="
					(new Date(dates[dayIndex + 6]) < new Date()
						? 'ticket-week-calendar-list__item_opacity'
						: '') +
					' ' +
					(selectedDay === 6 ? 'ticket-week-calendar-list__item_selected' : '')
				"
			>
				<div
					class="ticket-week-calendar-list__item-row-1 ticket-week-calendar-list__item_weekends"
				>
					Сб
				</div>
				<div class="ticket-week-calendar-list__item-row-2">
					<span class="ticket-week-calendar-list__item-row-2__date">{{
						dates[dayIndex + 5]?.split('-')[2]
					}}</span>
					<span class="ticket-week-calendar-list__item-row-2__month">{{
						month(dates[dayIndex + 5]?.split('-')[1])
					}}</span>
				</div>
			</div>
			<div
				class="ticket-week-calendar-list__item"
				@click="selectDay(6, 0)"
				:class="
					(new Date(dates[dayIndex + 7]) < new Date()
						? 'ticket-week-calendar-list__item_opacity'
						: '') +
					' ' +
					(selectedDay === 0 ? 'ticket-week-calendar-list__item_selected' : '')
				"
			>
				<div
					class="ticket-week-calendar-list__item-row-1 ticket-week-calendar-list__item_weekends"
				>
					Вс
				</div>
				<div class="ticket-week-calendar-list__item-row-2">
					<span class="ticket-week-calendar-list__item-row-2__date">{{
						dates[dayIndex + 6]?.split('-')[2]
					}}</span>
					<span class="ticket-week-calendar-list__item-row-2__month">{{
						month(dates[dayIndex + 6]?.split('-')[1])
					}}</span>
				</div>
			</div>
			<i
				v-if="dates.length - 1 >= dayIndex + 7"
				@click="nextDate()"
				class="ticket-week-calendar-list__arrow ticket-week-calendar-list__arrow_right el-icon-arrow-right"
			></i>
		</div>
	</div>
</template>

<script lang="ts">
import Vue, { PropType } from 'vue'

// Utils
import { monthZeroWord } from '~/utils/month'

export default Vue.extend({
	name: 'calendar-week',
	props: {
		dates: Array as PropType<string[]>,
		selectedDate: String,
		selectedDay: Number,
		dayIndex: Number,
		selectTime: Function,
		nextDate: Function,
		prevDate: Function
	},
	methods: {
		month(monthNumber: string): string {
			return monthZeroWord[monthNumber]
		},
		async selectDay(weight: number, day: number) {
			await this.selectTime(this.dates[this.dayIndex + weight], day)
			this.$router.push({ query: { date: this.selectedDate } })
		}
	}
})
</script>

<style lang="scss">
.ticket {
	&-week {
		&-calendar {
			width: 940px;
			margin: 80px 0 50px 0;

			&-description {
				padding: 0 50px;
				margin-bottom: 10px;
				span {
					font-size: 14px;
					opacity: 0.8;
				}
				i {
					margin-right: 10px;
				}
			}
			&-list {
				display: grid;
				grid-template-columns: repeat(7, 1fr);
				position: relative;
				padding: 0 50px;
				&__arrow {
					position: absolute;
					top: 50%;
					font-size: 40px;
					cursor: pointer;
					transform: translateY(-50%);
					&_left {
						left: 0;
					}
					&_right {
						right: 0;
					}
					&_disable {
						cursor: default;
						opacity: 0.5;
					}
				}

				&__item {
					display: inline-grid;
					width: 120px;
					grid-template-rows: 50px 1fr;
					height: 100%;
					border: 1px solid #e0e0e0;
					cursor: pointer;
					transition: border 0.3s ease;
					&_weekends {
						color: rgb(171, 0, 0);
					}
					&_opacity {
						opacity: 0.5;
					}
					&_selected {
						border: 1px solid orange;
					}
					&-row {
						&-1 {
							opacity: 0.6;
							text-transform: uppercase;
							align-self: center;
							justify-self: center;
						}
						&-2 {
							border-top: 2px solid #e0e0e0;
							display: grid;
							grid-template-rows: 80px 60px;
							&__date {
								font-size: 30px;
								align-self: end;
							}
							&__month {
								opacity: 0.6;
								font-size: 20px;
								align-self: center;
							}
							span {
								justify-self: center;
							}
						}
					}
				}
			}
		}
	}
}
</style>
