import React, { useEffect, useState } from 'react';
import TableComponent from '../components/TableComponent';

const AdminUsers = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    // تعويض هذا بـ API call ديالك
    const fetchData = async () => {
      const response = await fetch('http://localhost:8000/api/users'); // أو endpoint ديالك
      const data = await response.json();
      setUsers(data);
    };

    fetchData();
  }, []);

  const columns = [
    { key: 'id', label: 'ID' },
    { key: 'name', label: 'Name' },
    { key: 'email', label: 'Email' },
    { key: 'role', label: 'Role' },
    { key: 'status', label: 'Status' },
  ];

  const handleEdit = (user) => {
    console.log('Edit user:', user);
    // يمكنك فتح modal أو الانتقال لصفحة التعديل
  };

  const handleDelete = (user) => {
    console.log('Delete user:', user);
    // يمكنك تنفيذ request ديال الحذف هنا
  };

  return (
    <div>
      <h2>Liste des utilisateurs</h2>
      <TableComponent columns={columns} data={users} onEdit={handleEdit} onDelete={handleDelete} />
    </div>
  );
};

export default AdminUsers;
