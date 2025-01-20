import axios from "axios";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
const Read = () => {
  const [data, setData] = useState([]);
  const router = useRouter();
  const { id } = router.query;
  //Fetch Data From Specific Id
  useEffect(() => {
    try {
      fetch(`http://localhost:3004/users/${id}`).then((res) =>
        res.json().then((data) => setData(data))
      );
    } catch (error) {
      console.log(error);
    }
  }, [data]);

  return (
    <div className="read-data">
      <div className="read-details">
        <p>
          <strong>Name:</strong> {data.name}
        </p>
        <p>
          <strong>Email:</strong> {data.email}
        </p>
        <p>
          <strong>Phone:</strong> {data.phone}
        </p>
      </div>

      <div className="submit-data">
        <Link href={{ pathname: "/update", query: { id: id } }}>
          <button className="btn-sub">Edit</button>
        </Link>
        <Link href="/">
          <button className="btn-sub">Back</button>
        </Link>
      </div>
    </div>
  );
};

export default Read;
