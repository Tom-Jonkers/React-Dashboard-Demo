import { useEffect, useState } from "react";
import { Agent, AgentStatus } from "../models/agent";
import { Call } from "../models/call";
import "./Components.css"

type KPIProps = {
  agents?: Agent[] | null;
  calls?: Call[] | null;
};

export default function KPIs({agents, calls}: KPIProps) {

  let amountOfAgents = 0;
  let availableAgents = 0;
  let waitingCalls = 0;
  const [avgWaitTime, setAvgWaitTime] = useState<number>(0);

  if (agents != null)
  {
    amountOfAgents = agents.length
    availableAgents = agents.filter(agent => agent.status === AgentStatus.Available).length
  }

  if (calls != null)
  {
    waitingCalls = calls.filter(call => call.isPending === true).length
  }

  useEffect(() => {
    // update immediately and then every second
    setAvgWaitTime(getAvgWait());
    const id = setInterval(() => {
      setAvgWaitTime(getAvgWait());
    }, 1000);
    return () => clearInterval(id);
    // rerun when calls changes
  }, [calls]);

  return (
    <div className="CardLook KPIs">
      <div className="KPIelt">
        <p className="KPIval">
          {amountOfAgents}
        </p>
        <p>Agents</p>
      </div>
      <p className="l">|</p>
      <div className="KPIelt">
        <p className="KPIval">
          {availableAgents}
        </p>
        <p>Disponibles</p>
      </div>
      <p className="l">|</p>
      <div className="KPIelt">
        <p className="KPIval">
          {waitingCalls}
        </p>
        <p>Appels en attente</p>
      </div>
      <p className="l">|</p>
      <div className="KPIelt">
        <p className="KPIval">
          {formattedSinceTime(avgWaitTime)}
        </p>
        <p>Attente moyenne</p>
      </div>
      
    </div>
  );

  function formattedSinceTime(timeInSeconds : number): string {
    const sec = Math.max(0, Math.floor(timeInSeconds));
    const hh = Math.floor(sec / 3600);
    const mm = Math.floor((sec % 3600) / 60)
      .toString()
      .padStart(1, "0");
    const ss = (sec % 60).toString().padStart(2, "0");
    return hh > 0 ? `${hh}h${mm}m${ss}s` : `${mm}m${ss}s`;
  }
  
  function getAvgWait (): number {
    let totalSec = 0;
    if (calls != null && calls.length > 0)
    {
      for (let i of calls)
      {
        const sd = (i as any).startDate;
        if (sd == null) continue;

        let startMs: number;
        if (sd instanceof Date) {
          startMs = sd.getTime();
        } else if (typeof sd === "number") {
          startMs = sd;
        } else {
          startMs = Date.parse(String(sd));
        }

        if (isNaN(startMs)) continue;

        totalSec += (Date.now() - startMs) / 1000;
      }

      return totalSec / calls.length
    }

    return 0
  }
}