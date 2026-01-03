"use client";
import CallListDetailed from "@/app/components/CallListDetailed";
import { useDashboard } from "../DashboardContext";

export default function CallsPage() {

  const { calls } = useDashboard()

  return (
    <CallListDetailed calls={calls}/>
  );
}