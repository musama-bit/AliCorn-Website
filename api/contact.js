const OWNER_ID = '80259744'; // Jeff's HubSpot owner ID

export default async function handler(req, res) {
    if (req.method !== 'POST') {
        return res.status(405).json({ error: 'Method not allowed' });
    }

    const { firstName, lastName, email, note } = req.body;

    if (!firstName || !lastName || !email || !note) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    if (!email.includes('@')) {
        return res.status(400).json({ error: 'Valid email required' });
    }

    const apiKey = process.env.HUBSPOT_API_KEY;
    if (!apiKey) {
        console.error('HUBSPOT_API_KEY not configured');
        return res.status(500).json({ error: 'Server configuration error' });
    }

    const headers = {
        'Authorization': `Bearer ${apiKey}`,
        'Content-Type': 'application/json'
    };

    try {
        // Step 1: Create or update contact in HubSpot as a lead
        let contactId;

        const createResponse = await fetch(
            'https://api.hubapi.com/crm/v3/objects/contacts',
            {
                method: 'POST',
                headers,
                body: JSON.stringify({
                    properties: {
                        email,
                        firstname: firstName,
                        lastname: lastName,
                        lifecyclestage: 'lead',
                        hs_lead_status: 'NEW',
                        company: 'Alicorn AI Contact Form'
                    }
                })
            }
        );

        if (createResponse.status === 409) {
            // Contact exists, update them
            const conflict = await createResponse.json();
            contactId = conflict.message?.match(/ID: (\d+)/)?.[1];

            if (contactId) {
                await fetch(
                    `https://api.hubapi.com/crm/v3/objects/contacts/${contactId}`,
                    {
                        method: 'PATCH',
                        headers,
                        body: JSON.stringify({
                            properties: {
                                firstname: firstName,
                                lastname: lastName,
                                hs_lead_status: 'NEW',
                                company: 'Alicorn AI Contact Form'
                            }
                        })
                    }
                );
            }
        } else if (createResponse.ok) {
            const created = await createResponse.json();
            contactId = created.id;
        } else {
            const err = await createResponse.json();
            throw new Error(`HubSpot contact create failed: ${createResponse.status} ${JSON.stringify(err)}`);
        }

        // Step 2: Create a note on the contact with the message
        if (contactId) {
            const noteBody = `Alicorn AI Contact Form Submission\n\nFrom: ${firstName} ${lastName} (${email})\n\nMessage:\n${note}`;

            const noteResponse = await fetch(
                'https://api.hubapi.com/crm/v3/objects/notes',
                {
                    method: 'POST',
                    headers,
                    body: JSON.stringify({
                        properties: {
                            hs_timestamp: new Date().toISOString(),
                            hs_note_body: noteBody
                        },
                        associations: [
                            {
                                to: { id: contactId },
                                types: [
                                    {
                                        associationCategory: 'HUBSPOT_DEFINED',
                                        associationTypeId: 202
                                    }
                                ]
                            }
                        ]
                    })
                }
            );

            if (!noteResponse.ok) {
                console.error('Note creation failed:', await noteResponse.text());
            }
        }

        // Step 3: Create a task assigned to Jeff for email notification
        if (contactId) {
            const taskResponse = await fetch(
                'https://api.hubapi.com/crm/v3/objects/tasks',
                {
                    method: 'POST',
                    headers,
                    body: JSON.stringify({
                        properties: {
                            hs_task_subject: `Alicorn AI Contact: ${firstName} ${lastName}`,
                            hs_task_body: `New contact form submission from ${firstName} ${lastName} (${email}):\n\n${note}`,
                            hs_task_status: 'NOT_STARTED',
                            hs_task_priority: 'HIGH',
                            hubspot_owner_id: OWNER_ID,
                            hs_timestamp: new Date().toISOString()
                        },
                        associations: [
                            {
                                to: { id: contactId },
                                types: [
                                    {
                                        associationCategory: 'HUBSPOT_DEFINED',
                                        associationTypeId: 204
                                    }
                                ]
                            }
                        ]
                    })
                }
            );

            if (!taskResponse.ok) {
                console.error('Task creation failed:', await taskResponse.text());
            }
        }

        return res.status(200).json({ success: true });

    } catch (error) {
        console.error('Contact form error:', error.message);
        return res.status(500).json({ error: 'Failed to submit form' });
    }
}
