import { NextResponse } from "next/server";
import { Agent, AgentStatus } from "@/app/models/agent";
import { faker } from "@faker-js/faker"

function randChoice<T>(arr: T[]) {
  return arr[Math.floor(Math.random() * arr.length)];
}

export async function GET(request: Request) {
  const statuses = [AgentStatus.Available, AgentStatus.Call, AgentStatus.Unavailable];

  let agents: Agent[] = []
  const nbAgents = Math.floor(Math.random() * 15) + 1

  const makeAgent = () => {
    const status = randChoice(statuses);
    const minutesAgo = Math.floor(Math.random() * 3) + 1; // 1-3 minutes
    const extraMs = Math.floor(Math.random() * 60_000); // up to 59s extra
    const startDate = new Date(Date.now() - minutesAgo * 60_000 - extraMs);
    const firstName = faker.person.firstName();
    const lastName = faker.person.lastName();
    const pfpLink = faker.image.personPortrait({size: 64});
    return new Agent(firstName, lastName, status, startDate, pfpLink);
  };

  for (let i = 0; i < nbAgents; i++)
  {
    agents.push(makeAgent())
  }

  return NextResponse.json(agents.map(a => (typeof (a as any).toJSON === "function" ? (a as any).toJSON() : a)));
}