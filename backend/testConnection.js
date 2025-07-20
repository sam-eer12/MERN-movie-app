import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";

// Load .env from parent directory
dotenv.config({ path: path.join(process.cwd(), '..', '.env') });

async function testConnection() {
  try {
    console.log("Attempting to connect to MongoDB...");
    const mongoUri = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/moviesApp";
    console.log("Connection string:", mongoUri);
    
    await mongoose.connect(mongoUri);
    console.log("✅ Successfully connected to MongoDB!");
    
    // Check if there are any existing genres
    const db = mongoose.connection.db;
    const genres = await db.collection('genres').find({}).toArray();
    console.log(`Found ${genres.length} genres in database`);
    
    const movies = await db.collection('movies').find({}).toArray();
    console.log(`Found ${movies.length} movies in database`);
    
    await mongoose.disconnect();
    console.log("Disconnected from MongoDB");
    
  } catch (error) {
    console.error("❌ Failed to connect to MongoDB:", error.message);
    console.error("Make sure MongoDB is running on your system");
    console.error("You can install MongoDB Community Server from: https://www.mongodb.com/try/download/community");
  }
}

testConnection();
