import mongoose from "mongoose";
import dotenv from "dotenv";
import path from "path";
import Genre from "./models/Genre.js";
import Movie from "./models/Movie.js";

// Load .env from parent directory
dotenv.config({ path: path.join(process.cwd(), '..', '.env') });

const sampleGenres = [
  { name: "Action" },
  { name: "Comedy" },
  { name: "Drama" },
  { name: "Horror" },
  { name: "Romance" },
  { name: "Thriller" },
  { name: "Sci-Fi" },
  { name: "Adventure" },
  { name: "Animation" },
  { name: "Documentary" }
];

const sampleMovies = [
  {
    name: "The Matrix",
    year: 1999,
    detail: "A computer hacker learns from mysterious rebels about the true nature of his reality and his role in the war against its controllers.",
    cast: ["Keanu Reeves", "Laurence Fishburne", "Carrie-Anne Moss"],
    image: "https://via.placeholder.com/400x600/1f2937/ffffff?text=The+Matrix"
  },
  {
    name: "Inception",
    year: 2010,
    detail: "A thief who steals corporate secrets through dream-sharing technology is given the inverse task of planting an idea into the mind of a C.E.O.",
    cast: ["Leonardo DiCaprio", "Marion Cotillard", "Tom Hardy"],
    image: "https://via.placeholder.com/400x600/1f2937/ffffff?text=Inception"
  },
  {
    name: "The Dark Knight",
    year: 2008,
    detail: "When the menace known as the Joker wreaks havoc and chaos on the people of Gotham, Batman must accept one of the greatest psychological and physical tests.",
    cast: ["Christian Bale", "Heath Ledger", "Aaron Eckhart"],
    image: "https://via.placeholder.com/400x600/1f2937/ffffff?text=The+Dark+Knight"
  },
  {
    name: "Pulp Fiction",
    year: 1994,
    detail: "The lives of two mob hitmen, a boxer, a gangster and his wife, and a pair of diner bandits intertwine in four tales of violence and redemption.",
    cast: ["John Travolta", "Samuel L. Jackson", "Uma Thurman"],
    image: "https://via.placeholder.com/400x600/1f2937/ffffff?text=Pulp+Fiction"
  },
  {
    name: "Forrest Gump",
    year: 1994,
    detail: "The presidencies of Kennedy and Johnson, the Vietnam War, the Watergate scandal and other historical events unfold from the perspective of an Alabama man.",
    cast: ["Tom Hanks", "Robin Wright", "Gary Sinise"],
    image: "https://via.placeholder.com/400x600/1f2937/ffffff?text=Forrest+Gump"
  },
  {
    name: "The Avengers",
    year: 2012,
    detail: "Earth's mightiest heroes must come together and learn to fight as a team if they are going to stop the mischievous Loki and his alien army from enslaving humanity.",
    cast: ["Robert Downey Jr.", "Chris Evans", "Mark Ruffalo"],
    image: "https://via.placeholder.com/400x600/1f2937/ffffff?text=The+Avengers"
  },
  {
    name: "Jurassic Park",
    year: 1993,
    detail: "A pragmatic paleontologist visiting an almost complete theme park is tasked with protecting a couple of kids after a power failure causes the park's cloned dinosaurs to run loose.",
    cast: ["Sam Neill", "Laura Dern", "Jeff Goldblum"],
    image: "https://via.placeholder.com/400x600/1f2937/ffffff?text=Jurassic+Park"
  },
  {
    name: "Titanic",
    year: 1997,
    detail: "A seventeen-year-old aristocrat falls in love with a kind but poor artist aboard the luxurious, ill-fated R.M.S. Titanic.",
    cast: ["Leonardo DiCaprio", "Kate Winslet", "Billy Zane"],
    image: "https://via.placeholder.com/400x600/1f2937/ffffff?text=Titanic"
  }
];

const seedData = async () => {
  try {
    const mongoUri = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/moviesApp";
    await mongoose.connect(mongoUri);
    console.log("Connected to MongoDB");
    
    // Clear existing data
    await Genre.deleteMany({});
    await Movie.deleteMany({});
    console.log("Existing data cleared");

    // Create genres
    const createdGenres = await Genre.insertMany(sampleGenres);
    console.log(`Created ${createdGenres.length} genres`);

    // Create movies with genre references
    const moviesWithGenres = sampleMovies.map((movie, index) => ({
      ...movie,
      genre: createdGenres[index % createdGenres.length]._id
    }));

    const createdMovies = await Movie.insertMany(moviesWithGenres);
    console.log(`Created ${createdMovies.length} movies`);

    console.log("✅ Data seeded successfully!");
    console.log("You can now start the application and see the movies and genres");
    
    await mongoose.disconnect();
    process.exit(0);
  } catch (error) {
    console.error("❌ Error seeding data:", error);
    process.exit(1);
  }
};

seedData();
