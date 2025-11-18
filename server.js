// server.js - Zombie Hunter's Full Node.js Website
const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const PORT = 3000;

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public')); // for images, css later
app.set('view engine', 'ejs');

// Create views folder & EJS templates if not exist
const viewsPath = path.join(__dirname, 'views');
if (!fs.existsSync(viewsPath)) fs.mkdirSync(viewsPath);

// Home Page
app.get('/', (req, res) => {
    res.send(`
<!DOCTYPE html>
<html>
<head>
    <title>Zombie Hunter Esports</title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <style>
        body { margin:0; background:#000; color:#0f0; font-family:Arial; text-align:center; padding:20px; }
        h1 { font-size:4rem; text-shadow:0 0 20px #0f0; animation:glow 2s infinite alternate; }
        a { color:#0ff; text-decoration:none; font-size:1.5rem; margin:20px; display:inline-block; padding:15px 30px; background:#0f0; color:#000; border-radius:50px; }
        a:hover { background:#0ff; color:#000; transform:scale(1.1); }
        iframe { border:3px solid #0f0; border-radius:15px; margin:30px 0; }
        @keyframes glow { from { text-shadow:0 0 20px #0f0; } to { text-shadow:0 0 50px #0f0; } }
    </style>
</head>
<body>
    <h1>ZOMBIE HUNTER</h1>
    <p style="font-size:1.8rem;">Esports • Tournaments • Gaming Legend</p>
    <p>"Where gamers unite, compete, and conquer!"</p>
    
    <iframe width="90%" height="400" src="https://www.youtube.com/embed/pLa--goOyuo" allowfullscreen></iframe>
    
    <div style="margin:40px 0;">
        <a href="/tournaments">View Tournaments</a>
        <a href="/register">Register Now</a>
    </div>

    <div style="margin-top:50px; color:#0ff;">
        <a href="https://instagram.com/__zombie__hunter__" target="_blank">Instagram</a> • 
        <a href="https://youtube.com/@zombiehunter1787" target="_blank">YouTube</a>
    </div>
</body>
</html>
    `);
});

// Tournaments Page
app.get('/tournaments', (req, res) => {
    res.send(`
<!DOCTYPE html>
<html><head><title>Tournaments</title>
<style>body{background:#000;color:#0f0;font-family:Arial;text-align:center;padding:20px;}
table{margin:30px auto;border-collapse:collapse;width:90%;}
th,td{border:2px solid #0f0;padding:15px;background:#111;}
th{background:#0f0;color:#000;}
a{color:#0ff;font-size:1.5rem;padding:15px 30px;background:#0f0;color:#000;border-radius:50px;text-decoration:none;}</style>
</head>
<body>
    <h1>UPCOMING TOURNAMENTS 2025</h1>
    <table>
        <tr><th>Game</th><th>Format</th><th>Date</th></tr>
        <tr><td>Valorant</td><td>5v5</td><td>July 10, 2025</td></tr>
        <tr><td>Fortnite</td><td>Solo/Duo</td><td>July 12, 2025</td></tr>
        <tr><td>Marvel Rivals</td><td>6v6</td><td>July 14, 2025</td></tr>
    </table>
    <a href="/register">Register Now</a><br><br>
    <a href="/">Back to Home</a>
</body></html>
    `);
});

// Registration Form
app.get('/register', (req, res) => {
    res.send(`
<!DOCTYPE html>
<html>
<head><title>Register</title>
<style>
    body { background:#000; color:#0f0; font-family:Arial; text-align:center; padding:20px; }
    input, select, button { padding:12px; margin:10px; width:80%; max-width:400px; background:#111; border:2px solid #0f0; color:#0f0; border-radius:10px; font-size:1rem; }
    button { background:#0f0; color:#000; cursor:pointer; font-weight:bold; }
    button:hover { background:#0ff; }
</style>
</head>
<body>
    <h1>TOURNAMENT REGISTRATION</h1>
    <form action="/register" method="POST">
        <input type="text" name="name" placeholder="Your Name" required>
        <input type="number" name="age" placeholder="Your Age" min="13" required>
        <input type="email" name="email" placeholder="Your Email" required>
        <select name="game" required>
            <option value="">Select Game</option>
            <option>Valorant</option>
            <option>Fortnite</option>
            <option>Marvel Rivals</option>
        </select>
        <input type="text" name="ign" placeholder="In-Game Name (IGN)" required>
        <button type="submit">REGISTER NOW</button>
    </form>
    <br><a href="/" style="color:#0ff;">Back to Home Home</a>
</body>
</html>
    `);
});

// Handle Registration (Save to file)
app.post('/register', (req, res) => {
    const data = `${new Date().toLocaleString()} | Name: ${req.body.name} | Age: ${req.body.age} | Email: ${req.body.email} | Game: ${req.body.game} | IGN: ${req.body.ign}\n`;
    
    fs.appendFile('registrations.txt', data, (err) => {
        if (err) {
            res.send("<h1 style='color:red;'>Error saving data!</h1>");
        } else {
            res.send(`
            <h1 style="color:#0f0;">Registration Successful!</h1>
            <p>Thank you <strong>${req.body.name}</strong>! You're registered for <strong>${req.body.game}</strong>!</p>
            <p>We will contact you soon on <strong>${req.body.email}</strong></p>
            <a href="/" style="color:#0ff; font-size:1.5rem;">Back to Home</a>
            `);
        }
    });
});

// Start Server
app.listen(PORT, () => {
    console.log(`ZOMBIE HUNTER WEBSITE IS LIVE!`);
    console.log(`Go to: http://localhost:${PORT}`);
    console.log(`Registrations saved to: registrations.txt`);
});