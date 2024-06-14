import { NextRequest } from "next/server";

import jwt from "jsonwebtoken";

export const getDataFromToken = (request: NextRequest)=> {
  const token = request.cookies.get("token")?.value;
  if (!token) return null;
  try {
    const tokenData:any =  jwt.verify(token, process.env.TOKEN_SECRET!);
    return tokenData.id;
  } catch (error:any) {
    throw new Error("Invalid token");
  }
}