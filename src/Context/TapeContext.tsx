import React, { createContext, PropsWithChildren, ReactNode, useState } from 'react';
import { Tape } from '../Model/Tape';
import { ITapeContext } from './ITapeContext';


export const TapeContext = createContext({} as ITapeContext)

export const TapeProvider = (props: PropsWithChildren<ReactNode>) => {
    const [tapeList, setTapeList] = useState([] as Array<Tape>);
    const value = { tapeList, setTapeList }
    return (
        <TapeContext.Provider value={value}>
            {props.children}
        </TapeContext.Provider>
    )
}

export const useTape = () => React.useContext(TapeContext);