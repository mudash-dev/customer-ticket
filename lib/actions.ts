'use server';

import { db } from "./db";
import { Status } from "@prisma/client"; 
import { auth } from "@clerk/nextjs/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";

export async function createTicket(
  formData : any)  {
  const { userId } = await auth(); // get the Clerk Id

  if (!userId) throw new Error("Unauthorized");

  await db.ticket.create({
    data: {
        title: formData.title,
        description: formData.description,
        Priority: formData.priority,
        customerId: userId,
    },
  });

    /*try{

        //hardcoded a customerId
       /* const mockUser = await db.user.upsert({
            where: { email: 'test@example.com' },
            update: {},
            create: {
                email: 'test@example.com',
                name: 'Test User',
                role: 'USER',
            },
        });
        const newTicket = await db.ticket.create({
            data: {
                title: formData.title,
                description: formData.description,
                Priority: formData.priority,
                customerId: mockUser.id
            },
        });

        console.log("Ticket created successfully", newTicket.id);

    } catch (error){
        console.error("FULL DATABASE ERROR:", error);
        throw error;
    }*/

    revalidatePath('/tickets'); // clear cache and updates data in the background

    // navigate back to list by handling post-submission flow
    redirect('/tickets');
     
}

export async function deleteTicket(id: string){
    try{
        await db.ticket.delete({
            where: { id },
        });

        revalidatePath('/tickets');
    } catch (error) {
        console.error("Delete error", error);
        throw new Error("Failed to delete ticket");
    }

    redirect('/tickets');
}

export async function updateTicketStatus(id: string, ticketStatus: Status) {
    try{
        if (!id || !ticketStatus) {
            throw new Error("Missing ID or Status!")
        }
        await db.ticket.update({
            where: { id: id},
            data: { Status: ticketStatus }
        });

        // remember to clear cache both in ticket details and ticketlst 
        revalidatePath(`/tickets/${id}`);
        revalidatePath('/tickets');
    } catch(error) {
        console.error("Update Status Error:", error);
        throw new Error("Failed to update status")

    }

    
}