import { PrismaClient } from "@prisma/client";
import { NextResponse } from "next/server";

const prisma = new PrismaClient();

export async function POST(req: Request) {
  if (req.method === "POST") {
    if (req.body === null) {
      await prisma.$disconnect();
      return NextResponse.json(
        {
          message: "No body",
        },
        {
          status: 400,
          headers: { "content-type": "application/json" },
        }
      );
    }
    try {
      const {username, password} = await req.json();
      const user = await prisma.user.findUnique({
        where: {
            username: username,
            password: password
        }
      });

      await prisma.$disconnect();
      if(user != null){
        return NextResponse.json(
            { message: "Logged in", id: user },
            { status: 200 }
        )
       }else{
        return NextResponse.json(
            { message: "Incorrect login"},
            { status: 404 }
        )
       };
    } catch (error) {
      console.error("error: " + error);
      await prisma.$disconnect();
      return NextResponse.json({ message: "server error" }, { status: 500 });
    }
  } else {
    await prisma.$disconnect();
    return NextResponse.json(
      { message: "Method not allowed" },
      { status: 401 }
    );
  }
}
