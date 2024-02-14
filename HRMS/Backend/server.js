const express=require("express");
 const bcrypt = require('bcrypt');
 const app=express();
 const cors = require('cors');
app.use(cors());

 const { Client } = require('pg');
 const client = new Client({
  host: 'localhost',
  database: 'REACT',
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

// create a table
async function createTable() {
  try {
    await client.query('CREATE TABLE IF NOT EXISTS users (id SERIAL PRIMARY KEY,username VARCHAR(100),email VARCHAR(100),password VARCHAR(100))');
    console.log('Products table created successfully');
  } catch (err) {
    console.error('Error creating table:', err.stack);
  }
}
createTable();
async function createEmployeeTable() {
  try {
    await client.query('CREATE TABLE IF NOT EXISTS employee (id SERIAL PRIMARY KEY,employeename VARCHAR(100),email VARCHAR(100),employeeId VARCHAR(100))');
    console.log('employee table created successfully');
  } catch (err) {
    console.error('Error creating table:', err.stack);
  }
}
createEmployeeTable();

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
        return response.json("Login successful");
      } else {
        return response.json("Invalid password");
      }
    }
  } catch (err) {
    return response.json(err.message);
  }
});

app.post("/addEmployee", async (request,response)=>{
  const employeeDetails=request.body;
  const {EmployeeName,Email,EmployeeID}=employeeDetails;
  const checkEmployeeQuery=`SELECT*FROM employee WHERE employeeId=$1 OR email=$2 `;
  const checkEmployeeValues=[EmployeeID,Email]
  const addEmployee=`INSERT INTO employee(employeename,email,employeeId) VALUES($1,$2,$3)`;
  const addEmployeeValues=[EmployeeName,Email,EmployeeID]
  try {
    const employeeExists = await client.query(checkEmployeeQuery, checkEmployeeValues);
    if (employeeExists.rows.length>0) {
      return response.status(409).json({"message":"Employee Already exists"});
    }else{
      const result = await client.query(addEmployee, addEmployeeValues);
      return response.status(201).json({"message":"Employee added successfully"});
    }
  } catch (err) {
    return response.json(err.message);
  } 
});


app.get("/employeeCount", async (request, response) => {
  try {
    const result = await client.query('SELECT COUNT(*) FROM employee');
    const count = parseInt(result.rows[0].count, 10);
    return response.status(200).json({ count });
  } catch (err) {
    return response.status(500).json({ error: err.message });
  }
});

app.get("/employeelist",async(request,response)=>{
  try{
    const result=await client.query("SELECT * FROM employee");
    response.status(200).json(result.rows); 
  }
  catch(error)  {
    console.error('Error fetching employee list:', error);
    response.status(500).json({ error: 'An error occurred while fetching employee list' });
  }
});

app.delete("/deleteEmployee/:id", async (request, response) => {
  const { id } = request.params;

  try {
    // Check if the employee exists
    const checkEmployeeQuery = 'SELECT * FROM employee WHERE id = $1';
    const checkEmployeeValues = [id];
    const checkResult = await client.query(checkEmployeeQuery, checkEmployeeValues);

    if (checkResult.rows.length === 0) {
      return response.status(404).json({ message: 'Employee not found' });
    }

    // Delete the employee
    const deleteEmployeeQuery = 'DELETE FROM employee WHERE id = $1';
    const deleteEmployeeValues = [id];
    await client.query(deleteEmployeeQuery, deleteEmployeeValues);

    return response.status(200).json({ success: 'Employee record successfully deleted' });
  } catch (error) {
    console.error('Error deleting employee:', error.message);
    return response.status(500).json({ message: 'Internal Server Error' });
  }
}); 
app.put("/updateEmployee/:id",async(request,response)=>{
  const {id}=request.params;
  const updateEmployee=request.body;
  const{employeename,email,employeeid}=updateEmployee;
  const updateQuery=`update employee set employeename=$1,email=$2,employeeid=$3 WHERE id=$4`
  const updateValues=[employeename,email,employeeid,id]
  try{
   const result=await client.query(updateQuery,updateValues);
   return response.status(200).json({ success: 'Employee record successfully updated' });
  }catch(error){
    console.error('Error deleting employee:', error.message);
    return response.status(500).json({ message: 'Internal Server Error' });
  }
})
app.listen(3000, () => {
  console.log('Server listening on port 3000');
});

