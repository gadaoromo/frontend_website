const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();
const port = 3000;

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Dummy user data
let users = [
    {
        username: 'user',
        userId: '12345',
        gender: 'Male',
        deposit: 100,
        balance: 50,
        password: 'password'
    }
];

// Serve static files
app.use(express.static('public'));

app.get("/",(req,res)=>{
  
    res.json({message:"something good"})
})
// Login endpoint
app.post('/login', (req, res) => {
    const { username, password } = req.body;
    const user = users.find(u => u.username === username && u.password === password);
    if (user) {
        res.json({ success: true, user });
    } else {
        res.json({ success: false, message: 'Invalid login credentials' });
    }
});

// Register endpoint
app.post('/register', (req, res) => {
    const { username, email, password, gender } = req.body;
    const userId = Date.now().toString();
    const newUser = { username, userId, gender, deposit: 100, balance: 50, password };
    users.push(newUser);
    res.json({ success: true, user: newUser });
});

app.listen(port, () => {
    console.log(`Server running at http://localhost:${port}`);
});
