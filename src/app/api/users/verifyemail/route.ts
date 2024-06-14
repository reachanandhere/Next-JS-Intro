import { NextResponse, NextRequest } from "next/server";
import { connect } from "@/dbConfig/dbConfig";

import User from "@/models/userModel";

export async function POST(request: NextRequest) {
  await connect();
  try {
    const reqBody = await request.json();
    const { token } = reqBody;
    console.log(token);

    const user = await User.findOne({
        verifyToken: token,
        verifyTokenExpiration: { $gt: Date.now() },
    })

    if (!user) return NextResponse.json({ error: "Token is invalid or expired" }, { status: 400 });

    user.isVerified = true;
    user.verifyToken = undefined;
    user.verifyTokenExpiration = undefined;
    await user.save();
    return NextResponse.json({ message: "Email verified successfully" }, { status: 200 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}