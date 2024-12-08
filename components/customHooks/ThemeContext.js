import React, {createContext, useState} from "react"


export const ThemeContext = createContext()

export const ThemeProvider = ({children})=>{
    const [theme, setTheme] = useState('white')

    const toggleTheme = ()=>{
        setTheme(theme === 'white' ? 'rgb(39, 39, 39)' : 'white')
    }

    return(
        <ThemeContext.Provider value={{theme, toggleTheme}}>
            {children}
        </ThemeContext.Provider>
    )
}
