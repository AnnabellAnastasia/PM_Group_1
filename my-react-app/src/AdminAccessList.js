import React, { useEffect, useState } from 'react';

function AdminAccessList() {
  const [adminAccess, setAdminAccess] = useState([]);

  useEffect(() => {
    fetch('/api/admin_access')
      .then(response => response.json())
      .then(data => setAdminAccess(data));
  }, []);

  return (
    <div>
      <h1>Admin Access List</h1>
      <ul>
        {adminAccess.map((entry, index) => (
          <li key={index}>
            Name: {entry.name}, Password: {entry.password}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default AdminAccessList;
