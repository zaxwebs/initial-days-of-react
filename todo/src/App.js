import "./App.css"
import { useState } from "react"

function App() {
	const skeletonTask = {
		title: "",
		completed: false,
	}

	const initialTasks = [
		{
			...skeletonTask,
			title: "Update apps",
			completed: true,
		},
		{
			...skeletonTask,
			title: "Learn the basics of React",
			completed: true,
		},
		{
			...skeletonTask,
			title: "Learn more about React",
			completed: false,
		},
		{
			...skeletonTask,
			title: "Read about Apache",
			completed: false,
		},
	]

	const [tasks, setTasks] = useState([...initialTasks])
	const [filter, setFilter] = useState("all")
	const [sort, setSort] = useState("original")
	const [editing, setEditing] = useState(-1)
	const [newTitle, setNewTitle] = useState("")

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

	const getIndexedTasks = () => {
		//this is an implication of using index as key
		return tasks.map((task, index) => ({
			...task,
			originalIndex: index,
		}))
	}

	const taskFilter = () => {
		return (task) => {
			switch (filter) {
				case "pending":
					return !task.completed
				case "completed":
					return task.completed
				default:
					return task
			}
		}
	}

	const taskSort = () => {
		return (x, y) => {
			switch (sort) {
				case "pending":
					return x.completed === y.completed
						? 0
						: x.completed
						? 1
						: -1
				case "completed":
					return x.completed === y.completed
						? 0
						: x.completed
						? -1
						: 1
				default:
					return
			}
		}
	}

	const resetEditing = () => {
		setEditing(-1)
		setNewTitle("")
	}

	const toggleEditing = (index) => {
		if (index !== editing) {
			setEditing(index)
			setNewTitle(tasks[index].title)
		} else {
			resetEditing()
		}
	}

	const updateTaskTitle = (index) => {
		let newTasks = [...tasks]
		let newTask = { ...tasks[index], title: newTitle }
		newTasks[index] = newTask
		setTasks(newTasks)
		resetEditing()
	}

	return (
		<div className="container py-3">
			<div className="text-muted mb-3">
				The objective of this repo is to understand state and events.
				Dividing into components will be covered later. This is also an
				attempt at understanding the implications of using index as
				keys.
			</div>
			<form onSubmit={handleSubmit}>
				<div className="row">
					<div className="col-md-8 mb-3">
						<h3 className="mb-3">Create a Task</h3>
						<input
							type="text"
							className="form-control"
							name="title"
						></input>
					</div>
					<div className="col-md-4 mb-3 d-flex align-items-end">
						<button
							type="submit"
							className="btn btn-primary col-12"
						>
							Add Task
						</button>
					</div>
				</div>
			</form>
			<h3 className="mb-2">Your Tasks</h3>
			<div className="d-flex justify-content-between flex-wrap">
				<div
					className="btn-group btn-group-sm mb-3"
					role="group"
					aria-label="Basic radio toggle button group"
					onChange={(e) => {
						setFilter(e.target.value)
					}}
				>
					<input
						type="radio"
						className="btn-check"
						name="filter"
						id="filter-all"
						value="all"
						checked={filter === "all"}
						readOnly
					></input>
					<label
						className="btn btn-outline-primary"
						htmlFor="filter-all"
					>
						All
					</label>

					<input
						type="radio"
						className="btn-check"
						name="filter"
						id="filter-pending"
						value="pending"
						checked={filter === "pending"}
						readOnly
					></input>
					<label
						className="btn btn-outline-primary"
						htmlFor="filter-pending"
					>
						Pending
					</label>

					<input
						type="radio"
						className="btn-check"
						name="filter"
						id="filter-completed"
						value="completed"
						checked={filter === "completed"}
						readOnly
					></input>
					<label
						className="btn btn-outline-primary"
						htmlFor="filter-completed"
					>
						Completed
					</label>
				</div>

				<div
					className="btn-group btn-group-sm mb-3"
					role="group"
					aria-label="Basic radio toggle button group"
					onChange={(e) => {
						setSort(e.target.value)
					}}
				>
					<input
						type="radio"
						className="btn-check"
						name="sort"
						id="sort-original"
						value="original"
						checked={sort === "original"}
						readOnly
					></input>
					<label
						className="btn btn-outline-primary"
						htmlFor="sort-original"
					>
						Original
					</label>
					<input
						type="radio"
						className="btn-check"
						name="sort"
						id="sort-pending"
						value="pending"
						checked={sort === "pending"}
						readOnly
					></input>
					<label
						className="btn btn-outline-primary"
						htmlFor="sort-pending"
					>
						Pending
					</label>
					<input
						type="radio"
						className="btn-check"
						name="sort"
						id="sort-completed"
						value="completed"
						checked={sort === "completed"}
						readOnly
					></input>
					<label
						className="btn btn-outline-primary"
						htmlFor="sort-completed"
					>
						Completed
					</label>
				</div>
			</div>

			{!tasks.length && (
				<div className="text-muted">
					You don't have any tasks at the moment.
				</div>
			)}

			<ul className="list-group">
				{getIndexedTasks()
					.filter(taskFilter())
					.sort(taskSort())
					.map((task, index) => (
						<li key={index} className="list-group-item">
							<div className="task d-flex flex-wrap">
								<div className="flex-grow-1">
									<div className="d-flex">
										<input
											className="form-check-input form-check-input-lg me-3"
											type="checkbox"
											id={"task-" + index}
											checked={task.completed}
											readOnly
											onClick={() => {
												toggleComplete(
													task.originalIndex
												)
											}}
										></input>
										{editing !== task.originalIndex ? (
											<div
												className={
													task.completed
														? "text-muted"
														: undefined
												}
											>
												{task.title}
											</div>
										) : (
											<div className="me-3 flex-grow-1">
												<input
													type="text"
													className="form-control"
													value={newTitle}
													onChange={(e) => {
														setNewTitle(
															e.target.value
														)
													}}
													name="title"
												></input>
											</div>
										)}
									</div>
								</div>
								<div className="">
									{editing !== task.originalIndex ? (
										<button
											type="button"
											className="btn btn-secondary btn-sm me-2"
											onClick={() =>
												toggleEditing(
													task.originalIndex
												)
											}
										>
											Edit
										</button>
									) : (
										<>
											<button
												type="button"
												className="btn btn-primary btn-sm me-2"
												onClick={() =>
													updateTaskTitle(
														task.originalIndex
													)
												}
											>
												Update
											</button>
											<button
												type="button"
												className="btn btn-secondary btn-sm me-2"
												onClick={() => resetEditing()}
											>
												Cancel Edit
											</button>
										</>
									)}
									<button
										type="submit"
										className="btn btn-secondary btn-sm"
										onClick={() =>
											handleDelete(task.originalIndex)
										}
									>
										Delete
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
