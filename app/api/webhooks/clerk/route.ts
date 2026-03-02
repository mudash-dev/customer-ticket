import { Webhook } from "svix";
import { headers } from "next/headers";
import { WebhookEvent } from "@clerk/nextjs/server";
import { db } from "@/lib/db";

export async function POST(req: Request) {
    const WEBHOOK_SECRET = process.env.WEBHOOK_SECRET;

    if (!WEBHOOK_SECRET) {
        throw new Error('Please add WEBHOOK_SECRET from Clerk Dashboard to .env');
    }

    const headerPayload = await headers();
    const svix_id = headerPayload.get('svix-id');
    const svix_timestamp = headerPayload.get('svix-timestamp');
    const svix_signature = headerPayload.get('svix-signature');

  
    if (!svix_id || !svix_timestamp || !svix_signature) {
        return new Response('Error occurred -- no svix headers', { status: 400 });
    }

    const payload = await req.json();
    const body = JSON.stringify(payload);

    const hook = new Webhook(WEBHOOK_SECRET);
    let hookEvent: WebhookEvent;

    try {
        hookEvent = hook.verify(body, {
            'svix-id': svix_id,
            'svix-timestamp': svix_timestamp,
            'svix-signature': svix_signature,
        }) as WebhookEvent;
    } catch (err) {
        console.error('Error verifying webhook:', err);
        return new Response('Error occurred', { status: 400 });
    }

    const eventType = hookEvent.type;
    console.log(`Processing Webhook: ${eventType}`);

    if (eventType === 'user.created' || eventType === 'user.updated') {
        const { id, email_addresses, first_name, last_name, public_metadata } = hookEvent.data;
        
        // So get email only if it exists otherwise use a placeholder
        const email = email_addresses && email_addresses.length > 0
            ? email_addresses[0].email_address
            : `no-email-${id}@clerk.com`;   
            
        const name = `${first_name || ""} ${last_name || ""}`.trim();
        const role = (public_metadata?.role as any) || "USER";

        await db.user.upsert({
            where: { id: id },
            update: {
                email: email,
                name: name,
                role: role
            },
            create: {
                id: id,
                email: email,
                name: name,
                role: role
            },
        });
        console.log(`User ${id} synced to database.`);
    }

    return new Response('Webhook processed', { status: 200 });
}