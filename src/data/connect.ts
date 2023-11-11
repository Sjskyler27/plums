import { config } from "dotenv";
import mongoose from "mongoose";

config();

export default async function connect() {
    const mongoDbUri = process.env.MONGO_DB_URI!;
    await mongoose.connect(mongoDbUri);
}

