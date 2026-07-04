exports.handler = async function (event) {
  if (event.httpMethod !== "POST") return { statusCode: 405, body: "Method Not Allowed" };

  try {
    const body = JSON.parse(event.body);
    const { folder, filename, data, contentType } = body;

    if (!folder || !filename || !data) {
      return { statusCode: 400, body: JSON.stringify({ error: `Missing: ${!folder?"folder":""} ${!filename?"filename":""} ${!data?"data":""}`.trim() }) };
    }

    const estimatedBytes = (data.length * 3) / 4;
    if (estimatedBytes > 4.5 * 1024 * 1024) {
      return { statusCode: 400, body: JSON.stringify({ error: `File too large (${Math.round(estimatedBytes/1024/1024)}MB). Please use a smaller photo.` }) };
    }

    const { getStore } = require("@netlify/blobs");

    const store = getStore({
      name: "8nmotion-photos",
      siteID: process.env.NETLIFY_SITE_ID || process.env.SITE_ID,
      token:  process.env.NETLIFY_BLOBS_TOKEN || process.env.TOKEN,
    });

    const cleanName = filename.replace(/[^a-zA-Z0-9._-]/g, "_");
    const key    = `photos/${folder}/${cleanName}`;
    const buffer = Buffer.from(data, "base64");

    await store.set(key, buffer, { metadata: { contentType: contentType || "image/jpeg" } });

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
      body: JSON.stringify({ success: true, key }),
    };
  } catch (err) {
    return { statusCode: 500, body: JSON.stringify({ error: err.message }) };
  }
};
