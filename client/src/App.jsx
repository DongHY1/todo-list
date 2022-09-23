import React, { useState, useEffect } from 'react';

export default function App() {
  const [list, setList] = useState([]);
  const [desc, setDesc] = useState('');
  const [showEdit, setShowEdit] = useState(false);
  const [editDesc, setEditDesc] = useState('');
  const [id, setId] = useState(-1);
  const getList = async () => {
    try {
      const res = await fetch('http://localhost:5001/todos', {
        method: 'GET',
      });
      const jsonRes = await res.json();
      setList(jsonRes);
    } catch (error) {
      console.error(error);
    }
  };
  const handleAddSubmit = async (e) => {
    e.preventDefault();
    try {
      const body = { description: desc };
      const res = await fetch(`http://localhost:5001/todos`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      await getList();
    } catch (error) {
      console.error(error);
    }
  };
  const handleRemoveClick = async (id) => {
    try {
      const res = await fetch(`http://localhost:5001/todos/${id}`, {
        method: 'DELETE',
      });
      alert(res.statusText);
      await getList();
    } catch (error) {
      console.error(error);
    }
  };
  const handleEditSubmit = async (e) => {
    e.preventDefault();
    try {
      const body = { description: editDesc };
      const res = await fetch(`http://localhost:5001/todos/${id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      });
      alert('修改成功');
      await getList();
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    getList();
  }, []);
  return (
    <div>
      <h1>Todo App</h1>
      <form onSubmit={handleAddSubmit}>
        <input
          name="add"
          type="text"
          value={desc}
          onChange={(e) => setDesc(e.target.value)}
        />
        <button>Add</button>
      </form>
      {showEdit && (
        <form onSubmit={handleEditSubmit}>
          <input
            name="edit"
            type="text"
            value={editDesc}
            onChange={(e) => setEditDesc(e.target.value)}
          />
          <button>Submit Edit</button>
        </form>
      )}
      {list.map((item) => {
        return (
          <ul key={item.id}>
            <li>{item.description}</li>
            <button
              onClick={() => {
                setShowEdit(!showEdit);
                setId(item.id);
              }}
            >
              Edit
            </button>
            <button onClick={() => handleRemoveClick(item.id)}>Remove</button>
          </ul>
        );
      })}
    </div>
  );
}
