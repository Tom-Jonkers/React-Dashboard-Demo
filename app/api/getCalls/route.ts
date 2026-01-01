import { Call, Channel, Priority } from "@/app/models/call";
import { NextResponse } from "next/server";

function randInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}
function randChoice<T>(arr: T[]) {
  return arr[Math.floor(Math.random() * arr.length)];
}
function makeCall() {
  const number = `#${randInt(0, 9999).toString().padStart(4, "0")}`;
  const channel = randChoice(Object.values(Channel) as Channel[]);
  const priority = randChoice(Object.values(Priority) as Priority[]);
  const minutesAgo = randInt(1, 3);
  const extraMs = randInt(0, 59_999);
  const startDate = new Date(Date.now() - minutesAgo * 60_000 - extraMs);
  return new Call(number, channel, startDate, priority);
}

export async function GET(request: Request) {
  const calls = Array.from({ length: randInt(1,10) }, () => makeCall());
  return NextResponse.json(calls.map(c => (typeof (c as any).toJSON === "function" ? (c as any).toJSON() : c)));
}