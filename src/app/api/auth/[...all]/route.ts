import { connection } from "next/server";
import { toNextJsHandler } from "better-auth/next-js";
import { getAuth } from "@/lib/auth";

async function handleAuth(request: Request) {
  await connection();
  return toNextJsHandler(getAuth()).GET(request);
}

export { handleAuth as GET, handleAuth as POST };
