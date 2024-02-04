<template>
	<footer class="footer">
		<div class="footer-content container">
			<div class="footer-content-row-1">
				<div class="footer-content-row-1-col-1">
					<img src="../static/images/vk.svg" alt="vk" />
					<img src="../static/images/fb.svg" alt="fb" />
					<img src="../static/images/yt.svg" alt="yt" />
					<img src="../static/images/tg.svg" alt="tg" />
					<img src="../static/images/ig.svg" alt="ig" />
				</div>
				<div class="footer-content-row-1-col-2">
					<p>
						АДМИНИСТРАТОР: <a href="tel:+79592030872">+7 (959) 203-08-72</a>
					</p>
					<p>
						ЗАКАЗ ЭКСКУРСИЙ:
						<a href="tel:+79592030872">+7 (959) 203-07-92</a>,
						<a href="tel:+79591440792">+7 (959) 144-07-92</a>
					</p>
				</div>
				<div class="footer-content-row-1-col-3">
					<img
						src="../static/images/museum-building.png"
						alt="museum-building"
					/>
				</div>
			</div>
			<div class="footer-content-row-2">
				<div class="footer-content-row-2-col-1">
					<nuxt-link to="/about">О музее</nuxt-link>
				</div>
				<div class="footer-content-row-2-col-2">
					<nuxt-link to="#">Новости</nuxt-link
					><nuxt-link to="/visitors">Посетителям</nuxt-link>
				</div>
				<div class="footer-content-row-2-col-3">
					<nuxt-link to="#">Экспозиция</nuxt-link>
					<nuxt-link to="/contacts">Контакты</nuxt-link>
				</div>
				<div class="footer-content-row-2-col-4">
					<span> г. Луганск, ул. Коцюбинского, 10</span>
					<div>
						Мы открыты: ВТ-ВС с 10:00 до 19:00 <br />
						(вход для посетителей – до 18:30). <br />
						ПН – выходной.
					</div>
				</div>
			</div>
		</div>
	</footer>
</template>

<script lang="ts">
import Vue from 'vue'
export default Vue.extend({
	name: 'footer-component'
})
</script>

<style lang="scss">
.footer {
	background-color: #303035;
	&-content {
		display: grid;
		grid-template-rows: 150px auto;
		&-row-1 {
			display: grid;
			grid-template-columns: 1fr 1fr 1fr 450px;
			border-bottom: 1px solid #998e76;
			&-col-1 {
				padding-bottom: 20px;
				align-self: end;
				img {
					margin-right: 5%;
				}
			}
			&-col-2 {
				grid-column: 2/4;

				align-self: end;
				padding-bottom: 20px;

				p {
					color: #cdc4b3;
					opacity: 0.8;
					font-size: 13px;
					margin-top: 10px;
					line-height: 115%;
					a {
						text-transform: uppercase;
						color: #cdc4b3;
						margin-bottom: 4px;
						opacity: 0.8;
						transition: opacity 0.2s ease;
					}
					a:hover {
						opacity: 1.2;
					}
				}
			}
			&-col-3 {
				padding: 0 40px;
				display: grid;
				img {
					justify-self: center;
					background-color: #303034;
					transform: translateY(20px);
				}
			}
		}
		&-row-2 {
			display: grid;
			grid-template-columns: 1fr 1fr 1fr 450px;
			&-col-1 {
				justify-self: start;
				padding: 40px 0;
				a {
					color: white;
				}
				a:hover {
					text-decoration: underline;
				}
			}
			&-col-2 {
				justify-self: start;
				display: grid;
				grid-template-rows: 1fr 1fr;
				grid-row-gap: 20px;
				padding: 40px 0;
				a {
					color: white;
				}
				a:hover {
					text-decoration: underline;
				}
			}
			&-col-3 {
				justify-self: start;
				display: grid;
				grid-template-rows: 1fr 1fr;
				grid-row-gap: 20px;
				padding: 40px 0;
				a {
					color: white;
				}
				a:hover {
					text-decoration: underline;
				}
			}
			&-col-4 {
				justify-self: center;
				padding: 30px 40px;
				text-align: center;
				color: white;

				div {
					transform: translateY(20px);
					font-size: 12px;
					line-height: 115%;
					color: #cdc4b3;
				}
			}
		}
	}
}
</style>
