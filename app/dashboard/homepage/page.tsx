"use client";
import "./homepage.css"
import AgentList from "../../components/AgentList"
import Alerts from "../../components/Alerts"
import CallList from "../../components/CallList"
import ChannelDist from "../../components/ChannelDist"
import { useDashboard } from "../DashboardContext";

export default function Homepage() {

    const { agents, calls, alerts } = useDashboard();

    return (
        <>
            <AgentList agents={agents}/>
            <CallList calls={calls}/>
            <Alerts alerts={alerts}/>
            <ChannelDist calls={calls}/>
        </>
    )

}