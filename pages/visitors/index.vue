<template>
	<div class="visitors">
		<div class="visitors-header">
			<img src="../../static/images/contacts-banner.jpeg" alt="banner" />
			<h1 class="visitors-header__title">Посетителям</h1>
		</div>
		<div class="container">
			<div class="visitors-body">
				<div class="visitors-body-col-1">
					<h2 class="visitors-body-col-1__title">Правила покупки билетов</h2>
					<p class="visitors-body-col-1__text">
						Уважаемые посетители! Для оформления электронного заказа необходимо
						предпринять следующие действия:
					</p>
					<h2 class="visitors-body-col-1__title">Выбор услуги</h2>
					<p class="visitors-body-col-1__text">
						При выборе услуги (посещение концертов, выставок, лекций и т.д.) для
						всех категорий граждан (взрослые, льготные) фиксируется определенная
						дата и время мероприятия. Выбрав услугу, нажмите кнопку «Купить
						билет».
					</p>
					<h2 class="visitors-body-col-1__title">Формирование заказа</h2>
					<p class="visitors-body-col-1__text">
						Перед дальнейшим оформлением электронного заказа и оплатой услуг
						Галереи ознакомьтесь, пожалуйста, с Правилами приобретения и
						возврата билетов и Правилами посещения . Если вы принимаете их
						условия, отметьте соответствующее поле. Выберите категорию и
						количество посетителей, укажите фамилию, имя и отчество получателя
						электронного заказа, номер мобильного телефона, адрес электронной
						почты для обратной связи, подтверждение правильности введенного
						адреса электронной почты для обратной связи. Далее, нажмите кнопку
						«Заказать».
					</p>
					<h2 class="visitors-body-col-1__title">Подтверждение заказа</h2>
					<p class="visitors-body-col-1__text">
						Этот пункт появляется, если вы оформляете заказ с именными билетами.
						Вам необходимо ввести следующую информацию: имя и фамилия владельца
						билета. Далее, нажмите кнопку «Подтвердить».
					</p>
					<h2 class="visitors-body-col-1__title">Просмотр заказа</h2>
					<p class="visitors-body-col-1__text">
						Проверьте правильность оформления заказа. Далее, нажмите кнопку
						«Оплатить».
					</p>
					<h2 class="visitors-body-col-1__title">Оплата заказа</h2>
					<p class="visitors-body-col-1__text">
						В случае успешной оплаты заказа на указанный вами адрес электронной
						почты будет отправлено письмо с номером заказа и ссылкой для
						распечатывания электронного билета со статусом «Оплачен».
					</p>
					<h2 class="visitors-body-col-1__title">Для информации</h2>
					<p class="visitors-body-col-1__text">
						В случае приобретения льготного билета при посещении Галереи
						посетители обязаны на контроле предъявить документ, подтверждающий
						право на льготу. <br /><br />
						Если вам полагается бесплатный билет, вы можете его приобрести как в
						кассах Галереи по адресам: Лаврушинский переулок,10, Крымский Вал,
						10, так и на сайте. Если вы приобрели электронный билет и хотите
						поменять дату и время, вам необходимо этот заказ аннулировать
						(смотрите раздел «Правила возврата билета») и оформить новый.
						<br /><br />
						Если вы совершили покупку и вам не пришла ссылка с электронными
						билетами или эта ссылка не открылась для распечатывания билетов, в
						этом случае вам необходимо получить билеты в кассах галереи в день
						посещения выставки.
					</p>
					<h2 class="visitors-body-col-1__title">Правила возврата билетов</h2>
					<p class="visitors-body-col-1__text">
						Возврат стоимости билета осуществляется в сроки, установленные
						Правилами приобретения и возврата билетов для данной категории
						билета.
						<br />
						<br />
						Для оформления возврата электронных билетов и билетов, приобретенных
						в кассе Галереи, необходимо заполнить заявление установленной формы.
						<br /><br />
						Возврат денежных средств за билеты, оплаченные банковской картой,
						производится на Ф.И.О. и банковскую карту плательщика, которая
						использовалась при оплате заказа. При заполнении заявления,
						пожалуйста, обратите внимание, что указывается не номер банковской
						карты, а номер счета, к которому привязана карта (состоит из 20
						цифр). Срок рассмотрения заявления — 10 дней.
					</p>
				</div>
				<div class="visitors-body-col-2">
					<h2 class="visitors-body-col-2__title">Время работы кассы</h2>
					<div class="visitors-body-col-2-body">
						<div class="visitors-body-col-2-body-item">
							<span class="visitors-body-col-2-body-item-col-1">Пн</span>
							<span class="visitors-body-col-2-body-item-col-2">Закрыто</span>
							<span class="visitors-body-col-2-body-item-col-1"
								>Вт, Ср, Вс</span
							>
							<span class="visitors-body-col-2-body-item-col-2"
								>10:00 — 17:00</span
							>
							<span class="visitors-body-col-2-body-item-col-1"
								>Чт, Пт, Сб</span
							>
							<span class="visitors-body-col-2-body-item-col-2"
								>10:00 — 20:00
							</span>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
	name: 'visitors-component',
	layout: 'pages'
})
</script>

<style lang="scss">
.visitors {
	position: relative;
	&-header {
		position: relative;
		height: 300px;
		width: 100%;
		img {
			position: absolute;
			top: 0;
			left: 0;
			z-index: 10;
			object-fit: cover;
			width: 100%;
			height: 100%;
		}
		&__title {
			position: absolute;
			top: 50%;
			text-transform: uppercase;
			font-weight: 400;
			font-size: 50px;
			left: 50%;
			z-index: 11;
			padding-bottom: 20px;
			color: white;
			transform: translateX(-50%);
			&::before {
				content: '';
				position: absolute;
				left: 50%;
				z-index: 11;
				width: 25%;
				height: 4px;
				background-color: rgba(255, 255, 255, 0.5);
				bottom: 0;
				transform: translateX(-50%);
			}
		}
	}
	&-body {
		margin-top: 50px;
		display: grid;
		grid-template-columns: 60% 40%;
		grid-column-gap: 50px;
		&-col-2 {
			position: sticky;
			width: 70%;
			&__title {
				font-size: 25px;
				font-weight: 500;
			}
			&-body {
				margin-top: 30px;
				padding-bottom: 20px;
				border-bottom: 1px solid rgba(0, 0, 0, 0.2);
				&-item {
					display: grid;
					grid-template-columns: 1fr 1fr;
					opacity: 0.8;
					&-col-1 {
						justify-self: start;
						align-self: center;
						font-size: 18px;
						margin-bottom: 10px;
					}
					&-col-2 {
						justify-self: end;
						align-self: center;
						font-size: 18px;
						margin-bottom: 10px;
					}
				}
			}
		}
		&-col-1 {
			width: 100%;
			&__title {
				font-weight: 500;
				font-size: 25px;
				margin-bottom: 20px;
			}
			&__text {
				font-size: 18px;
				line-height: 28px;
				word-wrap: break-word;
				margin-bottom: 50px;
			}
		}
	}
}
</style>
