'use client';

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from 'zod';
import { createTicket } from "@/lib/actions";


//Validation
const ticketSchema = z.object({
    title: z.string().min(5, "Title must be atleast 5 characters"),
    description: z.string().min(10, "Please provide more details"),
    priority: z.enum(["LOW", "MEDIUM", "HIGH", "URGENT"]),
});

type TicketFormValues = z.infer<typeof ticketSchema>;


export default function TicketForm(){
    const { register, handleSubmit, formState: { errors, isSubmitting } } = useForm<TicketFormValues>({
        resolver: zodResolver(ticketSchema),
        defaultValues: {priority: "MEDIUM"}
    });

    const onSubmit = async (data: TicketFormValues) => {
        try{
            await createTicket(data);
            alert("Ticket created successfully!");
        } catch (error) {
            alert("Something went wrong")
        }
    };

    return(
        <form onSubmit={handleSubmit(onSubmit)} className="space-y-6 bg-white p-6 rounded-lg shadow-md border border-slate-200">
            <div>
                <label className="block text-sm font-medium text-slate-700">Issue Title</label>
                <input 
                    {...register("title")}
                    className="mt-1 block w-full rounded-md border border-slate-300 p-2 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-black"
                    placeholder="e.g., Cannot login to dashboard"
                />
                {errors.title && <p className="text-red-500 txt-xs mt-1">{errors.title.message}</p>}
            </div>
            <div>
                <label className="block text-sm font-medium text-slate-700">Priority</label>
                <select
                {...register("priority")}
                className="mt-1 block w-full rounded-md border border-slate-300 p-2 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-black"
                >
                    <option value="LOW">Low</option>
                    <option value="MEDIUM">Medium</option>
                    <option value="HIGH">High</option>
                    <option value="URGENT">Urgent</option>
                </select>
            </div>
            <div>
                <label className="block text-sm font-medium text-slate-700">Description</label>
                <textarea 
                    {...register("description")}
                    rows={4}
                    className="mt-1 block w-full rounded-md border border-slate-300 p-2 shadow-sm focus:border-blue-500 focus:ring-blue-500 text-black"
                />
                {errors.description && <p className="text-red-500 text-xs mt-1">{errors.description.message}</p>}
            </div>
            <button
                type="submit"
                disabled={isSubmitting}
                className="w-full bg-blue-950 text-white py-2 px-4 rounded-md hover:bg-blue-700 disabled:bg-blue-300 transition-colors"
            >
                {isSubmitting ? "Creating..." : "Submit Ticket"}
            </button>
        </form>
    );
}