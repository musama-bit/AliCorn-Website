export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { email } = req.body;

    if (!email || !email.includes('@')) {
        return res.status(400).json({ error: 'Valid email required' });
    }

    const apiKey = process.env.HUBSPOT_API_KEY;
    if (!apiKey) {
        console.error('HUBSPOT_API_KEY not configured');
        return res.status(500).json({ error: 'Server configuration error' });
    }

    try {
        // Create or update contact in HubSpot
        const response = await fetch(
            'https://api.hubapi.com/crm/v3/objects/contacts',
            {
                method: 'POST',
                headers: {
                    'Authorization': `Bearer ${apiKey}`,
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    properties: {
                        email: email,
                        lifecyclestage: 'subscriber',
                        hs_lead_status: 'NEW',
                        company: 'Alicorn AI Waitlist'
                    }
                })
            }
        );

        // If contact already exists, update them instead
        if (response.status === 409) {
            const conflict = await response.json();
            const existingId = conflict.message?.match(/ID: (\d+)/)?.[1];

            if (existingId) {
                const updateResponse = await fetch(
                    `https://api.hubapi.com/crm/v3/objects/contacts/${existingId}`,
                    {
                        method: 'PATCH',
                        headers: {
                            'Authorization': `Bearer ${apiKey}`,
                            'Content-Type': 'application/json'
                        },
                        body: JSON.stringify({
                            properties: {
                                company: 'Alicorn AI Waitlist',
                                hs_lead_status: 'NEW'
                            }
                        })
                    }
                );

                if (!updateResponse.ok) {
                    throw new Error(`HubSpot update failed: ${updateResponse.status}`);
                }
            }

            return res.status(200).json({ success: true, existing: true });
        }

        if (!response.ok) {
            const err = await response.json();
            throw new Error(`HubSpot create failed: ${response.status} ${JSON.stringify(err)}`);
        }

        return res.status(200).json({ success: true });

    } catch (error) {
        console.error('Waitlist error:', error.message);
        return res.status(500).json({ error: 'Failed to join waitlist' });
    }
}
