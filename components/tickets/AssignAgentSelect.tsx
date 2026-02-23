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

    const handleAssign = async (agentId: string) => {
        setIsAssigning(true);
        await assignAgent(ticketId, agentId);
        setIsAssigning(false);
    };

    return (
      <div className="flex flex-col gap-2">
        <label className="text-xs font-bold text-slate-500 uppercase">
            Assign Agent
        </label>
        <select
            disabled={isAssigning}
            value={currentAgentId || ""}
            onChange={ (e) => handleAssign(e.target.value)}
            className="block w-full p-2 text-sm border-slate-200 rounded-lg bg-white focus:ring-2 focus:ring-blue-500 transition-all"
        >
            <option value="">Unassigned</option>
            {agents.map((agent) => (
                <option key={agent.id} value={agent.id}>
                    {agent.name || "Unknown Agent"}
                </option>
            ))}
        </select>
      </div>  
    );

}