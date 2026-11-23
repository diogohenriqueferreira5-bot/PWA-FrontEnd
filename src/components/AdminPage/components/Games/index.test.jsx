import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, beforeEach, vi } from "vitest";
import * as hookGet from "../../hooks/useGetData";
import * as hookPost from "../../hooks/usePostData";
import { TabContext } from "../../contexts";
import Games from ".";

describe("Games", () => {
  let setGamesMock;
  let postDataMock;

  beforeEach(() => {
    // Mock do useGetData
    vi.spyOn(hookGet, "useGetData").mockReturnValue({
      data: {
        data: [],
      },
      isLoading: false,
      isError: false,
      load: vi.fn(),
    });

    setGamesMock = vi.fn();
    postDataMock = vi.fn(() => Promise.resolve());

    // Mock do usePostData
    vi.spyOn(hookPost, "usePostData").mockReturnValue({
      postData: postDataMock,
      isLoading: false,
    });
  });

  // Provider com o valor real que o componente espera
  const renderComponent = (component) => {
    return render(
      <TabContext.Provider value={{ setGames: setGamesMock }}>
        {component}
      </TabContext.Provider>
    );
  };

  it("renders the component", () => {
    const { container } = renderComponent(<Games />);
    expect(container).toMatchSnapshot();
  });

  describe("when the data has games", () => {
    beforeEach(() => {
      vi.spyOn(hookGet, "useGetData").mockReturnValue({
        data: {
          data: [
            {
              id: 1,
              date: "22/10/2022",
              name: "Name",
              image: "url",
              team: {
                visitor: "visitor",
                home: "home",
              },
            },
          ],
        },
        isLoading: false,
        isError: false,
        load: vi.fn(),
      });
    });

    it("should call the setGames", () => {
      renderComponent(<Games />);
      expect(setGamesMock).toHaveBeenCalled();
    });
  });

  describe("when is loading games", () => {
    beforeEach(() => {
      vi.spyOn(hookGet, "useGetData").mockReturnValue({
        data: { data: [] },
        isLoading: true,
        isError: false,
        load: vi.fn(),
      });
    });

    it("renders the component with loading", () => {
      renderComponent(<Games />);
      expect(screen.getByText("Is Loading")).toBeInTheDocument();
    });
  });

  describe("when is happens an error", () => {
    beforeEach(() => {
      vi.spyOn(hookGet, "useGetData").mockReturnValue({
        data: { data: [] },
        isLoading: false,
        isError: true,
        load: vi.fn(),
      });
    });

    it("renders the component with error", () => {
      renderComponent(<Games />);
      expect(screen.getByText("UPPSSSS")).toBeInTheDocument();
    });
  });

  describe("when is posting", () => {
    beforeEach(() => {
      vi.spyOn(hookPost, "usePostData").mockReturnValue({
        postData: postDataMock,
        isLoading: true,
      });
    });

    it("renders the component with loading", () => {
      renderComponent(<Games />);
      // No teu componente aparece " is Loading " (com espaços)
      expect(screen.getByText(/is Loading/i)).toBeInTheDocument();
    });
  });

  describe("when is fill the all inputs", () => {
    it("renders the component with inputs filled", async () => {
      renderComponent(<Games />);

      const nameInput = screen.getByLabelText(/Name/i);
      await userEvent.type(nameInput, "Game Porto");
      expect(nameInput).toHaveValue("Game Porto");

      const dateInput = screen.getByTestId("date");
      await userEvent.clear(dateInput);
      await userEvent.type(dateInput, "2020-01-02");
      expect(dateInput).toHaveValue("2020-01-02");

      const imageInput = screen.getByLabelText(/Image/i);
      await userEvent.type(imageInput, "url");
      expect(imageInput).toHaveValue("url");

      const homeInput = screen.getByLabelText(/Home team/i);
      await userEvent.type(homeInput, "home");
      expect(homeInput).toHaveValue("home");

      const visitorInput = screen.getByLabelText(/Visitor team/i);
      await userEvent.type(visitorInput, "Porto");
      expect(visitorInput).toHaveValue("Porto");
    });

    it("should call add data with correct values", async () => {
      renderComponent(<Games />);

      await userEvent.type(screen.getByLabelText(/Name/i), "Game Porto");
      await userEvent.clear(screen.getByTestId("date"));
      await userEvent.type(screen.getByTestId("date"), "2020-01-02");
      await userEvent.type(screen.getByLabelText(/Image/i), "url");
      await userEvent.type(screen.getByLabelText(/Home team/i), "home");
      await userEvent.type(screen.getByLabelText(/Visitor team/i), "Porto");

      await userEvent.click(screen.getByTestId("submitButton"));

      await waitFor(() => {
        expect(postDataMock).toHaveBeenCalled();
        expect(postDataMock).toHaveBeenCalledWith(
          expect.objectContaining({
            name: "Game Porto",
            date: "2020-01-02",
            image: "url",
            team: {
              home: "home",
              visitor: "Porto",
            },
          })
        );
      });
    });
  });
});