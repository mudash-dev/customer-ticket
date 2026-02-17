import { Priority } from "@/lib/generated/prisma/enums";

interface Props {
  priority: Priority;
}


const priorityColors: Record<Priority, string> = {
      LOW: "bg-gray-200 text-gray-800",
      MEDIUM: "bg-blue-200 text-blue-800",
      HIGH: "bg-orange-200 text-orange-800",
      URGENT: "bg-red-200 text-red-800",
};

export function PriorityBadge({ priority }: Props) {
  return (
    <span
      className={`px-2 py-1 rounded-md text-xs font-semibold ${priorityColors[priority]}`}
    >
      {priority}
    </span>
  );
}