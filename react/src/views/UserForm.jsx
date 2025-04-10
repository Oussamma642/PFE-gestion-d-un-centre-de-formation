import React, {useEffect, useState } from "react";
import { data, useNavigate, useParams } from "react-router-dom";
import axiosClient from "../axios-client";
import { useStateContext } from "../contexts/ContextProvider";

function UserForm() {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState(null);

  const {setNotification} = useStateContext();

  const navigate = useNavigate();

  const [user, setUser] = useState({
    id: null,
    name: "",
    email: "",
    password: "",
    password_confirmation: "",
  });

  
  useEffect(() => {
    if (!id) return;

    setLoading(true);
    axiosClient
      .get(`/users/${id}`)
      .then(({ data }) => {
        setLoading(false);
        setUser(data);
      })
      .catch(() => {
        setLoading(false);
      });
  }, [id]);  // Include id as a dependency
  

  const onSubmit = (ev) => {
    ev.preventDefault();
    if (user.id) 
    {
      axiosClient.put(`/users/${user.id}`, user)
        .then(() => {
          setNotification("User was succufully updated");
          navigate("/users");
        })
        .catch((err) => {
          const response = err.response;
          if (response && response.status === 422) {
            setErrors(response.data.errors);
          }
        });
    }
    else
    {
        axiosClient.post(`/users`, user)
        .then(() => {
          setNotification("User was succufully created");
          navigate("/users");
        })
        .catch((err) => {
          const response = err.response;
          if (response && response.status === 422) {
            setErrors(response.data.errors);
          }
        });
    }
  };

  return (
    <>
      {user.id && <h1>Update User for {user.name} </h1>}
      {!user.id && <h1>New User</h1>}
      <div className="card animated fadeInDown">
        {loading && <div className="text-center">Loading...</div>}

        {errors && (
          <div className="alert">
            {Object.keys(errors).map((key) => (
              <p key={key}>{errors[key][0]}</p>
            ))}
          </div>
        )}

        {!loading && (
          <form onSubmit={onSubmit}>
            <input
              onChange={(ev) =>
                setUser((p) => ({ ...p, name: ev.target.value }))
              }
              type="text"
              value={user.name}
              placeholder="Name"
            />
            <input
              onChange={(ev) =>
                setUser((p) => ({ ...p, email: ev.target.value }))
              }
              type="email"
              value={user.email}
              placeholder="Email"
            />
            <input
              onChange={(ev) =>
                setUser((p) => ({ ...p, password: ev.target.value }))
              }
              type="password"
              placeholder="Password"
            />
            <input
              onChange={(ev) =>
                setUser((p) => ({
                  ...p,
                  password_confirmation: ev.target.value,
                }))
              }
              type="password"
              placeholder="Password Confirmation"
            />
            <button type="submit" className="btn">
              {" "}
              Save{" "}
            </button>
          </form>
        )}
      </div>
    </>
  );
}

export default UserForm;
