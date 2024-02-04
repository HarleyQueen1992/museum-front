<template>
	<div class="contacts">
		<div class="contacts-banner">
			<img src="../../static/images/contacts-banner.jpeg" alt="banner" />
			<h2 class="contacts-banner__title">Контакты</h2>
		</div>
		<div class="container">
			<h1 class="contacts__title">
				Учреждение "Луганский Государственный музей истории Великой
				отечественной войны"
			</h1>
			<div class="contacts-body">
				<div class="contacts-body-block">
					<div class="contacts-body-block-item">
						<i class="el-icon-location"></i>
						<span class="contacts-body-block-item__date"
							>Пр. Победителей, 8, г. Луганск, ЛНР, 10012</span
						>
					</div>
					<div class="contacts-body-block-item">
						<i class="el-icon-time"></i>
						<span class="contacts-body-block-item__schedule"
							>ВТ-ВС с 10:00 до 19:00 Вход для посетителей до 18:30.
						</span>
					</div>
					<div class="contacts-body-block-item">
						<i class="el-icon-message"></i>
						<span class="contacts-body-block-item__email"
							>museum@gmail.com</span
						>
					</div>
				</div>
				<div class="contacts-body-block">
					<h3 class="contacts-body-block__title">Администратор:</h3>
					<div class="contacts-body-block-item">
						<i class="el-icon-mobile-phone"></i>
						<a href="tel:+79591325687" class="contacts-body-block-item__phone"
							>+7 (959) 132-56-87
						</a>
					</div>
					<div class="contacts-body-block-item">
						<i class="el-icon-time"></i>
						<span class="contacts-body-block-item__schedule"
							>(ВТ-ВС с 10:00 до 17:00)</span
						>
					</div>
				</div>
				<div class="contacts-body-block">
					<h3 class="contacts-body-block__title">Приемная:</h3>
					<div class="contacts-body-block-item">
						<i class="el-icon-mobile-phone"></i>
						<a href="tel:+79591325687" class="contacts-body-block-item__phone"
							>+7 (959) 132-56-87
						</a>
					</div>
					<div class="contacts-body-block-item">
						<i class="el-icon-printer"></i>
						<a href="tel:+79591325687" class="contacts-body-block-item__phone"
							>+7 (959) 132-56-87
						</a>
					</div>
				</div>
				<div class="contacts-body-block">
					<h3 class="contacts-body-block__title">Заказ экскурсий:</h3>
					<div class="contacts-body-block-list">
						<a href="#" class="contacts-body-block-list-item">
							<i class="el-icon-phone"></i>
							<span class="contacts-body-block-list-item__social">Viber </span>
						</a>
						<a href="#" class="contacts-body-block-list-item">
							<i class="el-icon-s-promotion"></i>
							<span class="contacts-body-block-list-item__social"
								>Telegram
							</span>
						</a>
					</div>
					<div class="contacts-body-block-item">
						<i class="el-icon-time"></i>
						<span class="contacts-body-block-item__schedule"
							>(ВТ-ВС с 10:00 до 17:00)</span
						>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>
<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
	name: 'contacts',
	layout: 'pages'
})
</script>

<style lang="scss">
.contacts {
	&-banner {
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
	&__title {
		width: 80%;
		margin: 50px auto;
		font-weight: 500;
		font-size: 26px;
		text-align: center;
	}
	&-body {
		display: grid;
		grid-template-columns: 1fr 1fr;
		grid-column-gap: 50px;
		padding: 0 50px;
		&-block {
			background-color: white;
			border-top: 4px solid rgba(0, 0, 0, 0.5);
			padding: 30px 30px 10px 30px;
			margin-bottom: 50px;
			&__title {
				font-weight: 500;
				letter-spacing: 0.8px;
				margin-bottom: 20px;
			}
			&-item {
				display: grid;
				grid-template-columns: 20px 1fr;
				grid-column-gap: 10px;
				margin-bottom: 20px;

				&__phone {
					color: rgb(255, 89, 0);
				}
				i {
					color: black;
					opacity: 0.5;
					align-self: center;
					justify-self: center;
				}
				&__schedule {
					word-break: break-all;
				}
				span {
				}
			}
			&-list {
				display: grid;
				grid-template-columns: auto 1fr;
				grid-column-gap: 20px;
				margin-bottom: 20px;
				&-item {
					display: grid;
					grid-template-columns: 20px 1fr;
					grid-column-gap: 5px;
					color: black;
					&__social {
						color: rgb(255, 89, 0);
						display: inline;
						align-self: center;
					}
					i {
						color: rgb(255, 89, 0);
						align-self: center;
						font-size: 20px;
					}
				}
			}
		}
	}
}
</style>
