import "./App.css"

import {
	BrowserRouter as Router,
	Switch,
	Route,
	Link,
	useParams,
} from "react-router-dom"

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
				<Switch>
					<Route path="/:id">
						<Child />
					</Route>
				</Switch>
			</Router>
		</div>
	)
}

function Child() {
	let { id } = useParams()
	return <div className="params">ID: {id}</div>
}

export default App
