import "../assets/styles/navbar.css";

export default function Navbar() {
  return (
    <header className="navbar">
      <div className="navbar__container">

        <div className="navbar__logo">
          Saifudin & Rea Mae
        </div>

        <nav className="navbar__menu">
          <a href="#home">Home</a>
          <a href="#story">Our Story</a>
          <a href="#wedding">Wedding</a>
          <a href="#gallery">Gallery</a>
          <a href="#rsvp">RSVP</a>
        </nav>

      </div>
    </header>
  );
}