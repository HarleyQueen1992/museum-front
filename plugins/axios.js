export default function ({ app: { $axios, $auth }, redirect }) {
	$axios.onRequest(config => {
		console.log('Making request to ' + config.url)
	})

	// $axios.onError(async error => {
	// 	const code = parseInt(error.response && error.response.status)
	// 	if (code === 400) {
	// 		console.log('400')
	// 	}
	// 	if (code === 401) {
	// 		redirect('/login')
	// 	}
	// })
}
