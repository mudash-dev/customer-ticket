import { db } from "@/lib/db";
import { notFound } from "next/navigation";

export default async function TicketDetailsPage({ params }: { params: { id: string } }){

    const ticket = await db.ticket.findUnique({
        where: { id: params.id}
    });

    if (!ticket) notFound();

    return (
        <div className="max-w-2xl mx-auto p-10">
            <div className="mb-6">
                <span  className="text-blue-600 font-semibold text-sm">
                    Ticket ID: {ticket.id}
                </span>
                <h1 className="text-4xl font-bold text-slate-900 mt-2">
                    {ticket.title}
                </h1>
            </div>
            <div className="bg-white border border-slate-200 rounded-2xl p-6 shadow-sm">
                <p className="text-slate-700 whitespace-pre-wrap">{ticket.description}</p>
            </div>
            <div className="mt-8 pt-6 border-t border-slate-100 flex gap-4">
                <div className="px-3 py-1 bg-slate-100 rounded-full text-sm">Status: {ticket.Status}</div>
                <div className="px-3 py-1 bg-amber-50 text-amber-700 rounded-full text-sm font-medium">Priority: {ticket.priority}</div>
            </div>
        </div>
    );
}