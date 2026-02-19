"use client";

import { updateTicketStatus } from "@/lib/actions";
import { Status } from "@prisma/client";
import { useState } from "react";

export function StatusSelect({ id, currentStatus }: { id: string, currentStatus: Status }){
    const [isUpdating, setIsUpdating] = useState(false);

    const handleStatusChange = async (newStatus: string) => {
        setIsUpdating(true);
        await updateTicketStatus(id,newStatus as Status);
        setIsUpdating(false);
    };

    return (
    <div className="relative inline-block">
      <select
        disabled={isUpdating}
        value={currentStatus}
        onChange={(e) => handleStatusChange(e.target.value)}
      
        className={`appearance-none pl-3 pr-8 py-1 rounded-full text-xs font-bold border transition-all cursor-pointer disabled:opacity-50 
          ${currentStatus === 'CLOSED' ? 'bg-slate-100 border-slate-300 text-slate-600' : 'bg-green-50 border-green-200 text-green-700'}`}
      >
        
        {Object.values(Status).map((s) => (
          <option key={s} value={s}>
            {s.replace('_', ' ')}
          </option>
        ))}
      </select>
      
      {/* Custom Chevron Arrow */}
      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-current">
        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20">
          <path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z"/>
        </svg>
      </div>
    </div>
  );
}