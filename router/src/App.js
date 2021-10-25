import "./App.css"

import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom"

function App() {
	return (
		<div className="App">
			<Router>
				<nav>
					<Link className="nav-item" to="/">
						Home
					</Link>
					<Link className="nav-item" to="/contact">
						Contact
					</Link>
				</nav>
				<Switch>
					<Route path="/contact">Contact</Route>
					<Route path="/">Home</Route>
				</Switch>
			</Router>
		</div>
	)
}

export default App
