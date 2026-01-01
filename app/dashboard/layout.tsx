"use client";
import "./DashboardPage.css"
import NavBar from "../components/NavBar"
import KPIs from "../components/KPIs"
import { useState } from "react"
import { DashboardContext } from "./DashboardContext";



export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  let [agents, setAgents] = useState<any[] | null>(null);
  let [calls, setCalls] = useState<any[] | null>(null);
  let [alerts, setAlerts] = useState<any[] | null>(null);

  return (
    <DashboardContext.Provider value={{ agents, setAgents, calls, setCalls, alerts, setAlerts }}>
        <div className="MOREeverything">
        <div className="everything">
            <NavBar setAgents={setAgents} setCalls={setCalls} setAlerts={setAlerts}/>
            <div className="mainContainer">
            <KPIs agents={agents} calls={calls}/>
            {children}
            </div>
        </div>
        </div>
    </DashboardContext.Provider>
  )
}