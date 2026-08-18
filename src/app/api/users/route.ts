import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();  



  const user = await prisma.user.create({
    data: {
      id: body.id,
      email: body.email,
      firstName: body.firstName,
      lastName: body.lastName,
      PhoneNumber: body.phoneNumber,
      region: body.region,
      province: body.province,
      cityMunicipality:
        body.cityMunicipality,
      barangay: body.barangay,
      streetAddress: body.streetAddress,
    },
  });

  return NextResponse.json(user);
} catch (error) {
  console.error(error);

   return NextResponse.json(
    { error: "Failed to create user" },
    { status: 500 }
  );
}
}