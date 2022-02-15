import "./App.css";
import { useState } from "react";
import Axios from "axios";

function App() {
  const [name, setName] = useState("");
  const [companyName, setCompanyName] = useState("");
  const [address, setAddress] = useState("");
  const [telephone, setTelephone] = useState(0);
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState(0);



  const [contactList, setContactList] = useState([]);

  const addContact = () => {
    Axios.post("http://localhost:3001/create", {
      name: name,
      companyName: companyName,
      address: address,
      telephone: telephone,
      email: email,
      mobile: mobile,
    }).then(() => {
      setContactList([
        ...contactList,
        {
          name: name,
          companyName: companyName,
          address: address,
          telephone: telephone,
          email: email,
          mobile: mobile,
        },
      ]);
    });
  };

  const getContact = () => {
    Axios.get("http://localhost:3001/contacts").then((response) => {
      setContactList(response.data);
    });
  };

  const updateContact = (id) => {
    Axios.put("http://localhost:3001/update", { name: name, companyName: companyName, address: address, telephone:telephone,email:email, mobile:mobile, id: id }).then(
      (response) => {
        setContactList(
          contactList.map((val) => {
            return val.id == id
              ? {
                  id: val.id,
                  name: val.name,
                  companyName: val.companyName,
                  address: val.address,
                  telephone: val.telephone,
                  email: val.email,
                  mobile: val.mobile,
                }
              : val;
          })
        );
      }
    );
  };

  const deleteContact = (id) => {
    Axios.delete(`http://localhost:3001/delete/${id}`).then((response) => {
      setContactList(
        contactList.filter((val) => {
          return val.id != id;
        })
      );
    });
  };

  return (
    <div className="App">
      <div className="information">
        <label>Name:</label>
        <input
          type="text"
          onChange={(event) => {
            setName(event.target.value);
          }}
        />
        <label>Company Name:</label>
        <input
          type="text"
          onChange={(event) => {
            setCompanyName(event.target.value);
          }}
        />
        <label>Address</label>
        <input
          type="text"
          onChange={(event) => {
            setAddress(event.target.value);
          }}
        />
        <label>TelePhone Number:</label>
        <input
          type="number"
          onChange={(event) => {
            setTelephone(event.target.value);
          }}
        />
        <label>Email:</label>
        <input
          type="text"
          onChange={(event) => {
            setEmail(event.target.value);
          }}
        />
        <label>Mobile Number:</label>
        <input
          type="number"
          onChange={(event) => {
            setMobile(event.target.value);
          }}
        />
        <button onClick={addContact}>Add Contact</button>
      </div>
      <div className="contacts">
        <button onClick={getContact}>Show Contact</button>

        {contactList.map((val, key) => {
          return (
            <div className="contact">
              <div>
                <h3>Name: {val.name}</h3>
                <h3>Company Name: {val.companyName}</h3>
                <h3>Address: {val.address}</h3>
                <h3>TelePhone: {val.telephone}</h3>
                <h3>Email: {val.email}</h3>
                <h3>Mobile Number: {val.mobile}</h3>
              </div>
              <div>
                <input
                  type="text"
                  placeholder="Name"
                  onChange={(event) => {
                    setName(event.target.value);
                  }}
                />

<input
                  type="text"
                  placeholder="Company Name"
                  onChange={(event) => {
                    setCompanyName(event.target.value);
                  }}
                />
                <input
                  type="text"
                  placeholder="Address"
                  onChange={(event) => {
                    setAddress(event.target.value);
                  }}
                />

                 <input
                  type="number"
                  placeholder="Telephone"
                  onChange={(event) => {
                    setTelephone(event.target.value);
                  }}
                />
                 <input
                  type="text"
                  placeholder="Email"
                  onChange={(event) => {
                    setEmail(event.target.value);
                  }}
                />
                 <input
                  type="number"
                  placeholder="Mobile"
                  onChange={(event) => {
                    setMobile(event.target.value);
                  }}
                />
                <button
                  onClick={() => {
                    updateContact(val.id);
                  }}
                >
                  {" "}
                  Update
                </button>

                <button
                  onClick={() => {
                    deleteContact(val.id);
                  }}
                >
                  Delete
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}

export default App;
