import React, { useMemo, useState } from "react";
import { TabContext } from "./TabContext";

export const TabProvider = ({ children }) => {
    const [games, setGames] = useState([]);

    const value = useMemo(
        () => ({ setGames, countGames: games.length }),
        [games]
    );

    return (
        <TabContext.Provider value={value}>
            {children}
        </TabContext.Provider>
    );
};