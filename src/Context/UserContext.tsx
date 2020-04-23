
import React, { createContext, PropsWithChildren, ReactNode, useState, useEffect } from 'react';
import {useCookies} from 'react-cookie';
export interface UserContextState {
    isLogged? : boolean;
    username?: string;
    userId?: number;
}
export interface UserContext {
    user : UserContextState;
    setUser: React.Dispatch<React.SetStateAction<UserContextState>>
}
export const UserContext = createContext({} as UserContext)

export const UserProvider = (props: PropsWithChildren<ReactNode>) => {
    const [cookies] = useCookies();
    const [user, setUser] = useState<UserContextState>(
        cookies.username ?
        {
        isLogged: true,
        username: cookies.username,
        userId: cookies.userId,
    } : {
        isLogged: false,
    });
    const value = { user, setUser }
    return (
        <UserContext.Provider value={value}>
            {props.children}
        </UserContext.Provider>
    )
}

export const useUser = () => React.useContext(UserContext);