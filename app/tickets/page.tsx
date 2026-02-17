import { db } from "@/lib/db";
import Link from "next/link";
import { Key, ReactElement, JSXElementConstructor, ReactNode, ReactPortal } from "react";
import { PriorityBadge } from "@/components/tickets/PriorityBadge";

 
export default async function TicketsPage(){

    const tickets = await db.ticket.findMany({
        orderBy: { createdAt: 'desc' }
    });

    return (
    <div className="space-y-4">
      {tickets.map((ticket) => (

        <Link key={ticket.id} href={`/tickets/${ticket.id}`} className="group block">
          <div className="flex items-center justify-between p-5 bg-white border border-slate-200 rounded-2xl group-hover:border-blue-500 transition-all shadow-sm">
            <div>
              <h3 className="text-lg font-bold text-slate-800">{ticket.title}</h3>
              <p className="text-sm text-slate-500">Created {new Date(ticket.createdAt).toLocaleDateString()}</p>
            </div>
            
            <div className="flex items-center gap-4">
              <PriorityBadge priority={ticket.Priority} />
              <span className="text-slate-300 group-hover:text-blue-500 transition-colors">→</span>
            </div>
          </div>
        </Link>
      ))}
    </div>
  );
}