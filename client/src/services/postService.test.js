import fetchMock from "jest-fetch-mock";
import {
  fetchAllPosts,
  fetchPost,
  createPost,
  updatePost,
  deletePost,
} from "./postService";

fetchMock.enableMocks();

jest.mock("../constants", () => ({
  API_URL: "http://your-test-api-url",
}));

describe("Post API Service", () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });
  afterEach(() => {
    jest.resetAllMocks();
  });
  // Index
  it("fetches all posts", async () => {
    const mockData = [{ id: 1, title: "Test Post", body: "Case" }];
    fetch.mockResponseOnce(JSON.stringify(mockData));

    const result = await fetchAllPosts();

    expect(result).toEqual(mockData);
  });
  // Show
  it("fetches a single post", async () => {
    const mockPostID = 1;
    const mockData = { id: mockPostID, title: "Test Post", body: "Case" };
    fetch.mockResponseOnce(JSON.stringify(mockData));

    const result = await fetchPost(mockPostID);

    expect(result).toEqual(mockData);
  });

  // New => renders the create action with a @post and some partial stuff.
  // Create
  it("creates a new post", async () => {
    const mockData = { title: "Test Post", body: "Case" };
    fetch.mockResponseOnce(JSON.stringify(mockData));

    const result = await createPost(mockData);

    expect(result).toEqual(mockData);
  });

  // Edit
  // Update
  it("updates a post", async () => {
    const mockPostID = 1;
    const mockData = { id: mockPostID, title: "Test Post", body: "Case" };

    fetch.mockResponseOnce(JSON.stringify(mockData));

    const result = await updatePost(mockPostID, mockData);

    expect(result).toEqual(mockData);
  });

  // Delete

  it("deletes a post", async () => {
    const mockPostID = 1;
    fetch.mockResponseOnce(null, { status: 204 });

    const result = await deletePost(mockPostID);

    expect(result).toEqual(null);
  });

  // This is the unhappy path zone
  it("throws an error when the fetchAllPost response is not ok", async () => {
    // Ensure that we are actually throwing an error in the service.
    // We can do this by mocking the response to be not ok.
    fetch.mockResponseOnce(JSON.stringify({}), { status: 500 });

    // We expect the service to throw an error.
    await expect(fetchAllPosts()).rejects.toThrow();
  });

  it("throws an error when the fetchPost response is not ok", async () => {
    const mockPostID = 1;
    fetch.mockResponseOnce(JSON.stringify({}), { status: 500 });

    await expect(fetchPost(mockPostID)).rejects.toThrow();
  });

  it("throws an error when the createPost response is not ok", async () => {
    const mockData = { title: "Test Post", body: "Case" };
    fetch.mockResponseOnce(JSON.stringify({}), { status: 500 });

    await expect(createPost(mockData)).rejects.toThrow();
  });

  it("throws an error when the updatePost response is not ok", async () => {
    const mockPostID = 1;
    const mockData = { id: mockPostID, title: "Test Post", body: "Case" };

    fetch.mockResponseOnce(JSON.stringify({}), { status: 500 });

    await expect(updatePost(mockPostID, mockData)).rejects.toThrow();
  });

  it("throws an error when the deletePost response is not ok", async () => {
    const mockPostID = 1;
    fetch.mockResponseOnce(JSON.stringify({}), { status: 500 });

    await expect(deletePost(mockPostID)).rejects.toThrow();
  });

  // Delete throws an error if the response is not ok and not 204
  it("throws an error when the deletePost response is 500", async () => {
    const mockPostID = 1;
    fetch.mockResponseOnce(JSON.stringify({}), { status: 500 });

    await expect(deletePost(mockPostID)).rejects.toThrow();
  });
});
