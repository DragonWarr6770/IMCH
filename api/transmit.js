const Pusher = require("pusher");

const pusher = new Pusher({
  appId: "2148250", 
  key: "3f9a95e2f8c70c6a4c0e",
  secret: "3c5407aab8085586e794", // Get this from Pusher "App Keys" tab
  cluster: "ap2",
  useTLS: true
});

export default async function handler(req, res) {
  if (req.method !== 'POST') return res.status(405).json({ error: "Method not allowed" });

  try {
    const data = typeof req.body === 'string' ? JSON.parse(req.body) : req.body;

    await pusher.trigger("my-channel", "my-event", {
      user: data.user || 'OLORIN',
      content: data.content,
      isImage: data.isImage || false
    });

    return res.status(200).json({ success: true });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ error: error.message });
  }
}