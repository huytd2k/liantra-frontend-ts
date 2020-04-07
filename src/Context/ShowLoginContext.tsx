import React, { createContext, useContext , PropsWithChildren, ReactNode, useState} from 'react';
import {ILoginContext} from './ILoginContext'
const ShowLoginContext = createContext({} as ILoginContext);



export const ShowLoginProvider = ( props: PropsWithChildren<ReactNode> ) => {
    const [showLogin, setShowLogin] = useState(false);
    const value = {showLogin, setShowLogin}
    return <ShowLoginContext.Provider value={value}>
        {props.children}
    </ShowLoginContext.Provider>
}

export const useShowLogin = () => useContext(ShowLoginContext)