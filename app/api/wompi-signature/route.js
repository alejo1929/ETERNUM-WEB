import crypto from "crypto";
import { NextResponse } from "next/server";

export async function POST(request) {
  try {
    const { reference, amountInCents, currency = "COP" } = await request.json();
    const secret = process.env.WOMPI_INTEGRITY_SECRET;

    if (!reference || !amountInCents || !secret) {
      return NextResponse.json(
        { error: "Faltan datos para generar la firma de integridad." },
        { status: 400 }
      );
    }

    const cadena = `${reference}${amountInCents}${currency}${secret}`;
    const signature = crypto.createHash("sha256").update(cadena).digest("hex");

    return NextResponse.json({ signature });
  } catch (error) {
    return NextResponse.json(
      { error: "Error interno al generar la firma." },
      { status: 500 }
    );
  }
}