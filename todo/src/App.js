import "./App.css"
import { useState } from "react"

function App() {
	const initialTasks = [
		{
			title: "Learn the basics of React",
			completed: true,
		},
		{
			title: "Learn more about React",
			completed: false,
		},
	]

	const skeletonTask = {
		title: "",
		completed: false,
	}

	const [tasks, setTasks] = useState([...initialTasks])

	const handleSubmit = (e) => {
		e.preventDefault()
		e.target.title.value &&
			setTasks([
				...tasks,
				{ ...skeletonTask, title: e.target.title.value },
			])
		//reset value
		e.target.title.value = ""
	}

	const handleDelete = (index) => {
		let newTasks = [...tasks]
		newTasks.splice(index, 1)
		setTasks(newTasks)
	}

	const toggleComplete = (index) => {
		let newTasks = [...tasks]
		let newTask = { ...tasks[index], completed: !tasks[index].completed }
		newTasks[index] = newTask
		setTasks(newTasks)
	}

	return (
		<div className="container py-3">
			<pre>
				The objective of this repo is to understand state and events.
				Dividing into components will be covered later.
			</pre>
			<form className="mb-3" onSubmit={handleSubmit}>
				<div className="row">
					<div className="col-md-8">
						<h3 className="mb-3">Create a Task</h3>
						<input
							type="text"
							className="form-control"
							name="title"
						></input>
					</div>
					<div className="col-md-4 d-flex align-items-end">
						<button type="submit" className="btn btn-primary w-100">
							Add Task
						</button>
					</div>
				</div>
			</form>
			<h3 className="mb-3">Your Tasks</h3>
			{!tasks.length && (
				<div className="text-muted">
					You don't have any tasks at the moment.
				</div>
			)}

			<ul className="list-group">
				{tasks.map((task, index) => (
					<li key={index} className="list-group-item">
						<div className="task d-flex">
							<div className="flex-grow-1">
								<input
									className="form-check-input me-2"
									type="checkbox"
									id="flexCheckChecked"
									checked={task.completed}
									onClick={() => {
										toggleComplete(index)
									}}
								></input>
								{task.title}
							</div>
							<div className="">
								<button
									type="submit"
									className="btn btn-secondary btn-sm"
									onClick={() => handleDelete(index)}
								>
									Delete Task
								</button>
							</div>
						</div>
					</li>
				))}
			</ul>
		</div>
	)
}

export default App
