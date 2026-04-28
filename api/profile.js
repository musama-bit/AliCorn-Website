import { createClient } from '@supabase/supabase-js';

const SUPABASE_URL = 'https://wetbynbishrjgnnhtour.supabase.co';
// const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const SUPABASE_SERVICE_ROLE_KEY = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6IndldGJ5bmJpc2hyamdubmh0b3VyIiwicm9sZSI6InNlcnZpY2Vfcm9sZSIsImlhdCI6MTc3NjY3OTI0MSwiZXhwIjoyMDkyMjU1MjQxfQ.aDPRfvyeb4nLgZjobhyNKPxLOiotC3FT_SeGGThZPzo';


const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

export default async function handler(req, res) {
    if (req.method === 'GET') {
        // Get profile for user
        const { user_id } = req.query;
        if (!user_id) {
            return res.status(400).json({ error: 'user_id required' });
        }

        const { data, error } = await supabase
            .from('profiles')
            .select('*')
            .eq('user_id', user_id)
            .single();

        if (error && error.code !== 'PGRST116') { // PGRST116 is no rows
            return res.status(500).json({ error: error.message });
        }

        return res.status(200).json({ profile: data });
    }

    if (req.method === 'POST') {
        // Create or update profile. Store user email and full name from auth metadata when the table supports it.
        const { user_id, company_name, brand_name, brand_overview, unique_value_proposition, social_platforms, product_category } = req.body;

        if (!user_id || !company_name || !brand_name || !brand_overview || !unique_value_proposition || !social_platforms || !product_category) {
            return res.status(400).json({ error: 'All fields required' });
        }

        const { data: userData, error: userError } = await supabase.auth.admin.getUserById(user_id);
        if (userError) {
            return res.status(500).json({ error: userError.message });
        }

        const user = userData?.user ?? userData;
        const email = user?.email || '';
        const full_name = user?.user_metadata?.full_name || '';

        const profilePayload = {
            user_id,
            company_name,
            brand_name,
            brand_overview,
            unique_value_proposition,
            social_platforms,
            product_category,
            email,
            full_name,
            updated_at: new Date().toISOString()
        };

        let upsertResult = await supabase
            .from('profiles')
            .upsert(profilePayload, { onConflict: 'user_id' })
            .select()
            .single();

        if (upsertResult.error) {
            const missingField = /Could not find the '(.+?)' column/.exec(upsertResult.error.message)?.[1];
            if (missingField === 'email' || missingField === 'full_name') {
                const fallbackPayload = {
                    user_id,
                    company_name,
                    brand_name,
                    brand_overview,
                    unique_value_proposition,
                    social_platforms,
                    product_category,
                    updated_at: new Date().toISOString()
                };

                const fallbackResult = await supabase
                    .from('profiles')
                    .upsert(fallbackPayload, { onConflict: 'user_id' })
                    .select()
                    .single();

                if (fallbackResult.error) {
                    return res.status(500).json({ error: fallbackResult.error.message });
                }

                return res.status(200).json({
                    profile: fallbackResult.data,
                    warning: 'The profile table does not yet contain email/full_name columns. Profile saved without those fields.'
                });
            }

            return res.status(500).json({ error: upsertResult.error.message });
        }

        return res.status(200).json({ profile: upsertResult.data });
    }

    return res.status(405).json({ error: 'Method not allowed' });
}