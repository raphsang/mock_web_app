import React, { useState, useEffect } from 'react';
import apiClient from '../api/Client';
import './EmployeeManager.css'; // Import the CSS file

{/* fuction to give manager certain privilages such as creating departments and tasks */}
const EmployeeManager = () => {
  const [users, setUsers] = useState([]);
  const [departments, setDepartments] = useState(['Sales', 'Engineering', 'HR']);
  const [newDepartment, setNewDepartment] = useState('');
  const [selectedUser, setSelectedUser] = useState(null);
  const [selectedDepartment, setSelectedDepartment] = useState('');

  useEffect(() => {
    {/* Main content styles */}
    const fetchData = async () => { 
      const storedUsers = JSON.parse(localStorage.getItem('users'));
      const storedDepartments = JSON.parse(localStorage.getItem('departments'));

      if (storedUsers && storedDepartments) {
        setUsers(storedUsers);
        setDepartments(storedDepartments);
      } else {
        const usersResponse = await apiClient.get('/users');
        setUsers(usersResponse.data);
        localStorage.setItem('users', JSON.stringify(usersResponse.data));
        localStorage.setItem('departments', JSON.stringify(departments));
      }
    };

    fetchData();
  }, []);

  const saveUsersToLocalStorage = (users) => {
    localStorage.setItem('users', JSON.stringify(users));
  };

  const saveDepartmentsToLocalStorage = (departments) => {
    localStorage.setItem('departments', JSON.stringify(departments));
  };

  const handleAddDepartment = () => {
    if (newDepartment && !departments.includes(newDepartment)) {
      const updatedDepartments = [...departments, newDepartment];
      setDepartments(updatedDepartments);
      saveDepartmentsToLocalStorage(updatedDepartments);
      setNewDepartment('');
    }
  };

  const handleMoveUser = async (userId, department) => {
    const updatedUsers = users.map(user => user.id === userId ? { ...user, department } : user);
    setUsers(updatedUsers);
    saveUsersToLocalStorage(updatedUsers);
    setSelectedUser(null);
  };

  const handleRemoveUser = async (userId) => {
    const updatedUsers = users.filter(user => user.id !== userId);
    setUsers(updatedUsers);
    saveUsersToLocalStorage(updatedUsers);
  };

  return (
    <div className="employee-manager">
      <h2>Employee Manager</h2>

      <div className="add-department">
        <h3>Add New Department</h3>
        <input
          type="text"
          value={newDepartment}
          onChange={(e) => setNewDepartment(e.target.value)}
          placeholder="New Department"
        />
        <button onClick={handleAddDepartment}>Add Department</button>
      </div>

      <div className="existing-departments">
        <h3>Existing Departments</h3>
        <ul>
          {departments.map(dept => (
            <li key={dept}>{dept}</li>
          ))}
        </ul>
      </div>

      <div className="move-user">
        <h3>Move User to Department</h3>
        <ul>
          {users.map(user => (
            <li key={user.id}>
              {user.name} - {user.department || 'No Department'}
              <button onClick={() => setSelectedUser(user)}>Move</button>
              <button onClick={() => handleRemoveUser(user.id)}>Remove</button>
            </li>
          ))}
        </ul>
      </div>

      {selectedUser && (
        <div className="move-user-form">
          <h3>Move {selectedUser.name} to a new department</h3>
          <select
            value={selectedDepartment}
            onChange={(e) => setSelectedDepartment(e.target.value)}
          >
            <option value="">Select Department</option>
            {departments.map(dept => (
              <option key={dept} value={dept}>{dept}</option>
            ))}
          </select>
          <button onClick={() => handleMoveUser(selectedUser.id, selectedDepartment)}>Move</button>
        </div>
      )}
    </div>
  );
};

export default EmployeeManager;
