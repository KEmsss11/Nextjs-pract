import {prisma} from "@/lib/prisma";
import {NextResponse} from "next/server";

export async function POST(request: Request) {
 try{
    //Read the JSON sent by the client
    const body = await request.json();

    const product = await prisma.product.create({
        data: {
            name: body.name,
            description: body.description,
            price: body.price,
        },
    });

    return NextResponse.json(product, {
        status:201,
    });
} catch (error) {
    console.error("Failed to create product:", error);

    return NextResponse.json(
      {
        error: "Failed to create product",
      },
      {
        status: 500,
      }
    );
  }
}