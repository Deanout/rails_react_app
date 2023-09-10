import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom"; // To mock 'Link' components from 'react-router-dom'
import AppRoutes from "./AppRoutes";

jest.mock("../features/posts/PostsList", () => {
  const MockPostsList = () => (
    <div>Your Matcher for PostsList component here</div>
  );
  return MockPostsList;
});

jest.mock("../features/posts/PostDetails", () => {
  const MockPostDetails = () => (
    <div>Your matcher for PostDetails component here</div>
  );
  return MockPostDetails;
});

jest.mock("../features/posts/NewPostForm", () => {
  const MockNewPostForm = () => (
    <div>Your matcher for NewPostForm component here</div>
  );
  return MockNewPostForm;
});

jest.mock("../features/posts/PostEditForm", () => {
  const MockPostEditForm = () => (
    <div>Your matcher for PostEditForm component here</div>
  );
  return MockPostEditForm;
});

jest.mock("../constants", () => ({
  API_URL: "http://your-test-api-url",
}));

describe("AppRoutes component", () => {
  const renderWithRouter = (ui, { initialEntries = ["/"] } = {}) => {
    return render(ui, {
      wrapper: ({ children }) => (
        <MemoryRouter initialEntries={initialEntries}>{children}</MemoryRouter>
      ),
    });
  };
  test("root path renders PostsList", () => {
    renderWithRouter(<AppRoutes />, { initialEntries: ["/"] });
    const expectedText = "Your Matcher for PostsList component here";
    expect(screen.getByText(expectedText)).toBeInTheDocument();
  });

  test("post details path renders PostDetails", () => {
    renderWithRouter(<AppRoutes />, { initialEntries: ["/posts/1"] });
    const expectedText = "Your matcher for PostDetails component here";
    expect(screen.getByText(expectedText)).toBeInTheDocument();
  });

  test("/new path renders NewPostForm", () => {
    renderWithRouter(<AppRoutes />, { initialEntries: ["/new"] });
    const expectedText = "Your matcher for NewPostForm component here";
    expect(screen.getByText(expectedText)).toBeInTheDocument();
  });

  test("/posts/:id/edit path renders EditPostForm", () => {
    renderWithRouter(<AppRoutes />, { initialEntries: ["/posts/1/edit"] });
    const expectedText = "Your matcher for PostEditForm component here";
    expect(screen.getByText(expectedText)).toBeInTheDocument();
  });
});
