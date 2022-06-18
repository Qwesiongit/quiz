import React,{useReducer} from 'react';
import userContext from './../context/userContext';
import userReducer from './../store/userReducer';
import { initialState } from '../initialState/initialState';


export default function Myprovider({children}) {
    const [state,dispatch]=useReducer(userReducer,initialState);
    return (
        <userContext.Provider value={[state,dispatch]}>
        <div>
            {children}
        </div>
        </userContext.Provider>
    )
}

