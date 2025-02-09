import React from "react";
import { useState } from 'react';
import { Link } from "react-router-dom";
import Dropdown from 'react-bootstrap/Dropdown';
import DropdownButton from 'react-bootstrap/DropdownButton';
import Button from 'react-bootstrap/Button';
import Card from 'react-bootstrap/Card';
import Modal from 'react-bootstrap/Modal';
import "bootstrap/dist/css/bootstrap.min.css";

function Task({ taskId, onDelete }) {
    const [isChecked, setIsChecked] = useState(false);
    const [label, setLabel] = useState();
    const [progress, setProgress] = useState("Not started");
    const [type, setType] = useState("Type");
    const [deadline, setDeadline] = useState();
  
    return (
      <div className="flex items-center justify-center space-x-4 border-2 p-2 m-4 object-contain w-[700px] rounded-sm">
        <input 
          type="checkbox" 
          onChange={(e) => setIsChecked(e.target.checked)}
          checked={isChecked}
          className="h-8"/>
        <label>
          <input 
            type="text" 
            onChange={(e) => setLabel(e.target.value)} 
            value={label}
            className="border-2 border-gray-300 rounded-lg w-40 h-8 resize-x focus:outline-none focus:ring-2 focus:ring-blue-500 pl-2"></input>
        </label>
  
        <DropdownButton id="progress" title={progress} size="sm" variant="secondary">
        <Dropdown.Item onClick={() => setProgress("Not started")}>Not started</Dropdown.Item>
        <Dropdown.Item onClick={() => setProgress("In progress")}>In progress</Dropdown.Item>
        <Dropdown.Item onClick={() => { setProgress("Done"); setIsChecked(true) }}>Done</Dropdown.Item>
        </DropdownButton>
  
        <DropdownButton id="type" title={type} size="sm" variant="secondary">
        <Dropdown.Item onClick={() => setType("Assignment")}>Assignment</Dropdown.Item>
        <Dropdown.Item onClick={() => setType("Assessment")}>Assessment</Dropdown.Item>
        </DropdownButton>
  
        <label>
          <input 
            type="date" 
            onChange={(e) => setDeadline(e.target.value)} 
            value={deadline}
            className="border-2 border-gray-300 rounded-lg w-40 h-8 resize-x focus:outline-none focus:ring-2 focus:ring-blue-500 pl-2">
          </input>
        </label>
        
        <button 
          className="flex border-2 rounded-md p-2 g-white hover:bg-red-600 h-6 items-center"
          onClick={() => onDelete(taskId)}>X</button>
      </div>
    );
  }
  
function List() {
    const [tasks, setTasks] = useState([]);
  
    function addTask() {
      setTasks([...tasks, { id: tasks.length + 1 } ]);
    }
  
    function deleteTask(taskId){
      setTasks(tasks.filter((task) => task.id !== taskId));
    } 
  
    return (
      <>
        <div className="flex items-center justify-center">
          <div className="flex flex-col items-center justify-center m-10 border-2 rounded-md w-[800px] object-contain">
            Tasks:
            {tasks.map(task => (
              <Task key={task.id} taskId={task.id} onDelete={deleteTask}/>
            ))}
            <button className="flex border-2 rounded-md p-2 text-sm m-4" onClick={addTask}>
                + New task
            </button>
          </div>
        </div>
      </>
    );
}

function Course() {
  const [name, setName] = useState("New course");
  const [code, setCode] = useState();
  const [prof, setProf] = useState();
  const [showList, setShowList] = useState(false);

  const handleClose = () => setShowList(false);
  const handleShow = () => setShowList(true);

  return (
    <>
      <div
        onClick={handleShow} 
        style={{ cursor: "pointer", color: "blue", textDecoration: "underline" }}>

        <Card style={{ width: '18rem' }}>
            <Card.Body>
            {code && (
                <>
                <Card.Header>{code}</Card.Header>
                <br></br>
                </>
            )}
            <Card.Title>{name}</Card.Title>
            {prof && (
                <Card.Subtitle className="mb-2 text-muted">{prof}</Card.Subtitle>
                
            )}
            </Card.Body>
        </Card>
      </div>

      <Modal show={showList} onHide={handleClose} fullscreen={true} scrollable={true}>
        <Modal.Header closeButton>
          <Modal.Title>
            <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="form-control border-2 border-gray-300 rounded-lg w-40 h-8 resize-x focus:outline-none focus:ring-2 focus:ring-blue-500 pl-2 ml-2 "
                style={{ width: '300px' }}
            />
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
            <div className="mb-3 d-flex align-items-center">
                <label>Course Code: </label>
                <input
                    type="text"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    className="form-control border-2 border-gray-300 rounded-lg w-40 h-8 resize-x focus:outline-none focus:ring-2 focus:ring-blue-500 pl-2 ml-2 "
                    style={{ width: '100px' }}
                />
            </div>

            <div className="mb-3 d-flex align-items-center">
                <label>Prof: </label>
                <input
                    type="text"
                    value={prof}
                    onChange={(e) => setProf(e.target.value)}
                    className="form-control border-2 border-gray-300 rounded-lg w-40 h-8 resize-x focus:outline-none focus:ring-2 focus:ring-blue-500 pl-2 ml-2 "
                    style={{ width: '100px' }}
                />
            </div>
          <List />
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Close
          </Button>
          <Button variant="primary" onClick={handleClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
}

export default function Home() {
  const [courses, setCourses] = useState([]);

  const addCourse = () => {
    setCourses([...courses, { id: courses.length + 1 }]);
  };
  
  const deleteCourse = (courseId) => {
    setCourses(courses.filter((course) => course.id !== courseId));
  };

  return (
    <>
      <h1 className="text-center text-3xl mt-10">Digital Planner</h1>
      <div className="flex items-center justify-center">
        <div className="flex flex-col items-center justify-center m-10 border-2 rounded-md w-[800px] object-contain">
          {courses.map(course => (
                <Course key={course.id} courseId={course.id} onDelete={deleteCourse}/>
            ))}
          <button className="flex border-2 rounded-md p-2 text-sm m-4" onClick={addCourse}>
              + New course
          </button>
        </div>
      </div>
    </>
  );
}