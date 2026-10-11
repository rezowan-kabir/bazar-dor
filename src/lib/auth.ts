import { betterAuth } from "better-auth";
import { MongoClient } from "mongodb";
import { mongodbAdapter } from "@better-auth/mongo-adapter";

function createAuth() {
  const connectionString = process.env.MONGODB_URL;
  if (!connectionString?.trim()) {
    throw new Error("MONGODB_URL must be set to use authentication.");
  }

  const client = new MongoClient(connectionString);
  const db = client.db("Bazar-Dor");

  return betterAuth({
    emailAndPassword: {
      enabled: true,
    },
    socialProviders: {
        google: { 
            clientId: process.env.GOOGLE_CLIENT_ID as string, 
            clientSecret: process.env.GOOGLE_CLIENT_SECRET as string, 
        }, 
        github: { 
            clientId: process.env.GITHUB_CLIENT_ID as string, 
            clientSecret: process.env.GITHUB_CLIENT_SECRET as string, 
        },
    },
    database: mongodbAdapter(db, {
      client,
    }),
  });
}

let authInstance: ReturnType<typeof createAuth> | undefined;

export function getAuth() {
  authInstance ??= createAuth();
  return authInstance;
}
