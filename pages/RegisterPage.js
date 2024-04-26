module.exports = function RegPage(req,res){
  res
  .status(200)
  .type("text/html")
  .send(`
    <!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Registration Form</title>
  <style>
    *{
        font-family: sans-serif;
    }
    input{
        border: none;
        outline: none;
    }
    body, html {
  margin: 0;
  padding: 0;
  height: 100%;
}

body {
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #f0f4f7; /* Light gray background */
}

.container {
  background-color: #2c3e50; /* Oil blue background */
  padding: 20px;
  border-radius: 10px;
  width: 300px;
  text-align: center;
}

h2 {
  color: #fff; /* White text */
  margin-bottom: 20px;
}

form {
  display: flex;
  flex-direction: column;
}

.input-group {
  margin-bottom: 15px;
}

label {
  color: #fff; /* White text */
  display: block;
  margin-bottom: 5px;
}

input, select {
  padding: 8px;
  width: 100%;
  box-sizing: border-box;
  border-radius: 5px;
  border: 1px solid #ccc;
}

button {
  background-color: #3498db; /* Blue button color */
  color: #fff; /* White text */
  padding: 10px;
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

button:hover {
  background-color: #2980b9; /* Darker blue on hover */
}

  </style>
</head>
<body>
  <div class="container">
    <h2>Register</h2>
    <form action="/api/app/register" method="post">
      <div class="input-group">
        <label for="gender">Gender:</label>
        <select id="gender" name="gender">
          <option value="male">Male</option>
          <option value="female">Female</option>
          <option value="other" selected>Other</option>
        </select>
      </div>
      <div class="input-group">
        <label for="username">Username:</label>
        <input type="text" id="username" name="username" required>
      </div>
      <div class="input-group">
        <label for="email">Email:</label>
        <input type="email" id="email" name="email" required>
      </div>
      <div class="input-group">
        <label for="password">Password:</label>
        <input type="password" id="password" name="password" required>
      </div>
      <div class="input-group">
        <label for="telephone">Telephone:</label>
        <input type="tel" id="telephone" name="telephone">
      </div>
      <button type="submit">Register</button>
    </form>
  </div>
</body>
</html>
`);
}