import React, { Component } from 'react';
  import Row from 'react-bootstrap/Row';
  import Col from 'react-bootstrap/Col';
  import List from './list/List';
  import CreateTask from './create_tasks/CreateTasks';
  import Button from 'react-bootstrap/Button';
  
  class Tasks extends Component {

  constructor(props) {
    super(props);
    this.state = {
      tasks: []
    };
    this.loadTasks = this.loadTasks.bind(this);
  }
  
  async loadTasks() {
    let response = await fetch(`https://my-tasks-api01.herokuapp.com/tasks`);
    const tasks = await response.json();
    this.setState({ tasks: tasks });
  }
  
  componentDidMount() {
    this.loadTasks();
  }

  async deleteAllTask() {
    if (window.confirm(`Are you sure you want to delete all tasks with done ?`)) {
      await fetch(`https://my-tasks-api01.herokuapp.com/delete_all`, {method: 'DELETE'});
      this.loadTasks();
    }
  }

  render() {
    return (
      <Row>
        <Col xs={{ span: 8, offset: 2 }} className="tasks_list">
          <p className="title">To-do</p>
            {/* <List tasks={[{'title': 'Criar Header Criar Header Criar Header', 'done': false}, {'title': 'Criar footer', 'done': false}, {'title': 'Criar footer', 'done': false}]}/> */}
            {/* <List tasks={this.state.tasks.filter((task) => task.done != true)}/> */}
            <List loadTasks={this.loadTasks} tasks={this.state.tasks.filter((task) => task.done !== true)}/>
            <CreateTask loadTasks={this.loadTasks}/>
        </Col>
        <Col xs={{ span: 8, offset: 2 }} className="tasks_list">
          <p className="title">Done</p>
          {/* <List tasks={[{'title': 'Criar Header Criar Header Criar Header', 'done': false}, {'title': 'Criar footer', 'done': true}, {'title': 'Criar footer', 'done': false}]}/> */}
          {/* <List tasks={this.state.tasks.filter((task) => task.done == true)}/> */}
          <List loadTasks={this.loadTasks} tasks={this.state.tasks.filter((task) => task.done === true)}/>
          <Button variant="red" className="float-right remove_tasks_btn" onClick={() => this.deleteAllTask()}>Remove all tasks</Button>
        </Col>
      </Row>
    );
  }
  };
  
  export default Tasks;
