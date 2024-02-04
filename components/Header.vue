<template>
	<header class="header">
		<div id="header-row-background" class="header-row-background"></div>
		<div class="header-content container">
			<div class="header-content-row-1">
				<div class="header-content-row-1-logo">
					<nuxt-link to="/"
						><img src="../static/images/logo.png" alt="logo"
					/></nuxt-link>
				</div>
				<div class="header-content-row-1-title-block">
					<span class="header-content-row-1-title-block-official__website"
						>официальный сайт</span
					>
					<span class="header-content-row-1-title-block__title"
						>Луганский Государственный музей истории великой отечественной
						войны</span
					>
				</div>

				<div class="header-content-row-1-info">
					<div class="header-content-row-1-info-phone">
						<i class="el-icon-phone"></i>
						<a href="tel:+79592030872  ">+7 (959) 203-08-72</a>
					</div>
					<div class="header-content-row-1-info-time">
						<i class="el-icon-time"></i>
						<span>ВТ-ВС с 10:00 до 19:00</span>
					</div>
				</div>
				<nuxt-link to="/events" class="header-content-row-1-buy__ticket">
					<i class="el-icon-s-ticket"></i>
					<span>Купить билет</span>
				</nuxt-link>
			</div>
			<div class="header-content-row-2">
				<nav class="header-content-row-2-menu">
					<ul class="header-content-row-2-menu-list">
						<li class="header-content-row-2-menu-list__item">
							<nuxt-link id="header-menu_item" to="/about">О музее</nuxt-link>
						</li>
						<li class="header-content-row-2-menu-list__item">
							<nuxt-link id="header-menu_item" to="/news">Новости</nuxt-link>
						</li>
						<li class="header-content-row-2-menu-list__item">
							<nuxt-link id="header-menu_item" to="/visitors"
								>Посетителям</nuxt-link
							>
						</li>
						<li class="header-content-row-2-menu-list__item">
							<nuxt-link id="header-menu_item" to="#">Экспозиция</nuxt-link>
						</li>
						<li class="header-content-row-2-menu-list__item">
							<nuxt-link id="header-menu_item" to="/contacts"
								>Контакты</nuxt-link
							>
						</li>
					</ul>
				</nav>
			</div>
		</div>
	</header>
</template>
<script lang="ts">
import Vue from 'vue'

export default Vue.extend({
	name: 'header-component',
	mounted() {
		window.addEventListener('scroll', this.handleScroll)
	},
	destroyed() {
		window.removeEventListener('scroll', this.handleScroll)
	},
	methods: {
		handleScroll(event: any) {
			if (window.scrollY > 20) {
				document.getElementsByClassName('header')[0].classList.add('p-fixed')
				document
					.getElementsByClassName('content')[0]
					.classList.add('content-top')
				document!.getElementById('header-row-background')!.style!.display =
					'none'
				document
					.getElementsByClassName('header-content-row-2')[0]
					.classList.add('header-content-row-2-small')
				const items = document.getElementsByClassName(
					'header-content-row-2-menu-list__item'
				)
				for (let i = 0; i < items.length; i++) {
					items[i].classList.add('header-content-row-2-menu-list__item_small')
				}
			} else {
				document.getElementsByClassName('header')[0].classList.remove('p-fixed')
				document
					.getElementsByClassName('content')[0]
					.classList.remove('content-top')
				document!.getElementById('header-row-background')!.style!.display =
					'block'
				document
					.getElementsByClassName('header-content-row-2')[0]
					.classList.remove('header-content-row-2-small')
				const items = document.getElementsByClassName(
					'header-content-row-2-menu-list__item'
				)
				for (let i = 0; i < items.length; i++) {
					items[i].classList.remove(
						'header-content-row-2-menu-list__item_small'
					)
				}
			}
		}
	}
})
</script>
<style scoped lang="scss">
.header {
	background-color: #303034;
	position: absolute;
	z-index: 100;
	top: 0;
	width: 100%;
	&-row-background {
		width: 100%;
		height: 20px;
		background-color: #29292b;
	}

	&-content {
		height: 100%;
		display: grid;
		grid-template-rows: 100px auto;

		&-row-1 {
			display: grid;
			grid-template-columns: 200px 1fr 250px 200px;
			border-bottom: 1px solid #504d4d;
			&-buy__ticket {
				height: 50px;
				align-self: center;
				display: grid;
				grid-template-columns: auto 1fr;
				grid-column-gap: 10px;
				padding: 10px 30px;
				color: white;
				border-left: 1px solid #504d4d;
				i {
					align-self: center;
					font-size: 20px;
				}
				span {
					align-self: center;
					color: white;
					font-weight: 600;
					font-size: 12px;
					line-height: 16px;
					letter-spacing: 0.03em;
					text-transform: uppercase;
					transition: all 0.3s ease;
				}
			}
			&-buy__ticket:hover {
				span {
					color: #8a8441;
				}
			}
			&-title-block {
				align-self: center;
				display: grid;
				height: 100%;
				padding: 10px 50px;
				grid-template-rows: 14px auto;
				grid-row-gap: 10px;
				&-official__website {
					color: #cdc4b3;
					font-weight: 200;
					letter-spacing: 1.5px;
					font-size: 14px;
				}
				&__title {
					text-transform: uppercase;
					font-size: 18px;
					line-height: 26px;
					font-weight: 500;
					color: white;
				}
			}
			&-info {
				align-self: center;
				padding: 0 30px;
				display: grid;
				grid-template-rows: 1fr 1fr;
				grid-row-gap: 6px;
				border-left: 1px solid #504d4d;
				height: 50px;
				&-phone {
					display: grid;
					grid-template-columns: auto 1fr;
					grid-column-gap: 15px;
					i {
						align-self: center;
						color: #cdc4b3;
					}
					a {
						align-self: center;
						color: #cdc4b3;
						font-size: 13px;
					}
				}
				&-time {
					display: grid;
					grid-template-columns: auto 1fr;
					grid-column-gap: 15px;
					i {
						align-self: center;
						color: #cdc4b3;
					}
					span {
						align-self: center;
						color: #cdc4b3;
						font-size: 13px;
					}
				}
			}
			&-logo {
				align-self: center;
				a {
					img {
						width: 200px;
					}
				}
			}
		}
		&-row-2 {
			height: 50px;
			transition: height 0.2s ease;

			&-menu {
				height: inherit;
				&-list {
					height: inherit;
					display: grid;
					grid-template-columns: repeat(5, 1fr);
					&__item {
						align-self: center;
						justify-self: center;
						a {
							font-weight: 500;
							padding: 10px 20px;
							font-size: 16px;
							text-transform: uppercase;
							color: white;
							transition: all 0.3s ease;
						}
						a:hover {
							color: #8a8441;
						}
					}
				}
			}
		}
	}
}
@media (max-width: 1700px) {
	.header-content-row-1-title-block__title {
		font-size: 16px;
	}
}
.header-content-row-2-small {
	height: 40px;
}
.header-content-row-2-menu-list__item_small a {
	font-size: 14px;
}
</style>
