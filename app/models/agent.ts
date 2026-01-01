export enum AgentStatus {
  Available = "available",
  Unavailable = "unavailable",
  Call = "call",
}

export interface AgentData {
  name: string;
  status: AgentStatus;
  lastStatusChange: Date;
}

export class Agent {
  name: string;
  status: AgentStatus;
  lastStatusChange: Date;

  constructor(name: string, status: AgentStatus = AgentStatus.Unavailable, lastStatusChange : Date) {
    if (!name) throw new Error("Agent name is required");
    this.name = name;
    this.status = status;
    this.lastStatusChange = new Date(lastStatusChange);
  }

  formattedSinceTime(): string {
    const diffMs = Date.now() - this.lastStatusChange.getTime();
    const totalSec = Math.max(0, Math.floor(diffMs / 1000));
    const hh = Math.floor(totalSec / 3600);
    const mm = Math.floor((totalSec % 3600) / 60)
      .toString()
      .padStart(1, "0");
    const ss = (totalSec % 60).toString().padStart(2, "0");
    return hh > 0 ? `${hh}:${mm}:${ss}` : `${mm}:${ss}`;
  }

  setStatus(status: AgentStatus) {
    this.status = status;
  }

  getFancyFrStatus() : String {
    if (this.status == "available")
      return "🟢 Disponible"
    else if (this.status == "call")
      return "🟡 En appel"
    else
      return "🔴 Non disponible"
  }

  toJSON(): AgentData {
    return { name: this.name, status: this.status, lastStatusChange: this.lastStatusChange};
  }

  static from(data: AgentData) {
    return new Agent(data.name, data.status, data.lastStatusChange);
  }
}