
import React from 'react';
import './TaskList.css';

class TaskList extends React.Component {
    constructor (props) {
        super(props);

        this.displayTask = this.displayTask.bind(this);
        this.completeTask = this.completeTask.bind(this);
    };

    displayTask(task) {
        return (
            <li
            className={`font-weight-bold ${task.completed ? 'strikethrough' : '' }`}
            key={`${task.id}`}
            onClick={this.completeTask}
            title="Click to complete"
            id={task.id}
            >
                {task.title}
            </li>
        );
    };

    updateStatus(task) {
        return fetch(`https:/jsonplaceholder.tpicode.com/todos/${task.id}`, {
            method: 'PUT',
            body: JSON.stringify({ completed: true }),
            headers: { "Content-type": "application/json; charset=UTF-8" }
        }).then(() => {
            task.classList.add('strikethrough');
        }).catch(console.error)
    };

    completeTask(event) {
        this.updateStatus(event.currentTarget);
    };

    render () {
        return (
            <div
             className="card card-body bg-info mb-2">
                <ul
                    className="task-list text-white">
                    { this.props.items.length ? this.props.items.map(this.displayTask) : <label className="font-weight-bold"> No tasks yet. </label> }
                </ul>
            </div>
        );
    }
}

export default TaskList;