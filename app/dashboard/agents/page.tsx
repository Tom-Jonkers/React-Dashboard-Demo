"use client";
import AgentListDetailed from "@/app/components/AgentListDetailed";
import { useDashboard } from "../DashboardContext";

export default function AgentsPage() {

  const { agents } = useDashboard()

  return (
    <AgentListDetailed agents={agents}/>
  );
}

