import webpush from 'web-push';
import PocketBase from 'pocketbase';

const pb = new PocketBase('https://pb.foodtrck.app');

const { publicKey, privateKey } = webpush.generateVAPIDKeys();

console.log(publicKey);

webpush.setVapidDetails('mailto:hello@gianlazaro.com', publicKey, privateKey);

export function GET() {
	return new Response(publicKey);
}

// pull all subscribers and send notifications
export function POST({ request }) {
	return new Response(
		request
			.json()
			.then(async (data) => {
				const subscribers = await pb.collection('notification_subscriptions').getFullList();

				subscribers.forEach((sub) => {
					webpush.sendNotification(sub.keys, data.message).catch((err) => {
						console.error(err);
					});
				});
			})
			.catch((err) => {
				console.error(err);
				console.log('Aborted: ' + err.isAbort);
			})
	);
}
