"use client";
import "./Components.css"
import { Agent, AgentStatus } from "../models/agent"
import React, { useEffect, useMemo, useState } from "react";

export default function AgentList({ agents: remoteAgents }: { agents?: any[] | null }) {


    const agents = useMemo(() => {

        const statusRank: Record<AgentStatus, number> = {
                    [AgentStatus.Available]: 0,
                    [AgentStatus.Call]: 1,
                    [AgentStatus.Unavailable]: 2,
                  };

      const mapped: Agent[] = (!remoteAgents || remoteAgents.length === 0)
                  ? []
                  : remoteAgents.map(a => (typeof (a as any).toJSON === "function" ? (a as Agent) : Agent.from(a)));

      return mapped.slice().sort((a, b) => statusRank[a.status] - statusRank[b.status])
    }, [remoteAgents]);

    // tick state to trigger a re-render every second
      const [, setTick] = useState(0);
      useEffect(() => {
        const id = setInterval(() => setTick(t => t + 1), 1000);
        return () => clearInterval(id);
      }, []);

  return (
    <div className="CardLook mediumContainer">
        <p className="b">Liste des agents</p>
        <div className="TabRow">
            <div className="TabElt">
                <p className="b">Agent</p>
            </div>
            <div className="TabElt">
                <p className="b">Statut</p>
            </div>
            <div className="TabElt">
                <p className="b">Depuis</p>
            </div>
        </div>
        <div className={(agents.length > 4) ? "ScrollZone width100" : "width100"}>
        <div className="Divider"></div>
        {agents.map((item, index) => (
                <React.Fragment key={index}>
                <div className="TabRow">
                    <div className="TabElt"><p>{item.firstName}</p></div>
                    <div className="TabElt"><p>{item.getFancyFrStatus()}</p></div>
                    <div className="TabElt"><p>{item.formattedSinceTime()}</p></div>
                </div>
                {index < agents.length - 1 && <div className="LightDivider"></div>}
            </React.Fragment>
        ))}
        </div>
    </div>
  );
}