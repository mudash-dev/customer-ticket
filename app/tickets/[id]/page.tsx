import { db } from "@/lib/db";
import { notFound } from "next/navigation";
import { StatusSelect } from "@/components/tickets/StatusSelect";
import { DeleteButton } from "@/components/tickets/DeleteButton";
import { PriorityBadge } from "@/components/tickets/PriorityBadge";
import Link from "next/link";


export default async function TicketDetailsPage({ params }: { params: Promise<{ id: string }> }){


    const { id } = await params;

    const ticket = await db.ticket.findUnique({
        where: { id: id}
    });

    if (!ticket) notFound();

   return (
    <main className="max-w-3xl mx-auto p-10">
      {/* Back Button to Dashboard */}
      <Link href="/tickets" className="text-sm text-slate-500 hover:text-blue-600 flex items-center gap-2 mb-8">
        ← Back to Dashboard
      </Link>

      <div className="bg-white border border-slate-200 rounded-3xl p-8 shadow-sm">
        <header className="flex justify-between items-start mb-6">
          <div>
             <span className="text-[10px] font-mono text-slate-400 uppercase tracking-widest">Ticket ID: {ticket.id}</span>
             <h1 className="text-4xl font-black text-slate-900 mt-2 leading-tight">{ticket.title}</h1>

          </div>
          <div>
            <PriorityBadge priority={ticket.Priority} />
            </div>
          {/*Delete Btn*/}
            <DeleteButton id={ticket.id}/>
        
        </header>

        <div className="prose prose-slate max-w-none">
          <p className="text-slate-700 text-lg leading-relaxed whitespace-pre-wrap">
            {ticket.description}
          </p>
        </div>

        <footer className="mt-12 pt-6 border-t border-slate-100 flex justify-between items-center text-xs text-slate-400">
           <p>Opened on {new Date(ticket.createdAt).toLocaleString()}</p>
           <div className="font-extrabold">Status: <span></span>
             {/*Ticket Status*/}
             <StatusSelect id={ticket.id} currentStatus={ticket.Status}/>
            {/*<span className="text-blue-600 font-bold">{ticket.Status}</span>*/}
            </div>
        </footer>
      </div>
    </main>
  );
}