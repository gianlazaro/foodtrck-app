const urlB64ToUint8Array = (base64String) => {
	const padding = '='.repeat((4 - (base64String.length % 4)) % 4);
	const base64 = (base64String + padding).replace(/\-/g, '+').replace(/_/g, '/');
	const rawData = atob(base64);
	const outputArray = new Uint8Array(rawData.length);
	for (let i = 0; i < rawData.length; ++i) {
		outputArray[i] = rawData.charCodeAt(i);
	}
	return outputArray;
};

self.addEventListener('activate', function (event) {
	self.registration.pushManager.getSubscription().then(async (subscription) => {
		if (subscription) {
			return subscription;
		}

		const res = await fetch('https://www.foodtrck.app');
		let applicationServerKey = await res.text();
		applicationServerKey = urlB64ToUint8Array(applicationServerKey);

		const sub = await self.registration.pushManager.subscribe({
			userVisibleOnly: true,
			applicationServerKey
		});

		console.log('SUB: ' + JSON.stringify(sub));
		// save record to database by sending a post requeset

		fetch('https://www.foodtrck.app/subscription', {
			method: 'POST',
			body: JSON.stringify(sub),
			headers: {
				'Content-Type': 'application/json'
			}
		});
	});
});

self.addEventListener('push', function (event) {
	// Keep the service worker alive until the notification is created.
	// event.waitUntil(
	// 	// Show a notification with title 'ServiceWorker Cookbook' and body 'Alea iacta est'.
	// 	self.registration.showNotification('ServiceWorker Cookbook', {
	// 		body: event.data.text()
	// 	})
	// );

	if (event.data) {
		console.log('sent: ' + event.data.text());

		self.registration.showNotification('test', {
			body: event.data.text()
		});
	} else {
		console.log('push event with no data');
	}
});
