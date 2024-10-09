import { Routes, Route } from "react-router-dom";
import AllPlayers from "./AllPlayers";
import SinglePlayer from "./SinglePlayer";
import NewPlayerForm from "./NewPlayerForm";




export default function MainSection() {

  return(
    <div id="main-section">
      <Routes>
        <Route path='/' element = {<AllPlayers />} />
        <Route path='/single-player/:id' element= {<SinglePlayer />} />
        <Route path='/add-form' element = {<NewPlayerForm />} />
      </Routes>
    </div>
  )
}