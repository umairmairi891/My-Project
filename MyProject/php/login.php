<?php
// login.php

session_start();

$host = 'localhost';
$db = 'myproject_db';
$user = 'root';
$pass = '';

$conn = new mysqli($host, $user, $pass, $db);
if ($conn->connect_error) {
    die("Connection failed: " . $conn->connect_error);
}

$message = '';
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    $username = htmlspecialchars($_POST['username']);
    $password = htmlspecialchars($_POST['password']);

    if (empty($username) || empty($password)) {
        $message = "Both fields are required!";
    } else {
        $sql = "SELECT * FROM users WHERE username = ?";
        $stmt = $conn->prepare($sql);
        $stmt->bind_param("s", $username);

        $stmt->execute();
        $result = $stmt->get_result();
        $userRow = $result->fetch_assoc();

        if ($userRow && password_verify($password, $userRow['password'])) {
            $_SESSION['username'] = $userRow['username'];
            header("Location: index.html");
            exit();
        } else {
            $message = "Invalid username or password!";
        }

        $stmt->close();
    }
}
$conn->close();
?>

<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Login</title>
    <link href="/MyProject/BootStrap/bootstrap.css" rel="stylesheet">
</head>
<body class="bg-light">

<div class="container mt-5">
    <div class="row justify-content-center">
        <div class="col-md-6">
            <div class="card shadow-lg">
                <div class="card-body">
                    <h3 class="card-title mb-4 text-center">Login</h3>

                    <?php if ($message): ?>
                        <div class="alert alert-danger"><?= $message ?></div>
                    <?php endif; ?>

                    <form method="POST" action="">
                        <div class="mb-3">
                            <label for="username" class="form-label">Username</label>
                            <input type="text" name="username" class="form-control" id="username" required>
                        </div>
                        <div class="mb-3">
                            <label for="password" class="form-label">Password</label>
                            <input type="password" name="password" class="form-control" id="password" required>
                        </div>
                        <button type="submit" class="btn btn-primary w-100">Login</button>
                    </form>

                    <p class="mt-3 text-center">Don't have an account? <a href="Register.php">Sign up here</a></p>
                </div>
            </div>
        </div>
    </div>
</div>

</body>
</html>
