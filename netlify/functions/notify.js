exports.handler = async function (event) {
  if (event.httpMethod !== "POST") {
    return { statusCode: 405, body: "Method Not Allowed" };
  }

  const { subject, message, updateType } = JSON.parse(event.body);

  const server = process.env.MAILCHIMP_SERVER;
  const apiKey = process.env.MAILCHIMP_API_KEY;
  const listId = process.env.MAILCHIMP_AUDIENCE_ID;

  const emoji = {
    events:     "📅",
    spotlights: "⭐",
    updates:    "📢",
    general:    "8️⃣",
  }[updateType] || "8️⃣";

  const htmlContent = `
<!DOCTYPE html>
<html>
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>${subject}</title>
</head>
<body style="margin:0;padding:0;background:#0D0D0D;font-family:'Helvetica Neue',Arial,sans-serif;">
  <table width="100%" cellpadding="0" cellspacing="0" style="background:#0D0D0D;padding:40px 20px;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" style="max-width:600px;width:100%;">

          <!-- Header -->
          <tr>
            <td style="background:linear-gradient(135deg,#1A1200,#0D0D0D);border:1px solid rgba(212,168,67,0.3);border-radius:16px 16px 0 0;padding:36px 40px;text-align:center;">
              <div style="font-size:3rem;font-weight:900;color:#D4A843;letter-spacing:0.05em;font-family:Impact,sans-serif;">8NMOTION</div>
              <div style="font-size:0.85rem;color:rgba(250,250,250,0.5);margin-top:6px;letter-spacing:0.1em;text-transform:uppercase;">Family Hub Update</div>
            </td>
          </tr>

          <!-- Body -->
          <tr>
            <td style="background:#181818;border-left:1px solid rgba(212,168,67,0.15);border-right:1px solid rgba(212,168,67,0.15);padding:36px 40px;">
              <div style="font-size:1.8rem;margin-bottom:16px;">${emoji}</div>
              <h2 style="color:#FAFAFA;font-size:1.4rem;margin:0 0 16px;font-family:Impact,sans-serif;letter-spacing:0.04em;">${subject}</h2>
              <p style="color:rgba(250,250,250,0.7);font-size:0.95rem;line-height:1.75;margin:0 0 24px;">${message}</p>
              <a href="https://8nmotion.com" style="display:inline-block;background:#D4A843;color:#0D0D0D;text-decoration:none;padding:12px 32px;border-radius:8px;font-weight:700;font-size:0.9rem;letter-spacing:0.04em;">Visit 8NMotion.com</a>
            </td>
          </tr>

          <!-- Footer -->
          <tr>
            <td style="background:#0D0D0D;border:1px solid rgba(212,168,67,0.15);border-top:none;border-radius:0 0 16px 16px;padding:24px 40px;text-align:center;">
              <p style="color:rgba(255,255,255,0.3);font-size:0.75rem;margin:0;">Always moving. Always together.</p>
              <p style="color:rgba(255,255,255,0.2);font-size:0.7rem;margin:8px 0 0;">You received this because you subscribed to 8NMotion Family Hub updates.</p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;

  try {
    // Step 1: Create campaign
    const campaignRes = await fetch(
      `https://${server}.api.mailchimp.com/3.0/campaigns`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `apikey ${apiKey}`,
        },
        body: JSON.stringify({
          type: "regular",
          recipients: { list_id: listId },
          settings: {
            subject_line: `8NMotion: ${subject}`,
            from_name:    "8NMotion Family Hub",
            reply_to:     "noreply@8nmotion.com",
            title:        `8NMotion Update - ${new Date().toLocaleDateString()}`,
          },
        }),
      }
    );

    const campaign = await campaignRes.json();
    if (!campaign.id) {
      return { statusCode: 500, body: JSON.stringify({ error: "Failed to create campaign", detail: campaign }) };
    }

    // Step 2: Set campaign content
    await fetch(
      `https://${server}.api.mailchimp.com/3.0/campaigns/${campaign.id}/content`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `apikey ${apiKey}`,
        },
        body: JSON.stringify({ html: htmlContent }),
      }
    );

    // Step 3: Send campaign
    const sendRes = await fetch(
      `https://${server}.api.mailchimp.com/3.0/campaigns/${campaign.id}/actions/send`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `apikey ${apiKey}`,
        },
      }
    );

    if (sendRes.status === 204) {
      return {
        statusCode: 200,
        body: JSON.stringify({ success: true, message: "Email sent to all subscribers!" }),
      };
    }

    const sendData = await sendRes.json();
    return {
      statusCode: 400,
      body: JSON.stringify({ error: sendData.detail || "Failed to send campaign" }),
    };
  } catch (err) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: err.message }),
    };
  }
};
