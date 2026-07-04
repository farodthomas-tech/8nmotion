const { getStore } = require("@netlify/blobs");

const getStore_ = () => getStore({
  name: "8nmotion-data",
  siteID: process.env.NETLIFY_SITE_ID || process.env.SITE_ID,
  token:  process.env.NETLIFY_BLOBS_TOKEN || process.env.TOKEN,
});

exports.handler = async function (event) {
  if (event.httpMethod === "GET") {
    try {
      const store = getStore_();
      const data  = await store.get("site-data", { type: "json" });
      return {
        statusCode: 200,
        headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
        body: JSON.stringify(data || null),
      };
    } catch (err) {
      return { statusCode: 500, body: JSON.stringify({ error: err.message }) };
    }
  }

  if (event.httpMethod === "POST") {
    try {
      const store = getStore_();
      const body  = JSON.parse(event.body);
      await store.setJSON("site-data", body);
      return {
        statusCode: 200,
        headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
        body: JSON.stringify({ success: true }),
      };
    } catch (err) {
      return { statusCode: 500, body: JSON.stringify({ error: err.message }) };
    }
  }

  return { statusCode: 405, body: "Method Not Allowed" };
};
