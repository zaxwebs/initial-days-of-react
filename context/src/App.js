import { useContext } from "react"
import "./App.css"
import { ThemeContext } from "./ThemeContext"

function App() {
	const theme = useContext(ThemeContext)
	return (
		<div className={"App " + (theme.isDark ? "dark" : undefined)}>
			<div>{theme.isDark ? "Dark Mode" : "Light  Mode"}</div>
			<button onClick={theme.toggleTheme}>Toggle Theme</button>
		</div>
	)
}

export default App
