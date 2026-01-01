"use client";
import { useEffect } from "react";
import Link from "next/link";
import "./Components.css"

type NavBarProps = {
  setAgents?: (a: any[] | null) => void;
  setCalls?: (a: any[] | null) => void;
  setAlerts?: (a: any[] | null) => void;
};

export default function NavBar({ setAgents, setCalls, setAlerts }: NavBarProps) {

  useEffect(() => {
    refresh()
  }, [])

  const refresh = async () => { 
    try {
      const resAgent = await fetch("/api/getAgents");
      const agents = resAgent.ok ? await resAgent.json() : null;
      setAgents?.(agents);

      const resCall = await fetch("/api/getCalls");
      const calls = resCall.ok ? await resCall.json() : null;
      setCalls?.(calls);

      const resAlerts = await fetch("/api/getAlerts");
      const alerts = resAlerts.ok ? await resAlerts.json() : null;
      setAlerts?.(alerts);
    } catch (err) {
      console.error(err);
      setAgents?.(null);
      setCalls?.(null);
      setAlerts?.(null);
    }
  }

  return (
    <div className="bar CardLook">
        <img className="logo" src="../paxyl.png"/>
        <div className="buttonGroup">
          <Link className="navButton" href="/dashboard/homepage"><img className="icon" src="../house-solid-full.svg"/></Link>
          <Link className="navButton" href="/dashboard/agents"><img className="icon" src="../headset-solid-full.svg"/></Link>
          <Link className="navButton" href="/dashboard/calls"><img className="icon" src="../phone-solid-full.svg"/></Link>
        </div>
        <button className="navButton" onClick={refresh}><img className="icon" src="../arrow-rotate-right-solid-full.svg"/></button>
    </div>
  );
}