"use client";
import React from "react";

export type DashboardState = {
    agents: any[] | null;
    setAgents: React.Dispatch<React.SetStateAction<any[] | null>>;
    calls: any[] | null;
    setCalls: React.Dispatch<React.SetStateAction<any[] | null>>;
    alerts: any[] | null;
    setAlerts: React.Dispatch<React.SetStateAction<any[] | null>>;
};

export const DashboardContext = React.createContext<DashboardState | null>(null);

export function useDashboard() {
    const ctx = React.useContext(DashboardContext);
    if (!ctx) throw new Error("useDashboard must be used within DashboardContext provider");
    return ctx;
}