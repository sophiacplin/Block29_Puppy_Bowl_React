import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { deletePlayer, fetchAllPlayers } from "../API";
import Modal from "./Modal";



export default function AllPlayers() {
  const [players, setPlayers] = useState([]);
  const [message, setMessage] = useState(null);
  const [showModal, setShowModal] = useState(null);
  const [searchQuery, setSearchQuery] = useState('');
const nav = useNavigate();

  useEffect(() => {

    const getPlayers = async () => {
      try{
        const playersData = await fetchAllPlayers();
        setPlayers(playersData);
      }catch(err){
        console.error(err);
      }
    }
    getPlayers();
  }, []);

  const submitDelete = async (id) => {
    try{
      await deletePlayer(id);
      setPlayers((prevPlayers) => prevPlayers.filter((player) => player.id !== id));
      setMessage(`Player with ID ${id} has been Deleted successfully.`);
      setShowModal(true);
      setTimeout(() => {
        setShowModal(false);
      }, 5000);
    }catch(err) {
      setMessage(`Error deleting player with ID ${id}.`);
      console.error(`Error deleting player with ID ${id}`, err);
    }
  };

  const filteredPlayers = players.filter((player) => player.name.toLowerCase().includes(searchQuery.toLocaleLowerCase())
  );

  return(
    <div className="all-players-page" >
      <h2>Players</h2>

      {/* search bar */}
      <input 
        type="text"
        placeholder="Search players..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="search-bar"
      />

      <div id="players-container">
        {filteredPlayers.length > 0 ? (
          filteredPlayers.map((player) => (
            <div id="player-box" key={player.id}>
              <img src={player.imageUrl} alt={`Image of ${player.name}`} />
              <h3>{player.name}</h3>
              <div id="button-container">
                <button onClick={() => nav(`/single-player/${player.id}`)} >View Player</button>
                <button onClick={() => submitDelete(player.id)} >Delete Player</button>
              </div>
            </div>
          ))
        ) :(
          <p className="loading">Loading players...</p>
        )}
        {showModal && <Modal message={message} onClose={() => setShowModal(false)} />}
      </div>
    </div>
  );
}