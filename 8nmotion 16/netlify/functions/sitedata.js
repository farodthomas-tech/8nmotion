exports.handler = async function (event) {
  // GET — try to load from blobs, silently return null if not configured
  if (event.httpMethod === "GET") {
    try {
      const { getStore } = require("@netlify/blobs");
      const store = getStore("8nmotion-data");
      const data  = await store.get("site-data", { type: "json" });
      return {
        statusCode: 200,
        headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
        body: JSON.stringify(data || null),
      };
    } catch {
      // Blobs not configured — return null so site uses defaults
      return {
        statusCode: 200,
        headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
        body: JSON.stringify(null),
      };
    }
  }

  // POST — try to save, silently ignore if not configured
  if (event.httpMethod === "POST") {
    try {
      const { getStore } = require("@netlify/blobs");
      const store = getStore("8nmotion-data");
      const body  = JSON.parse(event.body);
      await store.setJSON("site-data", body);
      return {
        statusCode: 200,
        headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
        body: JSON.stringify({ success: true }),
      };
    } catch {
      return {
        statusCode: 200,
        headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
        body: JSON.stringify({ success: false, note: "Storage not configured" }),
      };
    }
  }

  return { statusCode: 405, body: "Method Not Allowed" };
};
