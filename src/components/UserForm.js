import React, { useState, useEffect } from 'react';

const UserForm = ({ onAddUser, onUpdateUser, editingUser, setEditingUser }) => {
  const [user, setUser] = useState({ name: '', email: '', username: '' });
  const [error, setError] = useState('');

  // Jab "Edit" button dabayein, to form purane data se bhar jaye [cite: 49]
  useEffect(() => {
    if (editingUser) {
      setUser(editingUser);
    } else {
      setUser({ name: '', email: '', username: '' });
    }
  }, [editingUser]);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Validation: Check empty fields [cite: 57]
    if (!user.name || !user.email || !user.username) {
      setError('All fields are required!');
      return;
    }

    // Validation: Simple email format check [cite: 57]
    if (!user.email.includes('@')) {
      setError('Please enter a valid email.');
      return;
    }

    setError(''); // Clear error

    if (editingUser) {
      onUpdateUser(user); // Agar edit mode hai to update karo
    } else {
      onAddUser(user); // Agar naya hai to add karo
    }
    
    // Form clear karo
    setUser({ name: '', email: '', username: '' });
    setEditingUser(null);
  };

  return (
    <div className="form-container">
      <h3>{editingUser ? 'Edit User' : 'Add New User'}</h3>
      {error && <p className="error-msg">{error}</p>}
      
      <form onSubmit={handleSubmit}>
        <input 
          type="text" placeholder="Name" 
          value={user.name} 
          onChange={(e) => setUser({...user, name: e.target.value})} 
        />
        <input 
          type="email" placeholder="Email" 
          value={user.email} 
          onChange={(e) => setUser({...user, email: e.target.value})} 
        />
        <input 
          type="text" placeholder="Username" 
          value={user.username} 
          onChange={(e) => setUser({...user, username: e.target.value})} 
        />
        
        <button type="submit" className="btn-submit">
          {editingUser ? 'Update User' : 'Add User'}
        </button>
        
        {editingUser && (
          <button type="button" className="btn-cancel" onClick={() => setEditingUser(null)}>
            Cancel
          </button>
        )}
      </form>
    </div>
  );
};

export default UserForm;