import Link from "next/link";
import { useRouter } from "next/router";
import React, { useEffect, useState } from "react";

const Update = () => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    phone: "",
  });

  const router = useRouter();
  const { id } = router.query;

  //Fetch Data From Specific Id
  useEffect(() => {
    try {
      fetch(`http://localhost:3004/users/${id}`).then((res) =>
        res.json().then((data) => setValues(data))
      );
    } catch (error) {
      console.log(error);
    }
  }, []);

  //Update The Fetched Data
  const handleUpdate = (e) => {
    e.preventDefault();

    fetch(`http://localhost:3004/users/${id}`, {
      method: "PUT",
      "Content-Type": "application/json",
      body: JSON.stringify({
        name: values.name,
        email: values.email,
        phone: values.phone,
      }),
    })
      .then((res) => {
        res.json();
        router.push("/");
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="create-user">
      <form onSubmit={handleUpdate} className="user-form">
        <input
          name="name"
          placeholder="Name..."
          value={values.name}
          onChange={(e) => setValues({ ...values, name: e.target.value })}
        />
        <br />
        <input
          name="email"
          placeholder="Email..."
          value={values.email}
          onChange={(e) => setValues({ ...values, email: e.target.value })}
        />
        <br />
        <input
          name="phone"
          placeholder="Phone..."
          value={values.phone}
          onChange={(e) => setValues({ ...values, phone: e.target.value })}
        />
        <br />

        <div className="submit-data">
          <button className="btn-sub">Update</button>
          <Link href="/">
            <button className="btn-sub">Back</button>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Update;
