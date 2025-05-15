import { useEffect, useRef, useState } from "react";
import { DeleteMovie, GetMovie } from "../../services/Index";
import ViewMovie from "./ViewMovie";
import EditMovie from "./EditMovie";
import AddMovie from "./AddMovie";
import Common from "../../common/common";
import MovieCard from "../../components/MovieCard";
import { selectMovie } from "../../features/movie/moviesSlice";
import { useSelector } from "react-redux";
import SearchBar from "../../components/SearchBar";
import "./Movie.css";

const Movies = ({ viewState, editState, addState }) => {
  const [searchText, setSearchText] = useState("");
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState({});
  const [showConfirm, setShowConfirm] = useState(false);
  const [targetMovie, setTargetMovie] = useState(null);
  const { movies = [] } = useSelector(selectMovie);

  const { TokenRefreshedModal, fetchMovies, updateMovies } = Common();

  useEffect(() => {
    if (!movies.length) fetchMovies({ setLoading });
  }, []);

  const filteredMovies = movies.filter((movie) =>
    movie.name?.toLowerCase().includes(filter.name?.toLowerCase() || "")
  );

  const handleDelete = async (id) => {
    try {
      setLoading(true);
      const res = await DeleteMovie(id);
      if (res.movieId === id) {
        const list = movies.filter((d) => d._id !== id);
        updateMovies(list);
      }
    } catch (error) {
      console.error(error);
      if (error?.response?.data?.message === "Token refreshed") {
        TokenRefreshedModal();
      }
     console.log(error?.response?.data?.message || "Something went wrong.");
    } finally {
      setLoading(false);
    }
  };
  const handleSearch = () => {
    setFilter({
      name: searchText,
    });
  };
  useEffect(() => {
    handleSearch();
  }, [searchText]);

  return (
    <div>
      <SearchBar
        searchText={searchText}
        setSearchText={setSearchText}
        handleSearch={handleSearch}
        path={"/movies/add"}
      />
      {viewState && <ViewMovie />}
      {editState && <EditMovie />}
      {addState && <AddMovie />}
      {loading ? (
        <div className="loading-text">Loading...</div>
      ) : filteredMovies.length > 0 ? (
        <div className="card-container">
          {filteredMovies.map((movie) => (
            <MovieCard
              key={movie._id}
              data={movie}
              setShowConfirm={setShowConfirm}
              setTargetMovie={setTargetMovie}
            />
          ))}

          {showConfirm && targetMovie && (
            <div className="modal-overlay">
              <div className="modal-box">
                <p>
                  Are you sure you want to delete{" "}
                  <strong>{targetMovie.name}</strong>?
                </p>
                <div
                  style={{
                    marginTop: "12px",
                    display: "flex",
                    gap: "12px",
                    justifyContent: "center",
                  }}
                >
                  <button
                    onClick={() => {
                      handleDelete(targetMovie._id);
                      setShowConfirm(false);
                      setTargetMovie(null);
                    }}
                    className="confirm-btn"
                  >
                    Yes
                  </button>
                  <button
                    onClick={() => {
                      setShowConfirm(false);
                      setTargetMovie(null);
                    }}
                    className="cancel-btn"
                  >
                    No
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="no-data">No data available</div>
      )}
    </div>
  );
};


export default Movies;
