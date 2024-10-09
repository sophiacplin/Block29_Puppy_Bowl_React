

const BASE_URL = "https://fsa-puppy-bowl.herokuapp.com/api/2404-FTB-MT-WEB-PT";

//fetch all players
export const fetchAllPlayers = async () => {
  try{
    const response = await fetch(`${BASE_URL}/players`);
    const result = await response.json();
    return result.data.players;
  }catch(err){
    console.error("Error fetching players", err);
    throw err;
  }
};

//fetch single player
export const fetchSinglePlayer = async(id) => {
  try{
    const response = await fetch(`${BASE_URL}/players/${id}`);
    const result = await response.json();
    console.log("API response from single player", response)
    return result.data.player
  }catch(err){
    console.error(`Error fetching player with ID ${id}:`, err);
    throw err;
  }
};

//add a player
export const addPlayer = async(playerData) => {
  try{
    const response = await fetch(`${BASE_URL}/players`,{
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(playerData),
    });

    const result = await response.json();
    return result.data.newPlayer;

  }catch(err){
    console.error('Error adding player', err)
    throw err;
  }
};

//delete a player
export const deletePlayer = async(id) => {
  try{
    const response = await fetch(`${BASE_URL}/players/${id}`, 
      {
        method: 'DELETE',
      }
    );

    if(!response.ok){
      throw new Error(`Failed to delete player with ID ${id}`);
    }

    const result = await response.json();
  
    console.log(`Player with ${id} has been deleted.`, result);

  }catch(err){
    console.err(`Error deleting player with ID ${id}: `, err);
    throw err
  }
};