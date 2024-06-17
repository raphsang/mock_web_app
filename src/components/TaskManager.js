import React, { useState, useEffect, useContext } from 'react';
import apiClient from '../api/Client';
import { AuthContext } from '../contexts/AuthContext';
import './TaskManager.css'; // Import the CSS file

const TaskManager = () => {
  const { user } = useContext(AuthContext);
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');
  const [assignee, setAssignee] = useState('');
  const [users, setUsers] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentTask, setCurrentTask] = useState(null);
  const [completedTasksCount, setCompletedTasksCount] = useState(0); // State to track completed tasks count
  const [inProgressTasksCount, setInProgressTasksCount] = useState(0); // State to track in-progress tasks count

  useEffect(() => {
    const fetchData = async () => {
      const storedTasks = JSON.parse(localStorage.getItem('tasks'));
      const storedUsers = JSON.parse(localStorage.getItem('users'));

      if (storedTasks && storedUsers) {
        setTasks(storedTasks);
        setUsers(storedUsers);
      } else {
        const tasksResponse = await apiClient.get('/todos');
        const usersResponse = await apiClient.get('/users');

        setTasks(tasksResponse.data);
        setUsers(usersResponse.data);

        localStorage.setItem('tasks', JSON.stringify(tasksResponse.data));
        localStorage.setItem('users', JSON.stringify(usersResponse.data));
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    // Calculate completed and in-progress tasks count on tasks change
    const calculateTaskCounts = () => {
      const completedCount = tasks.filter(task => task.completed).length;
      const inProgressCount = tasks.length - completedCount;
      setCompletedTasksCount(completedCount);
      setInProgressTasksCount(inProgressCount);
    };

    calculateTaskCounts();
  }, [tasks]);

  const saveTasksToLocalStorage = (tasks) => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  };

  const handleAddTask = async () => {
    if (!newTask || !assignee) {
      console.log('Task title or assignee is missing');
      return;
    }

    const response = await apiClient.post('/todos', {
      title: newTask,
      userId: assignee,
      completed: false,
    });

    const updatedTasks = [...tasks, response.data];
    setTasks(updatedTasks);
    saveTasksToLocalStorage(updatedTasks);

    setNewTask('');
    setAssignee('');
  };

  const handleDeleteTask = async (id) => {
    await apiClient.delete(`/todos/${id}`);
    const updatedTasks = tasks.filter(task => task.id !== id);
    setTasks(updatedTasks);
    saveTasksToLocalStorage(updatedTasks);
  };

  const handleToggleTask = async (id, completed) => {
    await apiClient.put(`/todos/${id}`, { completed });
    const updatedTasks = tasks.map(task => (task.id === id ? { ...task, completed } : task));
    setTasks(updatedTasks);
    saveTasksToLocalStorage(updatedTasks);
  };

  const handleEditTask = (task) => {
    setIsEditing(true);
    setCurrentTask(task);
    setNewTask(task.title);
    setAssignee(task.userId); // Set the assignee state to the current task's userId
  };

  const handleSaveTask = async () => {
    if (!newTask || !assignee) {
      console.log('Task title or assignee is missing');
      return;
    }

    const response = await apiClient.put(`/todos/${currentTask.id}`, {
      title: newTask,
      userId: assignee,
      completed: currentTask.completed,
    });

    const updatedTasks = tasks.map(task => (task.id === currentTask.id ? response.data : task));
    setTasks(updatedTasks);
    saveTasksToLocalStorage(updatedTasks);

    setIsEditing(false);
    setCurrentTask(null);
    setNewTask('');
    setAssignee('');
  };

  return (
    <div className="task-manager">
      <h2>Task Manager</h2>
      {user.role === 'manager' && (
        <div className="task-summary">
          <h3>Task Summary</h3>
          <p className="total-tasks">Total Tasks: {tasks.length}</p>
          <p className="completed-tasks">Completed Tasks: {completedTasksCount}</p>
          <p className="in-progress-tasks">In Progress Tasks: {inProgressTasksCount}</p>
        </div>
      )}
      {user.role === 'manager' && (
        <div className="task-form">
          <h3>{isEditing ? 'Edit Task' : 'Create New Task'}</h3>
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="Task Title"
            className="task-input"
          />
          <select value={assignee} onChange={(e) => setAssignee(e.target.value)} className="task-select">
            <option value="">Assign to User</option>
            {users.map(user => (
              <option key={user.id} value={user.id}>
                {user.name}
              </option>
            ))}
          </select>
          {isEditing ? (
            <button onClick={handleSaveTask} className="task-button">Save Task</button>
          ) : (
            <button onClick={handleAddTask} className="task-button">Add Task</button>
          )}
        </div>
      )}
      <h3>Total Task</h3>
      <ul className="task-list">
        {tasks.map(task => (
          <li key={task.id} className="task-item">
            <span
              className={`task-title ${task.completed ? 'completed-task' : 'in-progress-task'}`}
            >
              {task.title} (Assigned to: {users.find(u => u.id === task.userId)?.name || ': Clementine Bauch'}) - Status: {task.completed ? 'Completed' : 'In Progress'}
            </span>
            {user.role === 'employee' && (
              <>
                {!task.completed && (
                  <button onClick={() => handleToggleTask(task.id, true)} className="task-button">Mark as Done</button>
                )}
                {task.completed && (
                  <button className="in-progress-button task-button" onClick={() => handleToggleTask(task.id, false)}>Mark as In Progress</button>
                )}
              </>
            )}
            {user.role === 'manager' && (
              <>
                <button onClick={() => handleEditTask(task)} className="task-button">Edit</button>
                <button onClick={() => handleDeleteTask(task.id)} className="task-button">Delete</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default TaskManager;
