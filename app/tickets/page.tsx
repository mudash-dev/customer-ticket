import { db } from "@/lib/db";
import Link from "next/link";
import { Key, ReactElement, JSXElementConstructor, ReactNode, ReactPortal } from "react";
import { PriorityBadge } from "@/components/ui/PriorityBadge";

 
export default async function TicketsPage(){

    const tickets = await db.ticket.findMany({
        orderBy: { createdAt: 'desc' }
    });

    return (
        <div className="ma-w-4xl mx-auto p-8">
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-slate-900">Support Tickets</h1>
                <Link
                href="/tickets/new"
                className="bg-blue-600 text-white px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                >
                + New Ticket
                </Link>
            </div>

            <div className="grid gap-4">
        {tickets.length === 0 && <p className="text-slate-500">No tickets found.</p>}
        
        {tickets.map((ticket: { id: Key | null | undefined; title: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined; description: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | ReactPortal | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined; priority: string | number | bigint | boolean | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | Promise<string | number | bigint | boolean | ReactPortal | ReactElement<unknown, string | JSXElementConstructor<any>> | Iterable<ReactNode> | null | undefined> | null | undefined; createdAt: string | number | Date; }) => (
          <div key={ticket.id} className="p-5 bg-white border border-slate-200 rounded-xl shadow-sm hover:shadow-md transition">
            <div className="flex justify-between items-start">
              <div>
                <h2 className="text-xl font-semibold text-slate-800">{ticket.title}</h2>
                <p className="text-slate-600 mt-1 line-clamp-2">{ticket.description}</p>
              </div>
              {/* This is a small Tailwind badge */}
              <PriorityBadge priority="{ticket.Priority}" />

            </div>
            <div className="mt-4 text-xs text-slate-400">
              Created on {new Date(ticket.createdAt).toLocaleDateString()}
            </div>
          </div>
        ))}
      </div>
        </div>
    );
}