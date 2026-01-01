import Image from "next/image";
import Homepage from "./dashboard/homepage/page";
import { redirect } from "next/navigation";

export default function Home() {

  redirect("/dashboard/homepage");
  
  return (
    <div style={{ minHeight: "100vh" }}>
      <Homepage />
    </div>
  );
}
