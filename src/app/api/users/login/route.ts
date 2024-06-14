import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";

import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";



export async function POST(request: NextRequest) {
   await connect();
  try {
    //console.log("Login route")
    const reqBody = await request.json();
    const { email, password } = reqBody;

    const user = await User.findOne({ email })
   
    if (!user) return NextResponse.json({ error: "User not found" }, { status: 404 });

    const validPassword = await bcrypt.compare(password, user.password);
    if (!validPassword) return NextResponse.json({ error: "Invalid password" }, { status: 400 });

    const tokenData = {
        id : user._id,
        username: user.username,
        email: user.email
    }


    const token = await jwt.sign(tokenData, process.env.TOKEN_SECRET!, { expiresIn: "1d" });

    const response = NextResponse.json({ message: "Login successful", success: true }, { status: 200 });
    
    response.cookies.set("token", token, {httpOnly: true, sameSite: "strict", secure: true});
    return response;

  } catch (error: any) {
    return NextResponse.json(
      { error: error.message },
      {
        status: 500,
      }
    );
  }
}
