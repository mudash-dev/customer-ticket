'use client';

import { assignAgent } from "@/lib/actions";
import { useState } from "react";

interface Agent {
    id: string;
    name: string | null;
}

export function AssignAgentSelect({
    ticketId, agents, currentAgentId
}: {
    ticketId: string,
    agents: Agent[],
    currentAgentId: string | null
}) {
    const [isAssigning, setIsAssigning] = useState(false);

    const handleAssign = async (val: string) => {
        setIsAssigning(true);
       
        await assignAgent(ticketId, val); 
        setIsAssigning(false);
    };

    return (
      <div className="flex flex-col gap-2 my-4">
        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">
            Assign Agent
        </label>
        <select
            disabled={isAssigning}
            value={currentAgentId || ""}
            onChange={(e) => handleAssign(e.target.value)}
            className="block w-full p-3 text-sm border border-slate-200 rounded-xl bg-white text-slate-900 focus:ring-2 focus:ring-blue-500 transition-all cursor-pointer disabled:opacity-50"
        >
            <option value="">Unassigned</option>
            {agents.map((agent) => (
                <option key={agent.id} value={agent.id}>
                    {agent.name || "Unknown Agent"}
                </option>
            ))}
        </select>
        {isAssigning && <span className="text-[10px] text-blue-500 animate-pulse">Updating...</span>}
      </div>  
    );
}