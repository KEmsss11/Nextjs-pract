import { prisma } from "@/lib/prisma";
import { createClient } from "@/lib/supabase/server";
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

export async function PUT(request: Request) {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user?.email) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const firstName = String(body.firstName ?? "").trim();
    const lastName = String(body.lastName ?? "").trim();

    if (!firstName || !lastName) {
      return NextResponse.json(
        { error: "First name and last name are required." },
        { status: 400 }
      );
    }

    const profile = await prisma.user.upsert({
      where: { id: user.id },
      update: {
        firstName,
        lastName,
        cityMunicipality: String(body.cityMunicipality ?? "").trim(),
        PhoneNumber: String(body.phoneNumber ?? "").trim(),
      },
      create: {
        id: user.id,
        email: user.email,
        firstName,
        lastName,
        PhoneNumber: String(body.phoneNumber ?? "").trim(),
        region: "",
        province: "",
        cityMunicipality: String(body.cityMunicipality ?? "").trim(),
        barangay: "",
        streetAddress: "",
      },
    });

    return NextResponse.json(profile);
  } catch (error) {
    console.error(error);
    return NextResponse.json(
      { error: "Failed to save profile." },
      { status: 500 }
    );
  }
}
