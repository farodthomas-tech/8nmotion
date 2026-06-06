exports.handler = async function (event) {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  const { email, firstName, lastName } = JSON.parse(event.body);

  if (!email) {
    return { statusCode: 400, body: JSON.stringify({ error: "Email is required" }) };
  }

  const server   = process.env.MAILCHIMP_SERVER;
  const apiKey   = process.env.MAILCHIMP_API_KEY;
  const listId   = process.env.MAILCHIMP_AUDIENCE_ID;

  try {
    const response = await fetch(
      `https://${server}.api.mailchimp.com/3.0/lists/${listId}/members`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `apikey ${apiKey}`,
        },
        body: JSON.stringify({
          email_address: email,
          status: "subscribed",
          merge_fields: {
            FNAME: firstName || "",
            LNAME: lastName  || "",
          },
        }),
      }
    );

    const data = await response.json();

    if (response.status === 200 || response.status === 201) {
      return {
        statusCode: 200,
        body: JSON.stringify({ success: true, message: "Subscribed successfully!" }),
      };
    }

    // Already subscribed
    if (data.title === "Member Exists") {
      return {
        statusCode: 200,
        body: JSON.stringify({ success: true, message: "You're already subscribed!" }),
      };
    }

    return {
      statusCode: 400,
      body: JSON.stringify({ error: data.detail || "Subscription failed" }),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message }),
    };
  }
};
