import { db } from "./db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { email } from "zod";

export async function createTicket(
  formData : { title: string; description: string; priority: any })  
{
    try{
        //hardcoded a customerId
        const mockUser = await.db.user.upsert({
            where: { email: 'test@example.com' },
            update: {},
            create: {
                email: 'test@example.com',
                name: 'Test User',
                role: 'USER',
            },
        });
        await db.ticket.create({
            data: {
                title: formData.title,
                description: formData.description,
                priority: formData.priority,
                customerId: mockUser.id
            },
        });

        revalidatePath('/tickets'); // clear cache and updates data in the background
    } catch (error){
        console.error("Database Erroe:", error);
        throw new Error("Failed tp create ticket");
    }

    // navigate back to list by handling post-submission flow
    redirect('/tickets');
     
};