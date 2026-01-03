"use client";
import "./Components.css"
import { Agent, AgentStatus } from "../models/agent"
import React, { useEffect, useState } from "react";

export default function AgentListDetailed({ agents: remoteAgents }: { agents?: any[] | null }) {

    const [sort, setSort] = useState("status")
    const [ascending, setAscending] = useState(true)
    const [agents, setAgents] = useState(remoteAgents != null ? remoteAgents.map(a => (typeof (a as any).toJSON === "function" ? (a as Agent) : Agent.from(a))) : [])

    const statusRank: Record<AgentStatus, number> = {
        [AgentStatus.Available]: 0,
        [AgentStatus.Call]: 1,
        [AgentStatus.Unavailable]: 2
    };

    // tick state to trigger a re-render every second
      const [, setTick] = useState(0);
      useEffect(() => {
        const id = setInterval(() => setTick(t => t + 1), 1000);
        return () => clearInterval(id);
      }, []);

      useEffect(() => {
      if (!sort) return;
      sortAgents(sort, ascending);
    }, [sort, ascending]);

  return (
    <div className="CardLook fullContainer">
        <p className="b">Liste des agents</p>
        <div className="TabRow bigg">
            <div className="TabPicFrame"/>
            <div className="TabElt">
                <p onClick={() => changeSort("firstName")} className="b TabPropText">Prénom</p>
                {(sort == "firstName") ? 
                    <img className="icon"
                     src={(ascending == true) ? "../chevron-up-solid-full.svg" : "../chevron-down-solid-full.svg"}/> 
                : <></>}
            </div>
            <div className="TabElt">
                <p onClick={() => changeSort("lastName")} className="b TabPropText">Nom</p>
                {(sort == "lastName") ? 
                    <img className="icon"
                     src={(ascending == true) ? "../chevron-up-solid-full.svg" : "../chevron-down-solid-full.svg"}/> 
                : <></>}
            </div>
            <div className="TabElt">
                <p onClick={() => changeSort("status")} className="b TabPropText">Statut</p>
                {(sort == "status") ? 
                    <img className="icon"
                     src={(ascending == true) ? "../chevron-up-solid-full.svg" : "../chevron-down-solid-full.svg"}/> 
                : <></>}
            </div>
            <div className="TabElt">
                <p onClick={() => changeSort("lastUpdate")} className="b TabPropText">Depuis</p>
                {(sort == "lastUpdate") ? 
                    <img className="icon"
                     src={(ascending == true) ? "../chevron-up-solid-full.svg" : "../chevron-down-solid-full.svg"}/> 
                : <></>}
            </div>
        </div>
        <div className={(agents.length > 4) ? "ScrollZone width100" : "width100"}>
        <div className="Divider"></div>
        {agents.map((item, index) => (
                <React.Fragment key={index}>
                <div className="TabRow bigg">
                    <div className="TabPicFrame"><img className="TabPic" src={item.pfpLink}/></div>
                    <div className="TabElt"><p>{item.firstName}</p></div>
                    <div className="TabElt"><p>{item.lastName}</p></div>
                    <div className="TabElt"><p>{item.getFancyFrStatus()}</p></div>
                    <div className="TabElt"><p>{item.formattedSinceTime()}</p></div>
                </div>
                {index < agents.length - 1 && <div className="LightDivider"></div>}
            </React.Fragment>
        ))}
        </div>
    </div>
  );

   function changeSort(type: string) {

    // Change sort order if user simply clicked on the sort option again
    if (sort == type)
        setAscending(!ascending)
    else
        setAscending(true)

    // Change sort type
    setSort(type)
  }

  function sortAgents(currentSort: string, currentAscending: boolean) {
    setAgents(prev => {
        if (!currentSort) return prev;
        let sorted = prev.slice();
        switch (currentSort) {
            case "firstName":
                sorted = sorted.sort((a,b) => a.firstName.localeCompare(b.firstName));
                break;
            case "lastName":
                sorted = sorted.sort((a,b) => a.lastName.localeCompare(b.lastName));
                break;
            case "status":
                sorted = sorted.slice().sort((a, b) => statusRank[a.status] - statusRank[b.status]);
                break;
            case "lastUpdate":
                sorted = sorted.slice().sort((a, b) => b.lastStatusChange.getTime() - a.lastStatusChange.getTime());
                break;
            default:
                return prev;
        }
        if (!currentAscending) sorted = sorted.reverse();
        return sorted;
    });
  }

  

}