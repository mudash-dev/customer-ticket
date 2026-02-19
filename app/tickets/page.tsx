import { db } from "@/lib/db";
import Link from "next/link";
import { Key, ReactElement, JSXElementConstructor, ReactNode, ReactPortal } from "react";
import { PriorityBadge } from "@/components/tickets/PriorityBadge";

 
export default async function TicketsPage(){

    const tickets = await db.ticket.findMany({
        orderBy: { createdAt: 'desc' }
    });

    return (
    <div className="max-w-4xl mx-auto p-6 relative min-h-[80vh]">
      <h1 className="text-3xl font-black text-slate-900 dark:text-slate-200 mb-8">Ticket Backlog</h1>
      <div className="space-y-4">
      {tickets.map((ticket) => (

        <Link key={ticket.id} href={`/tickets/${ticket.id}`} className="group block">
          <div className="flex items-center justify-between p-5 bg-amber-50 border border-slate-950 dark:border-slate-100 rounded-2xl group-hover:border-blue-500 transition-all shadow-sm">
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

      {/*New ticket FAB*/}
      <Link
        href={"/tickets/new"}
        className="fixed bottom-10 right-10 w-16 h-16 bg-orange-400 text-white rounded-full flex items-center justify-center shadow-2xl hover:bg-blue-700 hover:scale-110 transition-all active:scale-95 z-50 group"
        title="Create New Ticket"
      >
        <span className="text-3xl font-light group-hover:rotate-90 transition-transform duration-300">
          +
        </span>
      </Link>
    </div>
  );
}