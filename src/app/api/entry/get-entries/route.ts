import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  if(req.method === "POST"){
    const json = await req.json();
        
    const startOfDay = new Date(json.date);
    startOfDay.setHours(0);
    startOfDay.setMinutes(0);
    startOfDay.setSeconds(0);
    const endOfDay = new Date(startOfDay);
    endOfDay.setHours(23);
    endOfDay.setMinutes(59);
    endOfDay.setSeconds(59);

    const entries = await prisma.entry.findMany({
        where: {
            userId: json.userId,
            time: {
                gte: startOfDay,
                lt: endOfDay,
            }
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
