export enum AgentStatus {
  Available = "available",
  Unavailable = "unavailable",
  Call = "call",
}

export interface AgentData {
  firstName: string;
  lastName: string;
  status: AgentStatus;
  lastStatusChange: Date;
  pfpLink: string;
}

export class Agent {
  firstName: string;
  lastName: string;
  status: AgentStatus;
  lastStatusChange: Date;
  pfpLink: string;

  constructor(firstName: string, lastName: string, status: AgentStatus = AgentStatus.Unavailable, lastStatusChange : Date, pfpLink: string) {
    if (!firstName) throw new Error("Agent name is required");
    this.firstName = firstName;
    this.lastName = lastName;
    this.status = status;
    this.lastStatusChange = new Date(lastStatusChange);
    this.pfpLink = pfpLink;
  }

  formattedSinceTime(): string {
    const diffMs = Date.now() - this.lastStatusChange.getTime();
    const totalSec = Math.max(0, Math.floor(diffMs / 1000));
    const hh = Math.floor(totalSec / 3600);
    let mm = Math.floor((totalSec % 3600) / 60).toString()
    if (Number.parseInt(mm) < 10 && hh > 0)
    {
      mm = "0" + mm
    }
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
    return { firstName: this.firstName, lastName: this.lastName, status: this.status, lastStatusChange: this.lastStatusChange, pfpLink: this.pfpLink};
  }

  static from(data: AgentData) {
    return new Agent(data.firstName, data.lastName, data.status, data.lastStatusChange, data.pfpLink);
  }
}