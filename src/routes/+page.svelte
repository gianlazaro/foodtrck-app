<script>
	import { onMount } from 'svelte';

	onMount(async () => {
		if ('serviceWorker' in navigator) {
			await navigator.serviceWorker.register('./serviceworker.js');
			console.log('Registered service worker.');
		}
	});

	async function getNotifications() {
		Notification.requestPermission(() => {
			alert('Notification permissions are ' + Notification.permission);
		});

		navigator.serviceWorker.ready
			.then((registration) => {
				return registration.pushManager.getSubscription().then(async (subscription) => {
					if (subscription) {
						return subscription;
					}

					const res = await fetch('https://www.foodtrck.app');
					const applicationServerKey = await res.text();

					return registration.pushManager.subscribe({
						userVisibleOnly: true,
						applicationServerKey
					});
				});
			})
			.then((subscription) => {
				fetch('https://www.foodtrck.app', {
					method: 'post',
					headers: {
						'Content-type': 'application/json'
					},
					body: JSON.stringify({
						subscription
					})
				});
			});
	}
</script>

<h1>Notifications test</h1>
<button on:click={getNotifications}>Get notifications</button>
