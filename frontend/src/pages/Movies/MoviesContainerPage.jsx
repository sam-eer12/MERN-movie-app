import { useState } from "react";
import {
  useGetNewMoviesQuery,
  useGetTopMoviesQuery,
  useGetRandomMoviesQuery,
} from "../../redux/api/movies";

import { useFetchGenresQuery } from "../../redux/api/genre";
import SliderUtil from "../../component/SliderUtil";

const MoviesContainerPage = () => {
  const { data, isLoading: moviesLoading, error: moviesError } = useGetNewMoviesQuery();
  const { data: topMovies, isLoading: topMoviesLoading } = useGetTopMoviesQuery();
  const { data: genres, isLoading: genresLoading, error: genresError } = useFetchGenresQuery();
  const { data: randomMovies, isLoading: randomMoviesLoading } = useGetRandomMoviesQuery();

  const [selectedGenre, setSelectedGenre] = useState(null);

  const handleGenreClick = (genreId) => {
    setSelectedGenre(genreId);
  };

  const filteredMovies = data?.filter(
    (movie) => selectedGenre === null || movie.genre?._id === selectedGenre
  );

  if (moviesLoading || genresLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-teal-500"></div>
      </div>
    );
  }

  if (moviesError || genresError) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <div className="text-red-400 text-center">
          <h2 className="text-2xl font-bold mb-4">Error Loading Content</h2>
          <p>Please try refreshing the page or check your connection.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col lg:flex-row gap-8">
        {/* Genre Navigation */}
        <nav className="lg:w-1/4">
          <h2 className="text-2xl font-bold text-teal-400 mb-6">Genres</h2>
          <div className="space-y-2">
            <button
              className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                selectedGenre === null
                  ? "bg-teal-600 text-white"
                  : "bg-gray-700 text-gray-300 hover:bg-gray-600"
              }`}
              onClick={() => handleGenreClick(null)}
            >
              All Movies
            </button>
            {genres?.map((genre) => (
              <button
                key={genre._id}
                className={`w-full text-left px-4 py-2 rounded-lg transition-colors ${
                  selectedGenre === genre._id
                    ? "bg-teal-600 text-white"
                    : "bg-gray-700 text-gray-300 hover:bg-gray-600"
                }`}
                onClick={() => handleGenreClick(genre._id)}
              >
                {genre.name}
              </button>
            ))}
          </div>
        </nav>

        {/* Movie Content */}
        <section className="lg:w-3/4">
          <div className="space-y-12">
            {/* Random Movies */}
            <div>
              <h2 className="text-2xl font-bold text-white mb-6">Recommended for You</h2>
              {randomMoviesLoading ? (
                <div className="flex justify-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-500"></div>
                </div>
              ) : (
                <SliderUtil data={randomMovies} />
              )}
            </div>

            {/* Top Movies */}
            <div>
              <h2 className="text-2xl font-bold text-white mb-6">Top Rated Movies</h2>
              {topMoviesLoading ? (
                <div className="flex justify-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-500"></div>
                </div>
              ) : (
                <SliderUtil data={topMovies} />
              )}
            </div>

            {/* Filtered Movies */}
            <div>
              <h2 className="text-2xl font-bold text-white mb-6">
                {selectedGenre ? `${genres?.find(g => g._id === selectedGenre)?.name} Movies` : "All Movies"}
              </h2>
              {moviesLoading ? (
                <div className="flex justify-center py-8">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-teal-500"></div>
                </div>
              ) : filteredMovies?.length > 0 ? (
                <SliderUtil data={filteredMovies} />
              ) : (
                <div className="text-center py-8 text-gray-400">
                  <p>No movies found for this genre.</p>
                </div>
              )}
            </div>
          </div>
        </section>
      </div>
    </div>
  );
};

export default MoviesContainerPage;
