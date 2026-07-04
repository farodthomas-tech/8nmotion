const { getStore } = require("@netlify/blobs");

exports.handler = async function (event) {
  if (event.httpMethod !== "POST") return { statusCode: 405, body: "Method Not Allowed" };

  try {
    const body = JSON.parse(event.body);
    const { folder, filename, data, contentType } = body;

    if (!folder || !filename || !data) {
      return { statusCode: 400, body: JSON.stringify({ error: "Missing folder, filename, or data" }) };
    }

    // Clean filename — remove spaces and special chars
    const cleanName = filename.replace(/[^a-zA-Z0-9._-]/g, "_");
    const key = `photos/${folder}/${cleanName}`;

    const store = getStore("8nmotion-photos");

    // Decode base64 and store
    const buffer = Buffer.from(data, "base64");
    await store.set(key, buffer, { metadata: { contentType: contentType || "image/jpeg" } });

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
      body: JSON.stringify({ success: true, key, url: `/.netlify/functions/getphoto?key=${encodeURIComponent(key)}` }),
    };
  } catch (err) {
    return { statusCode: 500, body: JSON.stringify({ error: err.message }) };
  }
};
