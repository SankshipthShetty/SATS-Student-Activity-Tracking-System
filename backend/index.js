import express from "express";
import mysql from "mysql";
import cors from "cors";
const app = express();
app.use(express.json());
app.use(cors());

const db=mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "password",
    database: "student_activity_management_system",
});

app.use(express.json());

app.post('/admin-check', (req, res) => {
    const { username, password } = req.body;

    const query = "SELECT COUNT(*) AS count FROM admin WHERE fname = ? AND password = ?";
    db.query(query, [username, password], (err, results) => {
        if (err) {
          console.error('Database error:', err);
          res.status(500).json({ error: 'Internal server error' });
        } else {
         
          const { count } = results[0];
    
          
          res.json({ exists: count > 0 });
        }
      });
  



});
app.post('/student-check', (req, res) => {
    const { usn, password } = req.body;

    const query = "SELECT COUNT(*) AS count FROM student WHERE usn = ? AND password = ?";
    db.query(query, [usn, password], (err, results) => {
        if (err) {
          console.error('Database error:', err);
          res.status(500).json({ error: 'Internal server error' });
        } else {
        
          const { count } = results[0];
    
          
          res.json({ exists: count > 0 });
        }
      });




});

app.get('/get-user/:usn', (req, res) => {
    const { usn } = req.params;

    const query = 'SELECT usn, branch FROM student WHERE usn = ?';
    db.query(query, [usn], (err, results) => {
        if (err) {
            console.error('Database error:', err);
            res.status(500).json({ error: 'Internal server error' });
        } else {
            console.log('User data:', results);
            if (results.length > 0) {
                const userData = results[0];
                res.json(userData);
            } else {
                res.status(404).json({ error: 'User not found' });
            }
        }
    });
});

  





app.get('/fetch-users', (req, res) => {
    const { department } = req.query;
  
    
    if (!department) {
      return res.status(400).json({ error: 'Department is required' });
    }
  
    
    const query = 'SELECT * FROM student WHERE branch = ?';
  
    db.query(query, [department], (err, results) => {
      if (err) {
        console.error('Database error:', err);
        res.status(500).json({ error: 'Internal server error' });
      } else {
       
        res.json({ users: results });
      }
    });
});


app.get("/", (req, res) => { 
    const q="SELECT * FROM student";
    db.query(q,(err,data)=>{
        if(err){
            res.send(err);
            console.log(err);
        }else{
            res.send(data);
        
    }

})});


app.post('/login', (req, res) => {
    
    const q = "INSERT INTO student (`usn`, `password`, `fname`, `lname` ,`branch` ) VALUES (?)";
    
    const values=[
        req.body.usn,req.body.password,req.body.fname,req.body.lname,req.body.branch];
    db.query(q,[values],(err,data)=>{
        if(err){
            res.json(err);  
            
        }
        else res.json("data");
        
    }   
    );
});


app.post('/admin-register', (req, res) => {
    
    const q = "INSERT INTO admin (`branch`, `password`, `fname`, `lname` ,`faculty_no` ) VALUES (?)";
    
    const values=[
        req.body.branch,req.body.password,req.body.fname,req.body.lname,req.body.faculty_no];
    db.query(q,[values],(err,data)=>{
        if(err){
            res.json(err);  
            
        }
        else{ res.json("data");
        // res.send("Data inserted");
        
    }   
}
    );
});

app.post('/student-register', (req, res) => {
    
    const q = "INSERT INTO student (`usn`, `password`, `fname`, `lname` ,`branch` ) VALUES (?)";
    
    const values=[
        req.body.usn,req.body.password,req.body.fname,req.body.lname,req.body.branch];
    db.query(q,[values],(err,data)=>{
        if(err){
            res.json(err);  
            
        }
        else{ res.json("data");
        
        
    }   
}
    );
});



app.listen(8800, () => {
    console.log("Server is running on port 8800");
});