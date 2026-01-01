"use client";
import React, { useEffect, useMemo, useState } from "react";
import { Call, Channel, Priority } from "../models/call";
import "./Components.css"

export default function CallList({ calls: remoteCalls }: { calls?: any[] | null }) {


        const calls = useMemo(() => {
          const priorityRank: Record<Priority, number> = {
            [Priority.Critical]: 0,
            [Priority.High]: 1,
            [Priority.Medium]: 2,
            [Priority.Low]: 3,
          };

          const mapped: Call[] = (!remoteCalls || remoteCalls.length === 0)
            ? []
            : remoteCalls.map(a => (typeof (a as any).toJSON === "function" ? (a as Call) : Call.from(a)));

          return mapped.slice().sort((a, b) => priorityRank[a.priority] - priorityRank[b.priority]);
      }, [remoteCalls, []]);

  // tick state to trigger a re-render every second
  const [, setTick] = useState(0);
  useEffect(() => {
    const id = setInterval(() => setTick(t => t + 1), 1000);
    return () => clearInterval(id);
  }, []);
  
    return (
      <div className="CardLook mediumContainer">
        <p className="b">File d'attente des appels</p>
          <div className="TabRow">
              <div className="TabElt">
                  <p className="b">Appel</p>
              </div>
              <div className="TabElt">
                  <p className="b">Canal</p>
              </div>
              <div className="TabElt">
                  <p className="b">Attente</p>
              </div>
              <div className="TabElt">
                  <p className="b">Priorité</p>
              </div>
          </div>
          <div className={(calls.length > 4) ? "ScrollZone width100" : "width100"}>
          <div className="Divider"></div>
          {calls.map((item, index) => (
                  <React.Fragment key={index}>
                  <div className="TabRow">
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
}