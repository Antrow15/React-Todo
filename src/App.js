import React, { useState } from "react";
import { Button, Modal, Form, Card } from "react-bootstrap";

function App() {
  const [todos, setTodos] = useState([]);
  const [show, setShow] = useState(false);
  const [currentTodo, setCurrentTodo] = useState({ name: "", tasks: [] });
  const [isEditing, setIsEditing] = useState(null);

  const handleClose = () => {
    setCurrentTodo({ name: "", tasks: [] });
    setShow(false);
  };

  const handleShow = () => setShow(true);

  const handleSave = () => {
    if (isEditing !== null) {
      const updatedTodos = todos.map((todo, index) =>
        index === isEditing ? currentTodo : todo
      );
      setTodos(updatedTodos);
      setIsEditing(null);
    } else {
      setTodos([...todos, currentTodo]);
    }
    handleClose();
  };

  const handleEdit = (index) => {
    setCurrentTodo(todos[index]);
    setIsEditing(index);
    setShow(true);
  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setCurrentTodo({ ...currentTodo, [name]: value });
  };

  const handleTaskChange = (taskIndex) => {
    const updatedTasks = currentTodo.tasks.map((task, index) =>
      index === taskIndex ? { ...task, completed: !task.completed } : task
    );
    setCurrentTodo({ ...currentTodo, tasks: updatedTasks });
  };

  const addTask = () => {
    setCurrentTodo({
      ...currentTodo,
      tasks: [...currentTodo.tasks, { title: "", completed: false }],
    });
  };

  const handleTaskTitleChange = (taskIndex, value) => {
    const updatedTasks = currentTodo.tasks.map((task, index) =>
      index === taskIndex ? { ...task, title: value } : task
    );
    setCurrentTodo({ ...currentTodo, tasks: updatedTasks });
  };

  return (
    <div className="App">
      <div className="container mt-5">
        <h1>To-Do List</h1>
        <Button variant="primary" onClick={handleShow}>
          Add To-Do
        </Button>

        <div className="mt-3">
          {todos.map((todo, index) => (
            <Card key={index} className="mb-3">
              <Card.Body>
                <Card.Title>{todo.name}</Card.Title>
                <ul>
                  {todo.tasks.map((task, taskIndex) => (
                    <li key={taskIndex}>
                      <input
                        type="checkbox"
                        checked={task.completed}
                        onChange={() => handleTaskChange(taskIndex)}
                      />{" "}
                      {task.title}
                    </li>
                  ))}
                </ul>
                <Button variant="secondary" onClick={() => handleEdit(index)}>
                  Edit
                </Button>
              </Card.Body>
            </Card>
          ))}
        </div>

        {/* Modal for adding/editing todos */}
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>{isEditing !== null ? "Edit To-Do" : "Add To-Do"}</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group controlId="todoName">
                <Form.Label>To-Do Name</Form.Label>
                <Form.Control
                  type="text"
                  name="name"
                  value={currentTodo.name}
                  onChange={handleChange}
                  placeholder="Enter To-Do Name"
                />
              </Form.Group>
              <Form.Group>
                <Form.Label>Tasks</Form.Label>
                {currentTodo.tasks.map((task, index) => (
                  <div key={index} className="mb-2">
                    <Form.Control
                      type="text"
                      value={task.title}
                      onChange={(e) =>
                        handleTaskTitleChange(index, e.target.value)
                      }
                      placeholder={`Task ${index + 1}`}
                    />
                    <Form.Check
                      type="checkbox"
                      label="Completed"
                      checked={task.completed}
                      onChange={() => handleTaskChange(index)}
                    />
                  </div>
                ))}
                <Button variant="link" onClick={addTask}>
                  + Add Task
                </Button>
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={handleSave}>
              Save
            </Button>
          </Modal.Footer>
        </Modal>
      </div>
    </div>
  );
}

export default App;
