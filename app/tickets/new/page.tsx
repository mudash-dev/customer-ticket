import TicketForm from "@/components/tickets/TicketForm";

export default function NewTicketPage(){
    return (
        <div className="max-w-2xl mx-auto py-10 px-4">
            <h1 className="text-2xl font-bold mb-6">
                Open a New Support Ticket
            </h1>
            <TicketForm/>
        </div>
    );
}