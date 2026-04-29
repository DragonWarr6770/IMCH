const Pusher = require("pusher");

const pusher = new Pusher({
  appId: "YOUR_APP_ID", // Find this in Pusher Dashboard
  key: "3f9a95e2f8c70c6a4c0e",
  secret: "YOUR_SECRET", // Find this in Pusher Dashboard
  cluster: "ap2",
  useTLS: true
});

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).send();
  const data = req.body;
  await pusher.trigger("my-channel", "my-event", data);
  res.status(200).json({ success: true });
}