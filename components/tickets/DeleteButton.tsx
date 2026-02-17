"use client";

import { deleteTicket } from "@/lib/actions";
import { useState } from "react";

export function DeleteButton({ id }: { id: string }){

    const [isDeleting, setIsDeleting] = useState(false);

    const handleDelete = async () => {
        if (confirm("Are you sure you want to delete this ticket? This cannot be undone.")){
            setIsDeleting(true);
            await deleteTicket(id);
        }
    };

    return (
        <button
            onClick={handleDelete}
            disabled={isDeleting}
            className="text-sm font-medium text-red-600 hover:text-red-800 disabled:text-red-300 transition-colors"
        >
            {isDeleting ? "Deleting...": "Delete Ticket"}
        </button>
    );
}