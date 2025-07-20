import { useState } from "react";
import {
  useCreateGenreMutation,
  useUpdateGenreMutation,
  useDeleteGenreMutation,
  useFetchGenresQuery,
} from "../../redux/api/genre";

import { toast } from "react-toastify";
import GenreForm from "../../component/GenreForm";
import Modal from "../../component/Modal";

const GenreList = () => {
  const { data: genres, refetch } = useFetchGenresQuery();
  const [name, setName] = useState("");
  const [selectedGenre, setSelectedGenre] = useState(null);
  const [updatingName, setUpdatingName] = useState("");
  const [modalVisible, setModalVisible] = useState(false);

  const [createGenre] = useCreateGenreMutation();
  const [updateGenre] = useUpdateGenreMutation();
  const [deleteGenre] = useDeleteGenreMutation();

  const handleCreateGenre = async (e) => {
    e.preventDefault();

    if (!name) {
      toast.error("Genre name is required");
      return;
    }

    try {
      const result = await createGenre({ name }).unwrap();

      if (result.error) {
        toast.error(result.error);
      } else {
        setName("");
        toast.success(`${result.name} is created.`);
        refetch();
      }
    } catch (error) {
      console.error(error);
      toast.error("Creating genre failed, try again.");
    }
  };

  const handleUpdateGenre = async (e) => {
    e.preventDefault();

    if (!updateGenre) {
      toast.error("Genre name is required");
      return;
    }

    try {
      const result = await updateGenre({
        id: selectedGenre._id,
        updateGenre: {
          name: updatingName,
        },
      }).unwrap();

      if (result.error) {
        toast.error(result.error);
      } else {
        toast.success(`${result.name} is updated`);
        refetch();
        setSelectedGenre(null);
        setUpdatingName("");
        setModalVisible(false);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const handleDeleteGenre = async () => {
    try {
      const result = await deleteGenre(selectedGenre._id).unwrap();

      if (result.error) {
        toast.error(result.error);
      } else {
        toast.success(`${result.name} is deleted.`);
        refetch();
        setSelectedGenre(null);
        setModalVisible(false);
      }
    } catch (error) {
      console.error(error);
      toast.error("Genre deletion failed. Tray again.");
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        <h1 className="text-3xl font-bold text-teal-400 mb-8 text-center">Manage Genres</h1>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Create Genre Form */}
          <div>
            <h2 className="text-xl font-semibold text-white mb-4">Create New Genre</h2>
            <GenreForm
              value={name}
              setValue={setName}
              handleSubmit={handleCreateGenre}
              buttonText="Create Genre"
            />
          </div>

          {/* Genres List */}
          <div>
            <h2 className="text-xl font-semibold text-white mb-4">Existing Genres</h2>
            <div className="bg-gray-800 rounded-lg p-6 shadow-lg max-h-96 overflow-y-auto">
              {genres && genres.length > 0 ? (
                <div className="space-y-3">
                  {genres.map((genre) => (
                    <div
                      key={genre._id}
                      className="flex items-center justify-between bg-gray-700 p-3 rounded-lg"
                    >
                      <span className="text-white font-medium">{genre.name}</span>
                      <button
                        onClick={() => {
                          setSelectedGenre(genre);
                          setUpdatingName(genre.name);
                          setModalVisible(true);
                        }}
                        className="text-teal-400 hover:text-teal-300 transition-colors"
                      >
                        Edit
                      </button>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center text-gray-400 py-8">
                  <p>No genres found. Create your first genre!</p>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Modal for editing */}
        {modalVisible && selectedGenre && (
          <Modal isOpen={modalVisible} onClose={() => setModalVisible(false)}>
            <div className="p-6">
              <h2 className="text-xl font-semibold text-white mb-4">Update Genre</h2>
              <GenreForm
                value={updatingName}
                setValue={(value) => setUpdatingName(value)}
                handleSubmit={handleUpdateGenre}
                buttonText="Update"
                handleDelete={handleDeleteGenre}
              />
            </div>
          </Modal>
        )}
      </div>
    </div>
  );
};

export default GenreList;
