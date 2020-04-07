import React, {createContext, useState, ReactNode, PropsWithChildren} from 'react'
import { ITapeContext } from './ITapeContext';
import { Tape } from '../Model/Tape';


export const TapeContext = createContext({} as ITapeContext)

export const TapeProvider = (props : PropsWithChildren<ReactNode>) => {
    const [tapeList, setTapeList] = useState([] as Array<Tape>) ;
    const value = {tapeList, setTapeList}
    return(
        <TapeContext.Provider value={value}>
            {props.children}
        </TapeContext.Provider>
    )
}

export const useTape = () => React.useContext(TapeContext);