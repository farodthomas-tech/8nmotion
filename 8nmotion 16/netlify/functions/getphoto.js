const { getStore } = require("@netlify/blobs");

exports.handler = async function (event) {
  const key = event.queryStringParameters?.key;
  if (!key) return { statusCode: 400, body: "Missing key" };

  try {
    const store = getStore("8nmotion-photos");
    const { data, metadata } = await store.getWithMetadata(key, { type: "arrayBuffer" });

    if (!data) return { statusCode: 404, body: "Photo not found" };

    return {
      statusCode: 200,
      headers: {
        "Content-Type": metadata?.contentType || "image/jpeg",
        "Cache-Control": "public, max-age=31536000",
        "Access-Control-Allow-Origin": "*",
      },
      body: Buffer.from(data).toString("base64"),
      isBase64Encoded: true,
    };
  } catch (err) {
    return { statusCode: 500, body: err.message };
  }
};
