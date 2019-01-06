if ('serviceWorker' in navigator)
{
	// window.addEventListener('load', () => {
	// 	navigator.serviceWorker
	// 	// .register('../ngsw_worker.js')
	// 	.register('sw_worker.js')
	// 	.then(req => console.log('Service worker work'))
	// 	.catch(err => console.log('Error' + err));
	// })

	window.addEventListener('load', function() {
		navigator.serviceWorker.register('/sw_config.js').then(function(registration) {
		  // Registration was successful
		  console.log('ServiceWorker registration successful with scope: ', registration.scope);
		}, function(err) {
		  // registration failed :(
		  console.log('ServiceWorker registration failed: ', err);
		});
	  });
}