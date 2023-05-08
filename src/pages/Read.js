import axios from "axios";
import React, { useEffect, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/router";
const Read = () => {
  const [data, setData] = useState([]);
  const router = useRouter();
  const { id } = router.query;
  useEffect(() => {
    axios
      .get(`http://localhost:3004/users/${id}`)
      .then((response) => setData(response.data))
      .catch((error) => console.log(error));
  }, []);
  return (
    <div>
      <ul>
        <li>Name: {data.name}</li>
        <li>Email: {data.email}</li>
        <li>Phone: {data.phone}</li>
      </ul>
      <Link href={`Update/${id}`}>
        <button>Edit</button>
      </Link>
      <Link href={`/`}>
        <button>Back</button>
      </Link>
    </div>
  );
};

export default Read;
