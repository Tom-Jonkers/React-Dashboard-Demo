"use client";
import "./homepage.css"
import NavBar from "../../components/NavBar"
import KPIs from "../../components/KPIs"
import AgentList from "../../components/AgentList"
import Alerts from "../../components/Alerts"
import CallList from "../../components/CallList"
import ChannelDist from "../../components/ChannelDist"
import { useState } from "react"
import { useDashboard } from "../DashboardContext";

export default function Homepage() {

    const { agents, setAgents, calls, setCalls, alerts, setAlerts } = useDashboard();

    return (
        <>
            <AgentList agents={agents}/>
            <CallList calls={calls}/>
            <Alerts alerts={alerts}/>
            <ChannelDist calls={calls}/>
        </>
    )
}