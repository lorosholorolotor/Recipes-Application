import { createContext, useRef} from "react";
export const InputContext = createContext();

export const InputProvider = ({children}) => {
    const inputValue = useRef(null);

    return(
        <InputContext.Provider value={{inputValue}}>
            {children}
        </InputContext.Provider>
    )
}