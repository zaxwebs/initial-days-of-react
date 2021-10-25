import "./App.css"

import {
	BrowserRouter as Router,
	Switch,
	Route,
	Link,
	useParams,
	useRouteMatch,
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
					<Link className="nav-item" to="/topics">
						Topics
					</Link>
				</nav>
				<Switch>
					<Route path="/topics">
						<Topics />
					</Route>
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

function Topics() {
	let { path, url } = useRouteMatch()
	return (
		<Switch>
			<Route exact path={path}>
				<h3>Please select a topic.</h3>
				<ul>
					<li>
						<Link to={`${url}/rendering`}>
							Rendering with React
						</Link>
					</li>
					<li>
						<Link to={`${url}/components`}>Components</Link>
					</li>
					<li>
						<Link to={`${url}/props-v-state`}>Props v. State</Link>
					</li>
				</ul>
			</Route>
			<Route path={`${path}/:id`}>
				<Child />
			</Route>
		</Switch>
	)
}

export default App
