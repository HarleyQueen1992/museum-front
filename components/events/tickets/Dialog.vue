<template>
	<el-dialog
		class="dialog"
		title="Оформить покупки"
		:visible="dialogVisible"
		:show-close="false"
		@close="dialogVisibleFalse"
		width="500px"
		center
	>
		<div class="dialog-body">
			<div class="dialog-body__description">
				Для оформления необходимо заполнить все поля
			</div>
			<div class="dialog-body-item">
				<span class="dialog-body-item__label">ВАША ФАМИЛИЯ И ИМЯ</span>
				<input class="dialog-body-item__input" type="text" v-model="fio" />
			</div>
			<div class="dialog-body-item">
				<span class="dialog-body-item__label">E-MAIL</span>
				<input class="dialog-body-item__input" type="text" v-model="email" />
			</div>
			<div class="dialog-body-item">
				<span class="dialog-body-item__label">ТЕЛЕФОН</span>
				<input class="dialog-body-item__input" type="text" v-model="phone" />
			</div>
		</div>
		<span slot="footer" class="dialog-footer">
			<button class="dialog-btn" @click="arrange()">Оплатить</button>
		</span>
	</el-dialog>
</template>

<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
	name: 'cart-dialog',
	props: {
		dialogVisible: Boolean,
		dialogVisibleFalse: Function
	},
	data() {
		return {
			fio: null as unknown as string,
			email: null as unknown as string,
			phone: null as unknown as string
		}
	},
	methods: {
		async arrange() {
			await this.$axios
				.$post('/booking', {
					fio: this.fio,
					email: this.email,
					phone: this.phone,
					tickets: this.$store.getters.getBooking
				})
				.then(res => {
          console.log(res);
          
					this.$message({
						message: 'Успешно оплачено',
						type: 'success'
					})
					this.dialogVisibleFalse()
					this.$store.commit('clearBooking')
					this.$router.push(`/order/${res.id}`)
				})
				.catch(err => {
					for (const error of err.response.data.message) {
						setTimeout(() => {
							this.$message({
								message: `Ошибка ${error}`,
								type: 'warning'
							})
						}, 1)
					}
				})
		}
	}
})
</script>
<style lang="scss">
.el-dialog {
	&__header {
		padding-top: 50px;
		padding-bottom: 30px;
	}
	&__body {
		padding-top: 0 !important;
		padding-left: 50px !important;
		padding-right: 50px !important;
	}
	&__title {
		font-size: 30px;
	}
}
.dialog {
	&-body {
		&__description {
			text-align: left;
			word-break: break-word;
			font-size: 20px;
			margin-bottom: 30px;
		}
		&-item {
			display: grid;
			grid-template-rows: 30px 35px;
			margin-bottom: 20px;
			&__label {
				font-size: 12px;
				align-self: center;
			}
			&__input {
				padding: 5px 10px;
				font-size: 14px;
				height: 100%;
				border: 1px solid rgba(0, 0, 0, 0.5);
			}
		}
	}
	&-btn {
		background-color: black;
		width: 200px;
		height: 50px;
		color: white;
		cursor: pointer;
		font-size: 18px;
	}
}
</style>
