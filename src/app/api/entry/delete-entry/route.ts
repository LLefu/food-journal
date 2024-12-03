import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function DELETE(req: Request) {
  if(req.method === "DELETE"){
    const json = await req.json();

    const entries = await prisma.entry.delete({
        where: {
            id: json
        },
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
