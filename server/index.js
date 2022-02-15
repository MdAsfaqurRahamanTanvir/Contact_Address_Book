const express = require("express");
const app = express();
const mysql = require("mysql");
const cors = require("cors");

app.use(cors());
app.use(express.json());

const db = mysql.createConnection({
  user: "root",
  host: "localhost",
  password: "",
  database: "contactBook",
});

app.post("/create", (req, res) => {
  const name = req.body.name;
  const companyName = req.body.companyName;
  const address = req.body.address;
  const telephone = req.body.telephone;
  const email = req.body.email;
  const mobile = req.body.mobile;

  db.query(
    "INSERT INTO contacts (name, companyName, address, telephone, email, mobile) VALUES (?,?,?,?,?,?)",
    [name, companyName, address, telephone, email, mobile],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send("Contact Inserted");
      }
    }
  );
});

app.get("/contacts", (req, res) => {
  db.query("SELECT * FROM contacts", (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.put("/update", (req, res) => {
  const id = req.body.id;
  const name = req.body.name;
  const companyName = req.body.companyName;
  const address = req.body.address;
  const telephone = req.body.telephone;
  const email = req.body.email;
  const mobile = req.body.mobile;
  db.query(
    "UPDATE contacts SET name = ?, companyName= ? ,address = ? ,telephone = ? ,email = ? ,mobile = ? WHERE id = ?",
    [name, companyName, address, telephone, email, mobile, id],
    (err, result) => {
      if (err) {
        console.log(err);
      } else {
        res.send(result);
      }
    }
  );
});

app.delete("/delete/:id", (req, res) => {
  const id = req.params.id;
  db.query("DELETE FROM contacts WHERE id = ?", id, (err, result) => {
    if (err) {
      console.log(err);
    } else {
      res.send(result);
    }
  });
});

app.listen(3001, () => {
  console.log("Yey, your server is running on port 3001");
});
