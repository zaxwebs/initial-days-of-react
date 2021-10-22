import "./App.css"
import { useState } from "react"

function App() {
	const [errors, setErrors] = useState({})

	const handleSubmit = (e) => {
		e.preventDefault()
		const errors = {}
		const { name } = e.target

		if (!name.value) {
			const error = "Name is required."
			errors.name ? errors.name.push(error) : (errors.name = [error])
		} else {
			const nameRegex = /^[A-Za-z]+$/

			if (!nameRegex.test(name.value)) {
				const error = "Name can only contain alphabets."
				errors.name ? errors.name.push(error) : (errors.name = [error])
			}
		}

		setErrors(errors)
	}

	return (
		<div className="container py-3">
			<form onSubmit={handleSubmit}>
				<div className="mb-3">
					<label>Name</label>
					<input
						type="text"
						className="form-control"
						name="name"
					></input>
					{errors.name &&
						errors.name.map((error, index) => {
							return (
								<small
									key={index}
									className="d-block text-danger"
								>
									{error}
								</small>
							)
						})}
				</div>
				<button className="btn btn-primary">Sign Up</button>
			</form>
		</div>
	)
}

export default App
