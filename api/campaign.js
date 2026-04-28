export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { user_id, ideal_customer_profile, content_pillars, brand_tone, post_frequency, campaign_idea, product_image, product_image_name } = req.body;

    if (!user_id || !ideal_customer_profile || !content_pillars || !brand_tone || !post_frequency || !campaign_idea) {
        return res.status(400).json({ error: 'All fields required except product_image' });
    }

    const webhookUrl = 'https://theproductunicorn.app.n8n.cloud/webhook/a031b89a-f861-4da9-8991-ac28ee4ef077';

    try {
        const payload = {
            user_id,
            ideal_customer_profile,
            content_pillars,
            brand_tone,
            post_frequency,
            campaign_idea
        };
        if (product_image) {
            payload.product_image = product_image;
        }
        if (product_image_name) {
            payload.product_image_name = product_image_name;
        }

        const response = await fetch(webhookUrl, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(payload)
        });

        if (!response.ok) {
            const responseText = await response.text();
            console.error('Webhook returned non-OK:', response.status, responseText);
            throw new Error(`Webhook failed: ${response.status} ${responseText}`);
        }

        return res.status(200).json({ message: 'Campaign submitted successfully' });
    } catch (error) {
        console.error('Webhook error:', error);
        return res.status(500).json({ error: error.message || 'Failed to submit campaign' });
    }
}