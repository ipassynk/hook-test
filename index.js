const express = require("express");
const bodyParser = require("body-parser");
const app = express();

const VERIFY_TOKEN = "my_secret_token";

app.use(bodyParser.json());

// Webhook verification
app.get("/webhook", (req, res) => {
  const mode = req.query["hub.mode"];
  const token = req.query["hub.verify_token"];
  const challenge = req.query["hub.challenge"];

  if (mode === "subscribe" && token === VERIFY_TOKEN) {
    console.log("Webhook verified");
    res.status(200).send(challenge);
  } else {
    res.sendStatus(403);
  }
});

// Receiving messages
app.post("/webhook", (req, res) => {
  const body = req.body;
  console.log("Received webhook:", JSON.stringify(body, null, 2));
  res.sendStatus(200);
});

app.listen(3000, () => console.log("Webhook server is running on port 3000"));

