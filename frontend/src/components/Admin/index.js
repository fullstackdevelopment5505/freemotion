import React, { useState, useEffect } from "react";
import { withFirebase } from "../Firebase";

const AdminPage = ({ firebase }) => {
  const [loading, setLoading] = useState(false);
  const [users, setUsers] = useState([]);

  useEffect(() => {
    setLoading(true);

    firebase.users().on("value", (snapshot) => {
      const usersObject = snapshot.val();

      const usersList = Object.keys(usersObject).map((key) => ({
        ...usersObject[key],
        uid: key,
      }));

      setUsers(usersList);
      setLoading(false);
    });
  }, []);

  return (
    <div>
      <h1>Admin</h1>
      {loading && <div>Loading...</div>}
      <UserList users={users} />
    </div>
  );
};

const UserList = ({ users }) => (
  <ul>
    {users.map((user) => (
      <li key={user.uid}>
        <span>ID: {user.uid}</span>
        <span>Name: {user.firstName + " " + user.lastName} </span>
        <span>Email: {user.email}</span>
      </li>
    ))}
  </ul>
);

export default withFirebase(AdminPage);
