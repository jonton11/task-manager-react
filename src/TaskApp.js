
import React from 'react';
import './App.css';
import TaskList from './TaskList';
import Loader from './Loader';

const userId = 1,
    completed = false;

class TaskApp extends React.Component {
    constructor(props) {
        super(props);

        this.state = { items: [], task: '' };

        this.taskInput = React.createRef();
        this.loaderInstance = React.createRef();

        this.onInputChange = this.onInputChange.bind(this);
        this.addTask = this.addTask.bind(this);
        this.saveTask = this.saveTask.bind(this);
    }

    componentDidMount() {
        this.handleLoader(true);
        this.fetchTasks();
    }
    
    handleLoader(status = false) {
        this.loaderInstance.current.showLoader(status);
    }

    fetchTasks() {
        return fetch(`https://jsonplaceholder.typicode.com/todos?userId=${userId}`)
            .then(response => response.json())
            .then((task) => this.setState({ items: this.state.items.concat(task) }))
            .then(() => {
                this.handleLoader(false)
            })
            .catch(console.error);
    }

    saveTask() {
        return fetch('https://jsonplaceholder.typicode.com/todos', {
            method: 'POST',
            body: JSON.stringify({ userId, title: this.state.task, completed }),
            headers: { "Content-type": "application/json; charset=UTF-8" }
        })
        .then(response => response.json)
        .then(task => this.setState({ items: this.state.items.concat(task) }))
        .then(() => {
            this.handleLoader(false)
        })
        .catch(console.error);
    }

    addTask(event) {
        event.preventDefault();

        this.state.task && this.handleLoader(true) && this.storeTask() && this.setState({ task: '' });

        !this.state.task && alert('Task cannot be empty');

        this.taskInput.current.focus();
    }

    onInputChange(event) { this.setState({ task: event.target.value }) }

    render () {
        return (
            <div className="task-app container-fluid">
                <div className="container p-5">
                    <h1>My tasks</h1>

                    <Loader ref={this.loaderInstance}/>

                    <form className="form-inline mb-5 mt-5" onSubmit={this.addTask}>
                        <input
                            id="task-input"
                            placeholder="Task name"
                            className="form-control"
                            onChange={this.onInputChange}
                            value={this.state.task}
                            autoComplete="off"
                            ref={this.taskInput}
                        />
                        <button className="btn btn-info ml-1 font-weight-bold">Add Task</button>
                    </form>

                    <TaskList items={this.state.items}/>
                </div>
            </div>
        )
    }
}

export default TaskApp;