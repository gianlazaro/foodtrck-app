import PocketBase from 'pocketbase';

const pb = new PocketBase('https://pb.foodtrck.app');

export function POST({ request }) {
	return new Response(
		request.json().then(async (data) => {
			// send data obj to server
			await pb.collection('notification_subscriptions').create({
				keys: data
			});
		})
	);
}
