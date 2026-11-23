import { useForm } from "react-hook-form";
import { Row } from "reactstrap";
import { Navigate } from "react-router-dom";
import { useEffect, useState } from "react";
import styles from "./styles.module.scss";
import { login } from "../../service/api/auth";

const LoginForm = ({ title, role, data }) => {
  const { register, handleSubmit } = useForm();
  const [isLogged, setLogged] = useState(false);

  const authenticate = (data) => {
    login(data)
      .then((response) => {
        if (response.auth) {
          setLogged(response.auth);
        } else {
          alert("Login failed");
        }
      })
      .catch((error) => {
        console.error("Error:", error);
      });
  };

  const onSubmit = (data) => authenticate(data);

  useEffect(() => {
    if (data?.qrToken) {
      authenticate({ qrToken: data.qrToken });
    }
  }, [data]);

  if (isLogged) {
    return role === "admin" ? (
      <Navigate to="/admin" replace={true} />
    ) : (
      <Navigate to="/user" replace={true} />
    );
  }

  return (
    <Row align="middle" justify="center">
      <div className={styles.loginForm}>
        <h2>{title}</h2>
        <form className={styles.formLogin} onSubmit={handleSubmit(onSubmit)}>
          <div className={styles.field}>
            <label className={styles.label} htmlFor="name">Name:</label>
            <input
              id="name"
              name="name"
              required
              {...register("name")}
            />
          </div>
          <div className={styles.field}>
            <label className={styles.label} htmlFor="password">Password:</label>
            <input
              id="password"
              name="password"
              type="password"
              required
              {...register("password")}
            />
          </div>
          <input className="submit" type="submit" />
        </form>
      </div>
    </Row>
  );
};

export default LoginForm;
