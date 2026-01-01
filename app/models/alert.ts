export interface AlertData {
  emoji: string;
  message: string;
}

export class Alert {
  emoji: string;
  message: string;

  constructor(emoji: string, message: string) {
    if (!message) throw new Error("Alert message is required");
    this.emoji = emoji;
    this.message = message;
  }
  formatted(): string {
    return `${this.emoji} ${this.message}`;
  }

  toJSON(): AlertData {
    return { emoji: this.emoji, message: this.message };
  }

  static from(data: AlertData) {
    return new Alert(data.emoji ?? "", data.message);
  }
}

export default Alert;