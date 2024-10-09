import { useState } from "react";
import { addPlayer } from "../API";




export default function NewPlayerForm() {
  const [name, setName] = useState("");
  const [breed, setBreed] = useState("");
  const [status, setStatus] = useState("");
  const [image, setImage] = useState("");
  const [message, setMessage] = useState(null);

  const submitFunction = async (e) => {
    e.preventDefault();
    const playerData = {
      name, breed, status, imageUrl:image,
    };
    try{
      const newPlayer = await addPlayer(playerData);
      console.log("New player added sucessfully: ", newPlayer);
      setMessage(`Player ${newPlayer.name} added successfully!`);
      setName("");
      setBreed("");
      setStatus("");
      setImage("");

    }catch(err){
      setMessage('Error adding player. Please try again.');
    }
  };

  return(
    <form onSubmit={(e) => submitFunction(e)}>
      <h3>Add Player Form</h3>
      <label>
        Name: <br />
        <input 
        name="name"
        value={name}
        onChange={(e) => setName(e.target.value)} />
      </label>
      <label>
        Breed: <br />
        <input
        name="breed"
        value={breed}
        onChange={(e) => setBreed(e.target.value)} />
      </label>
      <label>
        Status: <br />
        <input
        name="status"
        value={status}
        onChange={(e) => setStatus(e.target.value)} />
      </label>
      <label>
        Image URL: <br />
        <input
        name="image"
        value={image}
        onChange={(e) => setImage(e.target.value)} />
      </label>
      {message && <p>{message}</p>}
      <button type="submit" >Add Player</button>

    </form>
  )
  
}