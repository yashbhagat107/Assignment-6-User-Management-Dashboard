import React, { useState, useEffect } from 'react';
import axios from 'axios';
import UserList from './components/UserList';
import UserForm from './components/UserForm';
import './App.css';

const App = () => {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true); // Loading State [cite: 58]

  // 1. Fetch Users (GET Request) [cite: 41, 62]
  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await axios.get('https://jsonplaceholder.typicode.com/users');
      setUsers(response.data);
      setLoading(false);
    } catch (err) {
      setError('Failed to fetch users.'); // Error Handling [cite: 57]
      setLoading(false);
    }
  };

  // 2. Add User (POST Request) [cite: 45, 63]
  const addUser = async (userData) => {
    try {
      const response = await axios.post('https://jsonplaceholder.typicode.com/users', userData);
      // Fake API always returns ID 11, so we generate a random ID for UI uniqueness
      const newUser = { ...userData, id: users.length + 1 }; 
      setUsers([...users, newUser]); // UI update [cite: 46]
      alert("User Added Successfully!");
    } catch (err) {
      setError('Failed to add user.');
    }
  };

  // 3. Update User (PUT Request) [cite: 50, 64]
  const updateUser = async (updatedData) => {
    try {
      await axios.put(`https://jsonplaceholder.typicode.com/users/${updatedData.id}`, updatedData);
      
      // UI update logic [cite: 51]
      setUsers(users.map(user => (user.id === updatedData.id ? updatedData : user)));
      setEditingUser(null); // Exit edit mode
      alert("User Updated Successfully!");
    } catch (err) {
      setError('Failed to update user.');
    }
  };

  // 4. Delete User (DELETE Request) [cite: 54, 64]
  const deleteUser = async (id) => {
    // Confirm Deletion [cite: 54]
    if (!window.confirm("Are you sure you want to delete this user?")) return;

    try {
      await axios.delete(`https://jsonplaceholder.typicode.com/users/${id}`);
      
      // Remove from UI [cite: 55]
      setUsers(users.filter(user => user.id !== id));
      alert("User Deleted Successfully!");
    } catch (err) {
      setError('Failed to delete user.');
    }
  };

  return (
    <div className="container">
      <h1>User Management Dashboard</h1>
      
      {error && <p className="error-banner">{error}</p>}
      
      {/* Form Section */}
      <UserForm 
        onAddUser={addUser} 
        onUpdateUser={updateUser} 
        editingUser={editingUser} 
        setEditingUser={setEditingUser} 
      />

      {/* Loading Indicator or List */}
      {loading ? (
        <p className="loading">Loading Users...</p>
      ) : (
        <UserList 
          users={users} 
          onEdit={setEditingUser} 
          onDelete={deleteUser} 
        />
      )}
    </div>
  );
};

export default App;