/*

This repo looks into fetch and axios + differences in their responses

*/

import { useState } from "react"
import axios from "axios"
import "./App.css"

function App() {
	const url = "https://randomuser.me/api/"

	const [isLoading, setIsLoading] = useState(false)
	const [error, setError] = useState()
	const [user, setUser] = useState()

	const resetState = () => {
		setIsLoading(true)
		setError()
		setUser()
	}

	const fetchUserWithFetch = () => {
		resetState()
		fetch(url)
			.then((response) => {
				console.log("Fetch Response", response)
				return response.json()
			})
			.then((data) => {
				setUser(data.results[0])
			})
			.catch((e) => {
				console.log(e)
				setError(e)
			})
			.finally(() => {
				setIsLoading(false)
			})
	}

	const fetchUserWithAxios = () => {
		resetState()
		axios
			.get(url)
			.then((response) => {
				console.log("Axios Response", response)
				setUser(response.data.results[0])
			})
			.catch((e) => {
				console.log(e)
				setError(e)
			})
			.finally(() => {
				setIsLoading(false)
			})
	}

	const capitalizeFirstLetter = (string) => {
		return string.charAt(0).toUpperCase() + string.slice(1)
	}

	return (
		<div className="container py-3">
			<input
				className="btn btn-primary mb-3 me-3"
				type="button"
				value="Generate a user using Fetch"
				onClick={() => fetchUserWithFetch()}
			></input>
			<input
				className="btn btn-primary mb-3"
				type="button"
				value="Generate a user using Axios"
				onClick={() => fetchUserWithAxios()}
			></input>
			{isLoading ? (
				<div className="text-muted">
					Generating a user, please wait.
				</div>
			) : (
				user && (
					<div>
						<img
							alt="user"
							className="d-block mb-3"
							src={user.picture.large}
						></img>
						<div className="mb-2">
							<span className="text-muted me-2">Name:</span>
							<span>
								{user.name.first + " " + user.name.last}
							</span>
						</div>
						<div className="mb-2">
							<span className="text-muted me-2">Gender:</span>
							<span>{capitalizeFirstLetter(user.gender)}</span>
						</div>
						<div className="mb-2">
							<span className="text-muted me-2">Age:</span>
							<span>{user.dob.age}</span>
						</div>
						<div className="mb-2">
							<span className="text-muted me-2">
								Nationality:
							</span>
							<span>{user.nat}</span>
						</div>
					</div>
				)
			)}
			{error && (
				<div className="alert alert-danger">
					Looks like something went wrong. Try again.
				</div>
			)}
		</div>
	)
}

export default App
