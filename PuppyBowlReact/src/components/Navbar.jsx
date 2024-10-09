import { Link } from "react-router-dom"



export default function Navbar() {

  return(
    <div id="navbar" >
      <Link to='/' className="nav-link" activeClassName="active" >PLAYERS</Link>
      <Link to='/add-form' className="nav-link">ADD PLAYER</Link>
    </div>
  );

}