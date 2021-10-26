import { useState, createContext } from "react"

export const ThemeContext = createContext()

export const ThemeProvider = (props) => {
	const [isDark, setIsDark] = useState(false)
	const toggleTheme = () => {
		setIsDark(!isDark)
	}
	return (
		<ThemeContext.Provider value={{ isDark, toggleTheme }}>
			{props.children}
		</ThemeContext.Provider>
	)
}
