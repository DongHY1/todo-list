const express = require('express');
const { Pool } = require('pg');
const app = express();
const cors = require('cors');
const PORT = 5001;
const pool = new Pool({
  user: 'masahiro',
  password: 'dhywj123',
  host: 'localhost',
  port: 5432,
  database: 'todolist',
});
app.get('/', (req, res) => {
  res.json('Hello');
});
//处理跨域问题
app.use(cors());
app.use(express.json());
// 查询
app.get('/todos', async (req, res) => {
  try {
    const allTodos = await pool.query('SELECT * FROM todo');
    res.json(allTodos.rows);
  } catch (error) {
    console.error(error);
  }
});
// 增加
app.post('/todos', async (req, res) => {
  try {
    const { description } = req.body;
    const addTodo = await pool.query(
      'INSERT INTO todo (description) VALUES($1) RETURNING *',
      [description]
    );

    res.json(addTodo.rows[0]);
  } catch (error) {
    console.error(error);
  }
});
// 修改
app.put('/todos/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const { description } = req.body;
    const putTodo = await pool.query(
      'UPDATE todo SET description = $1 WHERE id = $2 RETURNING *',
      [description, id]
    );
    res.json(putTodo.rows[0]);
  } catch (error) {
    console.error(error);
  }
});
// 删除
app.delete('/todos/:id', async (req, res) => {
  try {
    const { id } = req.params;
    const deleteTodo = await pool.query('DELETE FROM todo WHERE id = $1', [id]);
    res.json('delete!');
  } catch (error) {
    console.error(error);
  }
});

app.listen(PORT, () => {
  console.log(`${PORT} is listen!`);
});
