module.exports = function LoginPage(req,res){
    res
    .status(200)
    .type("text/html")
    .send(`
    <!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Login Form</title>
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
    <h2>Login</h2>
    <form action="/api/app/login" method="post">
      <div class="input-group">
        <label for="loginOption">Login with:</label>
        <select id="loginOption" name="loginOption">
          <option value="email">Email</option>
          <option value="telephone">Telephone</option>
        </select>
      </div>
      <div class="input-group">
        <label for="loginId" class="label">Email/Telephone:</label>
        <input type="text" class="input" id="loginId" name="email" placeholder="Enter your email" required>
      </div>
      <div class="input-group">
        <label for="password">Password:</label>
        <input type="password" id="password" name="password" placeholder="Password" required>
      </div>
      <button type="submit">Login</button>
    </form>
  </div>
  <script>
    document.addEventListener("DOMContentLoaded", function() {
  const loginOption = document.getElementById("loginOption");
  const loginIdGroup = document.getElementById("loginIdGroup");
  const loginIdLabel = document.querySelector(".label");
  const loginIdInput = document.querySelector(".input");

  loginOption.addEventListener("change", function() {
    const selectedOption = loginOption.value;

    if (selectedOption === "email") {
      loginIdLabel.textContent = "Email:";
      loginIdInput.setAttribute("name", "email");
      loginIdInput.setAttribute("type", "email");
      loginIdInput.setAttribute("placeholder", "Enter your email");
    } else if (selectedOption === "telephone") {
      loginIdLabel.textContent = "Telephone:";
      loginIdInput.setAttribute("name", "telephone");
      loginIdInput.setAttribute("type", "tel");
      loginIdInput.setAttribute("placeholder", "Enter your telephone number");
    }
  });
});

  </script>
</body>
</html>
`)
}