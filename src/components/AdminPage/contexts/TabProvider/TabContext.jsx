import React from "react";

const context = {
    setGames: () => {},
    countGames: 0,
};

export const TabContext = React.createContext(context);