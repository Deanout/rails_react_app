import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom"; // To mock 'Link' components from 'react-router-dom'
import NavBar from "./NavBar";

describe("NavBar component", () => {
  const renderNavBar = () => {
    render(<NavBar />, { wrapper: MemoryRouter });
  };
  test("renders both links", () => {
    // render the navbar
    renderNavBar();
    // expect the links to be there or something
    expect(screen.getByText("Posts List")).toBeInTheDocument();
    expect(screen.getByText("Create New Post")).toBeInTheDocument();
  });
});
