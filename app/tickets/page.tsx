import { db } from "@/lib/db";
import Link from "next/link";
import { auth, currentUser } from "@clerk/nextjs/server";
import { PriorityBadge } from "@/components/tickets/PriorityBadge";

 
export default async function TicketsPage(){

  const { userId } = await auth();
  if (!userId) {
  throw new Error("Unauthorized");
}

  const user = await currentUser();

  //Define the role here from CLerks metadata
  const role = user?.publicMetadata.role as string || "USER";

    let tickets;

    if (role === "ADMIN"){
      tickets = await db.ticket.findMany({
        orderBy: { createdAt: 'desc' }
    });
    } else if (role === "AGENT") {
      tickets = await db.ticket.findMany({
        where: { agentId: userId},
        orderBy: { createdAt: 'desc'}
      });
    } else { // USER - customer
      tickets = await db.ticket.findMany({
        where: { customerId: userId },
        orderBy: { createdAt: 'desc'}
      });
    }

    return (
    <div className="max-w-4xl mx-auto p-6 relative min-h-[80vh] ">
      <h1 className="text-2xl text-center font-bold mb-4">
        👋 WELCOME TO THE {role} DASHBOARD</h1>

      <h3 className="text-xl font-black text-slate-900 dark:text-slate-200 mb-8">
        🎫 Backlog : {tickets.length} tickets 
      </h3>
      
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
        className="fixed bottom-10 right-10 w-16 h-16 bg-purple-400 text-white rounded-full flex items-center justify-center shadow-2xl hover:bg-blue-700 hover:scale-110 transition-all active:scale-95 z-50 group"
        title="Create New Ticket"
      >
        <span className="text-3xl font-light group-hover:rotate-90 transition-transform duration-300">
          +
        </span>
      </Link>
    </div>
  );
}