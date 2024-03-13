import express from "express";
import mysql from "mysql";
import cors from "cors";
import multer from "multer";
const app = express();
app.use(express.json());
app.use(cors());
// app.use(express.static("public/images/cocurr"));

const db = mysql.createConnection({
  host: "localhost",
  user: "root",
  password: "password",
  database: "student_activity_management_system"
});
db.connect((err) => {
  if (err) {
    console.error('Error connecting to MySQL database:', err);
    return;
  }
  console.log('Connected to MySQL database!');
});

// Optionally, you can also listen for the 'error' event to handle connection errors
db.on('error', (err) => {
  console.error('MySQL database error:', err);
});
const activityStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../client/public/images/activity");
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
});

const cocurrStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "../client/public/images/cocurr");
  },
  filename: function (req, file, cb) {
    cb(null, `${Date.now()}_${file.originalname}`);
  },
});

const activityUpload = multer({ storage: activityStorage });
const cocurrUpload = multer({ storage: cocurrStorage });

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.post("/activity", activityUpload.single("proof"), (req, res) => {
  const formData = req.body;
  const proofImage = req.file;

  console.log("Activity Form data:", formData);
  console.log("Activity Proof image:", proofImage);

  const sql =
    "INSERT INTO achivement (points,date,document,proof,venue,student_id) VALUES (?, ?, ?, ?, ?,?)";
  const values = [
    formData.points,
    formData.date,
    formData.document,
    proofImage.filename,
    formData.venue,
    formData.usn,
  ];

  app.post("/update-activity", (req, res) => {
    const { date, points } = req.body;

    if (!date || !points) {
      return res.status(400).json({ message: "Date and points are required" });
    }

    const sql = `UPDATE achivement SET points = ? WHERE date = ?`;

    db.query(sql, [points, date], (err, result) => {
      if (err) {
        console.error("Error updating points:", err);
        return res.status(500).json({ message: "Internal server error" });
      }

      console.log("Points updated successfully");
      return res.status(200).json({ message: "Points updated successfully" });
    });
  });

  db.query(sql, values, (error, results) => {
    if (error) {
      console.error("Error inserting data into MySQL:", error);
      res.status(500).send("Internal Server Error");
    } else {
      console.log("Data inserted into MySQL successfully");
      res.status(200).send("Activity Form submitted successfully!");
    }
  });
});

app.post("/cocurr", cocurrUpload.single("certificate"), (req, res) => {
  const formData = req.body;
  const certificateFile = req.file;

  console.log("Cocurr Form data:", formData);
  console.log("Cocurr Certificate file:", certificateFile);

  const sql =
    "INSERT INTO co_curricular (date, venue, price, certificate,stud_id) VALUES (?, ?, ?, ?, ?)";
  const values = [
    formData.date,
    formData.venue,
    formData.price !== "" ? formData.price : null,
    certificateFile.filename,
    formData.usn,
  ];

  db.query(sql, values, (error, results) => {
    if (error) {
      console.error("Error inserting data into MySQL:", error);
      res.status(500).send("Internal Server Error");
    } else {
      console.log("Data inserted into MySQL successfully");
      res.status(200).send("Cocurr Form submitted successfully!");
    }
  });
});

app.post("/admin-check", (req, res) => {
  const { username, password } = req.body;

  const query =
    "SELECT COUNT(*) AS count FROM admin WHERE fname = ? AND password = ?";
  db.query(query, [username, password], (err, results) => {
    if (err) {
      console.error("Database error:", err);
      res.status(500).json({ error: "Internal server error" });
    } else {
      const { count } = results[0];

      res.json({ exists: count > 0 });
    }
  });
});
app.post("/student-check", (req, res) => {
  const { usn, password } = req.body;

  const query =
    "SELECT COUNT(*) AS count FROM student WHERE usn = ? AND password = ?";
  db.query(query, [usn, password], (err, results) => {
    if (err) {
      console.error("Database error:", err);
      res.status(500).json({ error: "Internal server error" });
    } else {
      const { count } = results[0];

      res.json({ exists: count > 0 });
    }
  });
});

app.get("/get-user/:usn", (req, res) => {
  const { usn } = req.params;

  const query = "SELECT usn, branch,fname,lname FROM student WHERE usn = ?";
  db.query(query, [usn], (err, results) => {
    if (err) {
      console.error("Database error:", err);
      res.status(500).json({ error: "Internal server error" });
    } else {
      console.log("User data:", results);
      if (results.length > 0) {
        const userData = results[0];
        res.json(userData);
      } else {
        res.status(404).json({ error: "User not found" });
      }
    }
  });
});

app.get("/get-total-points/:usn", (req, res) => {
  const { usn } = req.params;

  // Query to calculate total points for the user with the given USN
  const sql = `SELECT SUM(points) AS totalPoints FROM achivement WHERE student_id = ?`;

  db.query(sql, [usn], (err, result) => {
    if (err) {
      console.error("Error fetching total points:", err);
      return res.status(500).json({ message: "Internal server error" });
    }

    const totalPoints = result[0].totalPoints || 0; // Retrieve total points from the query result
    res.status(200).json({ totalPoints });
  });
});

app.get("/fetch-users", (req, res) => {
  const { department } = req.query;

  if (!department) {
    return res.status(400).json({ error: "Department is required" });
  }

  const query = "SELECT * FROM student WHERE branch = ?";

  db.query(query, [department], (err, results) => {
    if (err) {
      console.error("Database error:", err);
      res.status(500).json({ error: "Internal server error" });
    } else {
      res.json({ users: results });
    }
  });
});

app.get("/", (req, res) => {
  const q = "SELECT * FROM student";
  db.query(q, (err, data) => {
    if (err) {
      res.send(err);
      console.log(err);
    } else {
      res.send(data);
    }
  });
});

app.post("/login", (req, res) => {
  const q =
    "INSERT INTO student (`usn`, `password`, `fname`, `lname` ,`branch` ) VALUES (?)";

  const values = [
    req.body.usn,
    req.body.password,
    req.body.fname,
    req.body.lname,
    req.body.branch,
  ];
  db.query(q, [values], (err, data) => {
    if (err) {
      res.json(err);
    } else res.json("data");
  });
});

app.post("/admin-register", (req, res) => {
  const q =
    "INSERT INTO admin (`branch`, `password`, `fname`, `lname` ,`faculty_no` ) VALUES (?)";

  const values = [
    req.body.branch,
    req.body.password,
    req.body.fname,
    req.body.lname,
    req.body.faculty_no,
  ];
  db.query(q, [values], (err, data) => {
    if (err) {
      res.json(err);
    } else {
      res.json("data");
      // res.send("Data inserted");
    }
  });
});

app.post("/student-register", (req, res) => {
  const q =
    "INSERT INTO student (`usn`, `password`, `fname`, `lname` ,`branch` ) VALUES (?)";

  const values = [
    req.body.usn,
    req.body.password,
    req.body.fname,
    req.body.lname,
    req.body.branch,
  ];
  db.query(q, [values], (err, data) => {
    if (err) {
      res.json(err);
    } else {
      res.json("data");
    }
  });
});

app.get("/fetch-cocurr", (req, res) => {
  const { usn } = req.query;
  if (!usn) {
    return res.status(400).json({ error: "usn is required" });
  }
  const query = "SELECT * FROM co_curricular WHERE stud_id = ?";
  db.query(query, [usn], (err, results) => {
    if (err) {
      console.error("Database error:", err);
      res.status(500).json({ error: "Internal server error" });
    } else {
      res.json({ cocurrDetails: results });
    }
  });
});

app.get("/fetch-activity", (req, res) => {
  const { usn } = req.query;
  if (!usn) {
    return res.status(400).json({ error: "usn is required" });
  }
  const query = "SELECT * FROM achivement WHERE student_id = ?"; // Adjust the table name
  db.query(query, [usn], (err, results) => {
    if (err) {
      console.error("Database error:", err);
      res.status(500).json({ error: "Internal server error" });
    } else {
      res.json({ activityDetails: results }); // Adjust the property name
    }
  });
});

app.listen(8800, () => {
  console.log("Server is running on port 8800");
});
