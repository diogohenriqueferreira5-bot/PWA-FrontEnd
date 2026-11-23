import { describe, it, expect, beforeEach } from 'vitest'
import { render, screen } from '@testing-library/react'
import { UsersContext } from '../../contexts/UsersProvider'
import Header from '.'

describe("Header", () => {
  let countUsers;

  beforeEach(() => {
    countUsers = 0;
  });

  const renderComponent = (component, value = { countUsers }) => {
    return render(
      <UsersContext.Provider value={value}>
        {component}
      </UsersContext.Provider>
    );
  };

  it("renders correctly the component", () => {
    const { container } = renderComponent(<Header />);
    expect(container).toMatchSnapshot();
  });

  describe("when count of user is more than 0", () => {
    beforeEach(() => {
      countUsers = 1;
    });

    it("renders the component correctly", () => {
      renderComponent(<Header />, { countUsers });
      expect(screen.getByText(`Users: ${countUsers}`)).toBeInTheDocument();
    });
  });
});