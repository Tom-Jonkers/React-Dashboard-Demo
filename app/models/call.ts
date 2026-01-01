export enum Channel {
  Voice = "voice",
  Email = "email",
  Chat = "chat",
}

export enum Priority {
  Low = "low",
  Medium = "medium",
  High = "high",
  Critical = "critical",
}

export interface CallData {
  number: string;
  channel: Channel;
  startDate: Date;
  priority: Priority;
  isPending: boolean;
}

export class Call {
  number: string;
  channel: Channel;
  startDate: Date;
  priority: Priority;
  isPending: boolean;

  constructor(
    number: string,
    channel: Channel,
    startDate: Date,
    priority: Priority = Priority.Medium,
    isPending: boolean = true
  ) {
    if (!number) throw new Error("Call number is required");
    this.number = number;
    this.channel = channel;
    this.startDate = new Date(startDate);
    this.priority = priority;
    this.isPending = isPending;
  }

  getFancyFrChannel() {
    if (this.channel == Channel.Chat)
        return "Chat"
    else if (this.channel == Channel.Email)
        return "Email"
    else
        return "Voix"
  }

  getFancyFrPriority() {
    if (this.priority == Priority.Critical)
        return "🔴 Prioritaire"
    else if (this.priority == Priority.High)
        return "🟡 Haute"
    else if (this.priority == Priority.Medium)
        return "🟢 Normale"
    else
        return "🔵 Basse"
  }

  setPriority(priority: Priority) {
    this.priority = priority;
  }

  formattedWaitTime(): string {
    const diffMs = Date.now() - this.startDate.getTime();
    const totalSec = Math.max(0, Math.floor(diffMs / 1000));
    const hh = Math.floor(totalSec / 3600);
    const mm = Math.floor((totalSec % 3600) / 60)
      .toString()
      .padStart(1, "0");
    const ss = (totalSec % 60).toString().padStart(2, "0");
    return hh > 0 ? `${hh}:${mm}:${ss}` : `${mm}:${ss}`;
  }

  toJSON(): CallData {
    return {
      number: this.number,
      channel: this.channel,
      startDate: this.startDate,
      priority: this.priority,
      isPending: this.isPending
    };
  }

  static from(data: CallData) {
    return new Call(data.number, data.channel, data.startDate, data.priority);
  }
}