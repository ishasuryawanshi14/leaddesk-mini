import { NextResponse } from "next/server";
import { supabase } from "@/lib/supabase";
import { leadSchema } from "@/lib/validation";

export async function POST(request) {
  try {
    
    const body = await request.json();

    
    const validatedData = leadSchema.parse(body);

    
    const { data, error } = await supabase
      .from("leads")
      .insert([validatedData]);

    if (error) {
      return NextResponse.json(
        { error: error.message },
        { status: 500 }
      );
      const validatedData = leadSchema.parse(body);

await supabase
  .from("leads")
  .insert([validatedData]);
    }

    return NextResponse.json(
      {
        message: "Lead submitted successfully!",
        data,
      },
      { status: 201 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 400 }
    );
  }
}