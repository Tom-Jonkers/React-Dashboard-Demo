"use client";
import AgentListDetailed from "@/app/components/AgentListDetailed";
import { useDashboard } from "../DashboardContext";

export default function AgentsPage() {

  const { agents, setAgents, calls, setCalls, alerts, setAlerts } = useDashboard()

  return (
    <AgentListDetailed agents={agents}/>
  );
}

