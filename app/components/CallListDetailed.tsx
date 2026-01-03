"use client";
import "./Components.css"
import React, { useEffect, useState } from "react";
import { Call, Priority } from "../models/call";

export default function CallListDetailed({ calls: remoteCalls }: { calls?: any[] | null }) {

    const [sort, setSort] = useState("priority")
    const [ascending, setAscending] = useState(true)
    const [calls, setCalls] = useState(remoteCalls != null ? remoteCalls.map(a => (typeof (a as any).toJSON === "function" ? (a as Call) : Call.from(a))) : [])

    const priorityRank: Record<Priority, number> = {
        [Priority.Critical]: 0,
        [Priority.High]: 1,
        [Priority.Medium]: 2,
        [Priority.Low]: 3
    };

    // tick state to trigger a re-render every second
      const [, setTick] = useState(0);
      useEffect(() => {
        const id = setInterval(() => setTick(t => t + 1), 1000);
        return () => clearInterval(id);
      }, []);

      useEffect(() => {
              if (!remoteCalls || remoteCalls.length === 0) {
                setCalls([]);
                return;
              }
      
              const mapped: Call[] = remoteCalls.map(a => (typeof (a as any).toJSON === "function" ? (a as Call) : Call.from(a)));
              let sorted = mapped.slice();
      
              switch (sort) {
            case "number":
                sorted = sorted.sort((a,b) => a.number.localeCompare(b.number));
                break;
            case "channel":
                sorted = sorted.sort((a,b) => a.channel.localeCompare(b.channel));
                break;
            case "waitTime":
                sorted = sorted.slice().sort((a, b) => b.startDate.getTime() - a.startDate.getTime());
                break;
            case "priority":
                sorted = sorted.slice().sort((a, b) => priorityRank[a.priority] - priorityRank[b.priority]);
                break;
        }
        if (!ascending) sorted = sorted.reverse();
        setCalls(sorted);
      }, [remoteCalls, sort, ascending]);


  return (
    <div className="CardLook fullContainer">
        <p className="b">Liste des agents</p>
        <div className="TabRow bigg">
            <div className="TabElt">
                <p onClick={() => changeSort("number")} className="b TabPropText">Numéro</p>
                {(sort == "number") ? 
                    <img className="icon"
                     src={(ascending == true) ? "../chevron-up-solid-full.svg" : "../chevron-down-solid-full.svg"}/> 
                : <></>}
            </div>
            <div className="TabElt">
                <p onClick={() => changeSort("channel")} className="b TabPropText">Canal</p>
                {(sort == "channel") ? 
                    <img className="icon"
                     src={(ascending == true) ? "../chevron-up-solid-full.svg" : "../chevron-down-solid-full.svg"}/> 
                : <></>}
            </div>
            <div className="TabElt">
                <p onClick={() => changeSort("waitTime")} className="b TabPropText">Attente</p>
                {(sort == "waitTime") ? 
                    <img className="icon"
                     src={(ascending == true) ? "../chevron-up-solid-full.svg" : "../chevron-down-solid-full.svg"}/> 
                : <></>}
            </div>
            <div className="TabElt">
                <p onClick={() => changeSort("priority")} className="b TabPropText">Priorité</p>
                {(sort == "priority") ? 
                    <img className="icon"
                     src={(ascending == true) ? "../chevron-up-solid-full.svg" : "../chevron-down-solid-full.svg"}/> 
                : <></>}
            </div>
        </div>
        <div className={(calls.length > 5) ? "ScrollZone width100" : "width100"}>
        <div className="Divider"></div>
        {calls.map((item, index) => (
                <React.Fragment key={index}>
                <div className="TabRow bigg">
                    <div className="TabElt"><p>{item.number}</p></div>
                    <div className="TabElt"><p>{item.getFancyFrChannel()}</p></div>
                    <div className="TabElt"><p>{item.formattedWaitTime()}</p></div>
                    <div className="TabElt"><p>{item.getFancyFrPriority()}</p></div>
                </div>
                {index < calls.length - 1 && <div className="LightDivider"></div>}
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

  function sortCalls(currentSort: string, currentAscending: boolean) {
    setCalls(prev => {
        if (!currentSort) return prev;
        let sorted = prev.slice();
        switch (currentSort) {
            case "number":
                sorted = sorted.sort((a,b) => a.number.localeCompare(b.number));
                break;
            case "channel":
                sorted = sorted.sort((a,b) => a.channel.localeCompare(b.channel));
                break;
            case "waitTime":
                sorted = sorted.slice().sort((a, b) => b.startDate.getTime() - a.startDate.getTime());
                break;
            case "priority":
                sorted = sorted.slice().sort((a, b) => priorityRank[a.priority] - priorityRank[b.priority]);
                break;
            default:
                return prev;
        }
        if (!currentAscending) sorted = sorted.reverse();
        return sorted;
    });
  }

  

}