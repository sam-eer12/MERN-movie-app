import { Link } from "react-router-dom";
import { useState } from "react";

const MovieCard = ({ movie }) => {
  const [imageError, setImageError] = useState(false);
  
  const handleImageError = () => {
    setImageError(true);
  };

  return (
    <div className="relative group mx-2 my-4">
      <Link to={`/movies/${movie._id}`}>
        <div className="relative overflow-hidden rounded-lg shadow-lg bg-gray-700">
          {!imageError && movie.image ? (
            <img
              src={movie.image}
              alt={movie.name}
              className="w-full h-80 object-cover transition duration-300 ease-in-out transform group-hover:scale-105"
              onError={handleImageError}
            />
          ) : (
            <div className="w-full h-80 flex flex-col justify-center items-center bg-gradient-to-br from-gray-700 to-gray-800 text-white">
              <div className="text-4xl mb-2">🎬</div>
              <div className="text-sm font-medium">Movie Poster</div>
            </div>
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <div className="absolute bottom-4 left-4 right-4">
              <h3 className="text-white font-bold text-lg mb-1">{movie.name}</h3>
              <p className="text-gray-300 text-sm">{movie.year}</p>
              {movie.genre && (
                <p className="text-teal-400 text-sm">{movie.genre.name}</p>
              )}
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
};

export default MovieCard;
