/*

The purpose of this repo is to try validation using Formik

*/

import "./App.css"
import { useFormik } from "formik"

function App() {
	const initialValues = {
		email: "",
		name: "",
	}

	const onSubmit = (values) => {
		alert(JSON.stringify(values, null, 2))
	}

	const validate = (values) => {
		const errors = {}

		if (!values.name) {
			errors.name = "Required"
		} else if (values.name.length > 25) {
			errors.name = "Must be 25 characters or less"
		}

		if (!values.email) {
			errors.email = "Required"
		} else if (
			!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)
		) {
			errors.email = "Invalid email address"
		}

		return errors
	}

	const formA = useFormik({ initialValues, validate, onSubmit })

	return (
		<div className="container py-3">
			<div className="row">
				<form className="col-md-6" onSubmit={formA.handleSubmit}>
					<h3>Form A</h3>
					<div className="mb-2">
						<label htmlFor="email">Name</label>
						<input
							className="form-control"
							id="name"
							name="name"
							type="name"
							onChange={formA.handleChange}
							onBlur={formA.handleBlur}
							value={formA.values.name}
						/>
						{formA.touched.name && formA.errors.name && (
							<small className="d-block text-danger">
								{formA.errors.name}
							</small>
						)}
					</div>
					<div className="mb-2">
						<label htmlFor="email">Email Address</label>
						<input
							className="form-control"
							id="email"
							name="email"
							type="text"
							onChange={formA.handleChange}
							onBlur={formA.handleBlur}
							value={formA.values.email}
						/>
						{formA.touched.email && formA.errors.email && (
							<small className="d-block text-danger">
								{formA.errors.email}
							</small>
						)}
					</div>

					<button className="btn btn-primary" type="submit">
						Subscribe to Newsletter
					</button>
				</form>
			</div>
		</div>
	)
}

export default App
