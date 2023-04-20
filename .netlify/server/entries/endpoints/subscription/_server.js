import PocketBase from "pocketbase";
const pb = new PocketBase("https://pb.foodtrck.app/");
function POST({ request }) {
  console.log("HITTING POST");
  return new Response(
    request.json().then(async (data) => {
      await pb.collection("notification_subscriptions").create({
        keys: data
      });
    })
  );
}
export {
  POST
};
