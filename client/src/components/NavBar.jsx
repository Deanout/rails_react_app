//  Posts List Link (Root Path) | Link to Create New Post (Post Form)
import React from "react";
import { Link } from "react-router-dom";

function NavBar() {
  return (
    <nav>
      <Link to="/">Posts List</Link>
      {" | "}
      <Link to="/new">New Post</Link>
    </nav>
  );
}

export default NavBar;
