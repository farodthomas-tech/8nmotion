exports.handler = async function (event) {
  if (event.httpMethod !== "POST") return { statusCode: 405, body: "Method Not Allowed" };

  try {
    const { folder, filename, data, contentType } = JSON.parse(event.body);

    if (!folder || !filename || !data) {
      return { statusCode: 400, body: JSON.stringify({ error: "Missing folder, filename, or data" }) };
    }

    const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
    const apiKey    = process.env.CLOUDINARY_API_KEY;
    const apiSecret = process.env.CLOUDINARY_API_SECRET;

    if (!cloudName || !apiKey || !apiSecret) {
      return { statusCode: 500, body: JSON.stringify({ error: "Cloudinary credentials not configured" }) };
    }

    // Build signature for authenticated upload
    const timestamp   = Math.round(Date.now() / 1000);
    const publicId    = `8nmotion/${folder}/${filename.replace(/[^a-zA-Z0-9._-]/g, "_").replace(/\.[^.]+$/, "")}`;
    const crypto      = require("crypto");
    const sigString   = `public_id=${publicId}&timestamp=${timestamp}${apiSecret}`;
    const signature   = crypto.createHash("sha1").update(sigString).digest("hex");

    // Build multipart form body
    const boundary = "----FormBoundary" + Math.random().toString(36).slice(2);
    const dataBuffer = Buffer.from(data, "base64");

    const parts = [
      `--${boundary}\r\nContent-Disposition: form-data; name="file"; filename="${filename}"\r\nContent-Type: ${contentType || "image/jpeg"}\r\n\r\n`,
      dataBuffer,
      `\r\n--${boundary}\r\nContent-Disposition: form-data; name="public_id"\r\n\r\n${publicId}`,
      `\r\n--${boundary}\r\nContent-Disposition: form-data; name="timestamp"\r\n\r\n${timestamp}`,
      `\r\n--${boundary}\r\nContent-Disposition: form-data; name="api_key"\r\n\r\n${apiKey}`,
      `\r\n--${boundary}\r\nContent-Disposition: form-data; name="signature"\r\n\r\n${signature}`,
      `\r\n--${boundary}--\r\n`,
    ];

    const bodyParts = parts.map(p => typeof p === "string" ? Buffer.from(p) : p);
    const bodyBuffer = Buffer.concat(bodyParts);

    const response = await fetch(`https://api.cloudinary.com/v1_1/${cloudName}/image/upload`, {
      method: "POST",
      headers: {
        "Content-Type": `multipart/form-data; boundary=${boundary}`,
        "Content-Length": bodyBuffer.length,
      },
      body: bodyBuffer,
    });

    const result = await response.json();

    if (result.secure_url) {
      return {
        statusCode: 200,
        headers: { "Content-Type": "application/json", "Access-Control-Allow-Origin": "*" },
        body: JSON.stringify({ success: true, url: result.secure_url, publicId: result.public_id }),
      };
    }

    return {
      statusCode: 400,
      body: JSON.stringify({ error: result.error?.message || "Upload failed" }),
    };

  } catch (err) {
    return { statusCode: 500, body: JSON.stringify({ error: err.message }) };
  }
};
