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

	const formik = useFormik({ initialValues, validate, onSubmit })

	return (
		<div className="container py-3">
			<form className="col-3" onSubmit={formik.handleSubmit}>
				<div className="mb-2">
					<label htmlFor="email">Email Address</label>
					<input
						className="form-control"
						id="name"
						name="name"
						type="name"
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						value={formik.values.name}
					/>
					{formik.touched.name && formik.errors.name && (
						<small className="d-block text-danger">
							{formik.errors.name}
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
						onChange={formik.handleChange}
						onBlur={formik.handleBlur}
						value={formik.values.email}
					/>
					{formik.touched.email && formik.errors.email && (
						<small className="d-block text-danger">
							{formik.errors.email}
						</small>
					)}
				</div>

				<button className="btn btn-primary" type="submit">
					Subscribe to Newsletter
				</button>
			</form>
		</div>
	)
}

export default App
