const express=require("express");
 const bcrypt = require('bcrypt');
 const app=express();
const cors = require('cors');
 app.use(cors());

 const { Client } = require('pg');
 const client = new Client({
  host: 'localhost',
  database: 'TODO',
  user: 'postgres',
  password: '2204'
});

client.connect((err) => {
  if (err) {
    console.error('Connection error:', err.stack);
  } else {
    console.log('Connected to PostgreSQL database');
  }
});

async function createTable() {
    try {
      await client.query('CREATE TABLE IF NOT EXISTS users (id SERIAL PRIMARY KEY,username VARCHAR(100),email VARCHAR(100),password VARCHAR(100))');
      console.log('user table created successfully');
    } catch (err) {
      console.error('Error creating table:', err.stack);
    }
  }
  createTable();
  async function createTodoTable() {
    try {
      await client.query('CREATE TABLE IF NOT EXISTS todo (todoId SERIAL PRIMARY KEY,id INT,taskName VARCHAR(100),taskDescription VARCHAR(100),FOREIGN KEY(id) REFERENCES users(id))');
      console.log('todo table created successfully');
    } catch (err) {
      console.error('Error creating table:', err.stack);
    }
  }
  createTodoTable();

  app.use(express.json()); 
  

  app.post("/signup", async (request, response) => {
    const userDetails = request.body;
    const { userName, Email, password } = userDetails;
    const hashedPassword = await bcrypt.hash(request.body.password, 10);
    const checkUserQuery = 'SELECT * FROM users WHERE username = $1 OR email = $2';
    const checkUserValues=[userName,Email]
    const addUser = 'INSERT INTO users(username, email, password) VALUES($1, $2, $3)';
    const values = [userName, Email, hashedPassword];
    try {
      const userExists = await client.query(checkUserQuery, checkUserValues);
      if (userExists.rows.length>0) {
        return response.status(409).json({message:"User Already exists"});
      }else{
        const result = await client.query(addUser, values);
        const userId = result.rows[0].id;
        return response.status(201).json({message:"inserted"});
      }
    } catch (err) {
      return response.json(err.message);
    } 
  });

  app.post("/login", async (request, response) => {
    const userDetails = request.body;
    const { Email, password } = userDetails;
    const userQuery = 'SELECT * FROM users WHERE email = $1';
    const userValues = [Email];
    
    try {
      const result = await client.query(userQuery, userValues);
  
      if (result.rows.length === 0) {
        return response.json("User not found");
      } else {
        const storedPassword = result.rows[0].password;
        const isPasswordMatched = await bcrypt.compare(password, storedPassword);
  
        if (isPasswordMatched) {
          const userId = result.rows[0].id;
          return response.json({message:"Login successful",userId});
        } else {
          return response.json("Invalid password");
        }
      }
    } catch (err) {
      return response.json(err.message);
    }
  });

  app.post("/addtodo",async(request,response)=>{
    const newTask=request.body;
    const {name,description,userID}=newTask;
    const checkUserQuery = 'SELECT * FROM users WHERE id = $1';
    const checkUserValues = [userID];
    const addTodoQuery=`INSERT INTO todo(id,taskName,taskDescription) VALUES($1,$2,$3) RETURNING todoId`;
    const addTodoValues=[userID,name,description];
    try {
      const userExists = await client.query(checkUserQuery, checkUserValues);

      if (userExists.rows.length === 0) {
          return response.status(404).json({ error: 'User not found' });
      }

      const result = await client.query(addTodoQuery, addTodoValues);
      const insertedTodoId = result.rows[0].todoid;

      return response.status(201).json({ message: 'Todo added successfully', todoId: insertedTodoId });
  } catch (err) {
      console.error('Error adding todo:', err.stack);
      return response.status(500).json({ error: 'Internal server error' });
  } 
  });

app.get("/todoItems/:userID",async(request,response)=>{
  const{userID}=request.params;
  const checkUserQuery = 'SELECT * FROM users WHERE id = $1';
  const checkUserValues = [userID];
  const getTodosQuery = 'SELECT * FROM todo WHERE id = $1';
  const getTodosValues = [userID];
  try {
    const userExists = await client.query(checkUserQuery, checkUserValues);

    if (userExists.rows.length === 0) {
      return response.status(404).json({ error: 'User not found' });
    }

    const result = await client.query(getTodosQuery, getTodosValues);
    const todos = result.rows;

    return response.status(200).json(todos);
  } catch (err) {
    console.error('Error fetching todos:', err.stack);
    return response.status(500).json({ error: 'Internal server error' });
  }
});

app.delete("/deleteTodo/:todoid",async(request,response)=>{
  const {todoid}=request.params;
  const deleteQuery=`DELETE FROM todo WHERE todoId=$1`;
  const deleteValue=[todoid]
  try{
  await client.query(deleteQuery,deleteValue)
  return  response.status(200).json({ success: 'todo record successfully deleted' });
  }catch(error){
    console.error('Error deleting employee:', error.message);
    return response.status(500).json({ message: 'Internal Server Error' });
  }
});
  
app.listen(3000, () => {
    console.log('Server listening on port 3000');
  });