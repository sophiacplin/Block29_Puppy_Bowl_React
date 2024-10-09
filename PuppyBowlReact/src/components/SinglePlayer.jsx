import { useEffect, useState } from "react"
import { useParams, useNavigate } from "react-router-dom";
import { fetchSinglePlayer, deletePlayer } from "../API";
import Modal from "./Modal";



export default function SinglePlayer() {
  const [player, setPlayer] = useState(null);
  const [message, setMessage] = useState(null);
  const [showModal, setShowModal] = useState(false); //control modal visibility
  const {id} = useParams();
  const nav = useNavigate();

  //get single player that was clicked from API
  useEffect(() => {
    const getPlayer = async () => {
      try{
        const playerData = await fetchSinglePlayer(id);
        setPlayer(playerData);
      }catch(err){
      console.error(err);
      }
    };
    if(id){
      getPlayer();
    }
  }, [id]);

  //to handle delete button
  const handleDelete = async() => {
    try{
      await deletePlayer(id);
      setMessage(`Player with ID ${id} has been deleted successfully.`);
      setShowModal(true);
      setTimeout(() => {
        setShowModal(false);
        nav("/");
      }, 3000);
    }catch(err){
      setMessage(`Error deleting player with ID ${id}.`);
      console.error(`Error deleting player with ID ${id}:`, err);
    }
  };

  return(
    <div className="single-player-container" >
      {player ?(
        <>
          <img src={player.imageUrl} alt={`Image of ${player.name}`} />
          <h2>{player.name}</h2>
          <p>Breed: {player.breed}</p>
          <p>Status: {player.status}</p>
          {message && <p>{message}</p>}
          <button onClick={handleDelete} >Delete Player</button>
        </>
      ) :(
        <p>Loading player information...</p>
      )} 
      {showModal && <Modal message={message} onClose={() => setShowModal(false)} />}
      </div>
  );
}