import { createClientFromRequest } from 'npm:@base44/sdk@0.8.6';
import nodemailer from 'npm:nodemailer@6.9.8';

Deno.serve(async (req) => {
    try {
        const base44 = createClientFromRequest(req);
        
        // Authenticate user
        const user = await base44.auth.me();
        if (!user) {
            return Response.json({ error: 'Unauthorized' }, { status: 401 });
        }

        // Parse request payload
        const { to, subject, body, from_name } = await req.json();

        if (!to || !subject || !body) {
            return Response.json({ 
                error: 'Missing required fields: to, subject, body' 
            }, { status: 400 });
        }

        // Get SMTP credentials from environment
        const senderEmail = Deno.env.get("SMTP_SENDER_EMAIL");
        const appPassword = Deno.env.get("SMTP-google-app");

        if (!senderEmail || !appPassword) {
            return Response.json({ 
                error: 'SMTP credentials not configured' 
            }, { status: 500 });
        }

        // Create transporter using Google SMTP
        const transporter = nodemailer.createTransport({
            host: 'smtp.gmail.com',
            port: 587,
            secure: false, // true for 465, false for other ports
            auth: {
                user: senderEmail,
                pass: appPassword,
            },
        });

        // Send email
        const info = await transporter.sendMail({
            from: from_name ? `"${from_name}" <${senderEmail}>` : senderEmail,
            to: to,
            subject: subject,
            text: body,
        });

        return Response.json({ 
            success: true,
            messageId: info.messageId 
        });

    } catch (error) {
        console.error('Email send error:', error);
        return Response.json({ 
            error: error.message 
        }, { status: 500 });
    }
});