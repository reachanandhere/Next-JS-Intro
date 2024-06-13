import { connect } from "@/dbConfig/dbConfig";
import User from "@/models/userModel";
import { NextRequest, NextResponse } from "next/server";

import bcrypt from "bcryptjs";

export async function POST(request: NextRequest) {
  await connect();
  try {
    const reqBody = await request.json();
    const { username, email, password } = reqBody;

    const user = await User.findOne({ email: email });
    if (user) return NextResponse.json({ error: "User already exists" });

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const newUser = new User({
      username,
      email,
      password: hashedPassword,
    });

    const savedUser = await newUser.save();
    

    return NextResponse.json(
      {
        message: "User created successfully",
        success: true,
        savedUser
      },
      {
        status: 201,
      }
    );
  } catch (err) {
    return NextResponse.json({
      status: 500,
      body: "Internal Server Error",
    });
  }
}
