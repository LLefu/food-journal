import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  if(req.method === "POST"){
    const json = await req.json();

    const startOfWeek = new Date(json.start);
    startOfWeek.setHours(0);
    startOfWeek.setMinutes(0);
    startOfWeek.setSeconds(0);
    const endOfWeek = new Date(json.end)
    endOfWeek.setHours(0);
    endOfWeek.setMinutes(0);
    endOfWeek.setSeconds(0);

    const entries = await prisma.entry.findMany({
        where: {
            time: {
                gte: startOfWeek,
                lte: endOfWeek,
            },
            entryType: "StomacheStart"
        },
        orderBy: {
            time: 'asc'
        }
        
    });

    return NextResponse.json(
        { entries: entries },
        { status: 200 }
    );
  } else {
    await prisma.$disconnect();
    return NextResponse.json(
      { message: "Method not allowed" },
      { status: 401 }
    );
  }
}
