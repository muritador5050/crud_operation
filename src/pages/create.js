import Link from "next/link";
import React, { useState } from "react";
import { useRouter } from "next/router";
const Create = () => {
  const [values, setValues] = useState({
    name: "",
    email: "",
    phone: "",
    image: "",
  });

  const router = useRouter();

  //Add or Create a Data
  const handleSubmit = (e) => {
    e.preventDefault();
    // axios
    //   .post("http://localhost:3004/users", values)
    //   .then((response) => {
    //     setValues(response.data);
    //     router.push("/");
    //   })
    //   .catch((error) => console.log(error));
    fetch("http://localhost:3004/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: values.name,
        email: values.email,
        phone: values.phone,
      }),
    }).then((response) => {
      setValues(response.data);
      router.push("/");
    });
  };

  return (
    <div className="create-user">
      <form onSubmit={handleSubmit} className="user-form">
        <input
          name="name"
          placeholder="Name..."
          onChange={(e) => setValues({ ...values, name: e.target.value })}
        />
        <br />
        <input
          name="email"
          placeholder="Email..."
          onChange={(e) => setValues({ ...values, email: e.target.value })}
        />
        <br />
        <input
          name="phone"
          placeholder="Phone..."
          onChange={(e) => setValues({ ...values, phone: e.target.value })}
        />
        <br />
        <div className="submit-data">
          <button className="btn-sub" type="submit">
            Submit
          </button>
          <Link href="/">
            <button className="btn-sub">Back</button>
          </Link>
        </div>
      </form>
    </div>
  );
};

export default Create;
