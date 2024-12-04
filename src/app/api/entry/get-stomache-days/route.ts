import { EntryType, PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  if(req.method === "POST"){
    const json = await req.json();

    const entries = await prisma.entry.findMany({
        where: {
            userId: json.userId,
            entryType: EntryType.StomacheStart
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
