import "./Navbar.css";

const Navbar = () => {
  return (
    <div className="navbar">
      <div className="navbar-left">
        <p>Price Tracker</p>
      </div>
      <div className="navbar-right">
        <p>Welcom, Admin</p>
        <button>Logout</button>
      </div>
    </div>
  );
};

export default Navbar;
