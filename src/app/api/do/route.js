import { connectToDatabase } from "@/lib/dbConfig/dbConfig";
import { NextResponse } from "next/server";

export async function GET() {
  const con = await connectToDatabase();
  console.log("hit db connect", new Date().getSeconds());
  return new NextResponse("connected a");

  //   return NextResponse.json({ messsage: "Hello World" });
}