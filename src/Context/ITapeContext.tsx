import {Tape} from '../Model/Tape'

export interface ITapeContext {
    tapeList : Array<Tape>;
    setTapeList: React.Dispatch<React.SetStateAction<Tape[]>>
}