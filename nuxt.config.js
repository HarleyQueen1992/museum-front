export default {
	// Target: https://go.nuxtjs.dev/config-target
	target: 'server',

	// ssr: true,

	// Global page headers: https://go.nuxtjs.dev/config-head
	head: {
		title: 'museum-front',
		htmlAttrs: {
			lang: 'en'
		},
		meta: [
			{ charset: 'utf-8' },
			{ name: 'viewport', content: 'width=device-width, initial-scale=1' },
			{ hid: 'description', name: 'description', content: '' },
			{ name: 'format-detection', content: 'telephone=no' }
		],
		link: [{ rel: 'icon', type: 'image/x-icon', href: '/favicon.ico' }]
	},

	// Global CSS: https://go.nuxtjs.dev/config-css
	css: ['element-ui/lib/theme-chalk/index.css', '~/assets/scss/main.scss'],
	// Plugins to run before rendering page: https://go.nuxtjs.dev/config-plugins
	plugins: ['@/plugins/element-ui'],

	// Auto import components: https://go.nuxtjs.dev/config-components
	components: true,

	// Modules for dev and build (recommended): https://go.nuxtjs.dev/config-modules
	buildModules: [
		// https://go.nuxtjs.dev/typescript
		'@nuxt/typescript-build',
		'@nuxtjs/style-resources'
	],

	// Modules: https://go.nuxtjs.dev/config-modules
	modules: [
		// https://go.nuxtjs.dev/axios
		'@nuxtjs/axios',
		'@nuxtjs/auth-next'
		// '@nuxtjs/style-resources'
	],
	styleResources: {
		scss: ['~/assets/scss/variables.scss']
	},

	axios: {
		baseURL: 'http://localhost:5000/api/'
	},
	auth: {
		localStorage: false,
		cookie: {
			options: {
				expires: 7
			}
		},
		redirect: {
			login: '/login',
			logout: '/',
			callback: '/',
			home: '/'
		},
		strategies: {
			local: {
				scheme: 'refresh',
				token: {
					property: 'accesToken',
					maxAge: 60,
					global: true
				},
				refreshToken: {
					property: 'refreshToken',
					data: 'refreshToken',
					tokenRequired: true,
					maxAge: 60 * 60 * 24 * 30
				},
				endpoints: {
					login: {
						url: 'auth/login',
						method: 'post'
					},
					logout: false,
					refresh: { url: 'auth/token', method: 'post' },
					user: false
				}
			}
		},
		plugins: [
			{ src: '~/plugins/axios', ssr: true },
			{ src: '~/plugins/auth.js', mode: 'client' },
			{ src: 'node_modules/nuxt-auth-auto-refresh/dist/index.js', ssr: false }
		]
	},
	// Axios module configuration: https://go.nuxtjs.dev/config-axios

	// Build Configuration: https://go.nuxtjs.dev/config-build
	build: {
		transpile: [/^element-ui/]
	}
}
