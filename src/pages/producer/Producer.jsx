import { useEffect, useState } from "react";
import { DeleteProducer } from "../../services/Index";
import Common from "../../common/common";
import { useSelector } from "react-redux";
import { selectProducer } from "../../features/producer/producerSlice";
import SearchBar from "../../components/SearchBar";
import ViewProducerPage from "./ViewProducer";
import EditProducer from "./EditProducer";
import AddProducer from "./AddProducer";
import ProfileCard from "../../components/ProfileCard";
import "./Producers.css";

const Producers = ({ viewState, editState, addState }) => {
  const [searchText, setSearchText] = useState("");
  const [loading, setLoading] = useState(false);
  const [filter, setFilter] = useState({});
  const [showConfirm, setShowConfirm] = useState(false);
  const [targetProducer, setTarget] = useState(null);
  const { TokenRefreshedModal, fetchProducers, navigate, updateProducers } =
    Common();
  const { producers = [] } = useSelector(selectProducer);

  useEffect(() => {
    if (!producers.length) fetchProducers({ setLoading });
  }, []);

  const filteredProducers = producers.filter((producer) =>
    producer.name?.toLowerCase().includes(filter.name?.toLowerCase() || "")
  );

  const handleDelete = async (id) => {
    try {
      const res = await DeleteProducer(id);
      if (res.status === "success") {
        const list = producers.filter((d) => d._id !== id);
        updateProducers(list);
      }
    } catch (error) {
      console.error(error);
      if (error?.response?.data?.message === "Token refreshed") {
        TokenRefreshedModal();
      }
      alert(error?.response?.data?.message || "Something went wrong.");
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
        path={"/producers/add"}
      />

      {loading ? (
        <div>Loading...</div>
      ) : producers.length > 0 ? (
        <div className="cardContainer">
          {filteredProducers.map((item) => (
            <ProfileCard
              key={item._id}
              data={item}
              path={"producers"}
              setShowConfirm={setShowConfirm}
              setTarget={setTarget}
            />
          ))}
        </div>
      ) : (
        <div style={{ textAlign: "center", padding: "16px" }}>
          No data available
        </div>
      )}

      {showConfirm && targetProducer && (
        <div className="modalOverlay">
          <div className="modalBox">
            <p>
              Are you sure you want to delete{" "}
              <strong>{targetProducer.name}</strong>?
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
                  handleDelete(targetProducer._id);
                  setShowConfirm(false);
                  setTarget(null);
                }}
                className="confirmBtn"
              >
                Yes
              </button>
              <button
                onClick={() => {
                  setShowConfirm(false);
                  setTarget(null);
                }}
                className="cancelBtn"
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}

      {viewState && <ViewProducerPage />}
      {editState && <EditProducer />}
      {addState && <AddProducer />}
    </div>
  );
};

export default Producers;
