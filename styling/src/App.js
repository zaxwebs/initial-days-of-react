/*

The purpose of this repo is to understand dynamic classes as well as learn about styled-components.

Read:
https://blog.logrocket.com/benefits-using-styled-components-react/
https://getstream.io/blog/styled-components-vs-css-stylesheets/

*/

import "./App.css"
import { useState } from "react"
import styled from "styled-components"

function App() {
	const [buttonToggled, setButtonToggled] = useState(false)
	const [button2Toggled, setButton2Toggled] = useState(false)

	const Button = styled.button`
		background: #167d7f;
		padding: 0.5rem 1rem;
		border: none;
		color: #ffffff;
		border-radius: 2px;

		&:hover {
			background: #29a0b1;
		}
	`

	return (
		<div className="container py-3">
			<button
				className={
					"btn " +
					(buttonToggled ? "btn-primary" : "btn-secondary") +
					" me-3"
				}
				onClick={() => {
					setButtonToggled(!buttonToggled)
				}}
			>
				Toggle Me
			</button>

			<button
				className={`btn ${
					button2Toggled ? "btn-primary" : "btn-secondary"
				} me-3`}
				onClick={() => {
					setButton2Toggled(!button2Toggled)
				}}
			>
				Toggle Me
			</button>

			<Button className="me-3">Styled Button A</Button>
			<Button className="me-3">Styled Button B</Button>
		</div>
	)
}

export default App
