const { getStore } = require("@netlify/blobs");

exports.handler = async function (event) {
  const folder = event.queryStringParameters?.folder;
  if (!folder) return { statusCode: 400, body: JSON.stringify({ error: "Missing folder" }) };

  try {
    const store = getStore("8nmotion-photos");
    const prefix = `photos/${folder}/`;
    const { blobs } = await store.list({ prefix });

    const photos = blobs.map(b => ({
      key: b.key,
      url: `/.netlify/functions/getphoto?key=${encodeURIComponent(b.key)}`,
      filename: b.key.replace(prefix, ""),
    }));

    return {
      statusCode: 200,
      headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
      body: JSON.stringify({ photos }),
    };
  } catch (err) {
    return { statusCode: 500, body: JSON.stringify({ error: err.message }) };
  }
};
