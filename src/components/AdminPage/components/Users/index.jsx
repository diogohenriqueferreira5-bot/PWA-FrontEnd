import { useEffect, useContext} from "react";
import { Container, Row, Col } from "reactstrap";
import Table from "../../../Table";
import { useForm } from "react-hook-form";
import styles from "./styles.module.scss";
import { useGetData } from "../../hooks/useGetData";
import { usePostData } from "../../hooks/usePostData";
import { getUsers, createUser } from "../../../../service/api/users";
import { UsersContext } from "../../../../contexts/UsersProvider";

const Users = () => {
  const { register, handleSubmit } = useForm();
  const { setUsers } = useContext(UsersContext);
  const { isError, isLoading, data, load } = useGetData(getUsers, 0, 0);
  const { isLoading: isLoadingPost, addData } = usePostData(createUser);


const addUser = (formData) => {
  addData({
    ...formData,
    role: { name: "NonMember", scope: "notMember" },
  })
    .then(() => load())
    .catch((error) => {
      console.error("Erro ao atualizar a tabela de utilizadores:", error);
    });
};

useEffect(() => {
  if (data?.data) {
    setUsers(data.data);
  }
}, [data, setUsers]);

  if (isLoading) {
    return <div>Is Loading</div>;
  }

  if (isError) {
    return <div>UPPSSSS</div>;
  }

  return (
    <Container>
      <Row>
        <Col className={styles.column}>
          <h3>Create User</h3>
          <div className={styles.container}>
            {isLoadingPost ? (
              <div>Is Loading</div>
            ) : (
              <div className={styles.container}>
                <form className={styles.form} onSubmit={handleSubmit(addUser)}>
                  <div className={styles.field}>
                    <label className={styles.label} htmlFor="name">
                      Name:
                    </label>
                    <input
                      id="name"
                      type="name"
                      name="name"
                      required="required"
                      {...register("name")}
                    />
                  </div>
                  <div className={styles.field}>
                    <label className={styles.label} htmlFor="password">
                      Password:
                    </label>
                    <input
                      id="password"
                      type="password"
                      name="password"
                      required="required"
                      {...register("password")}
                    />
                  </div>
                  <div className={styles.field}>
                    <label className={styles.label} htmlFor="email">
                      Email:
                    </label>
                    <input
                      id="email"
                      type="email"
                      name="email"
                      required="required"
                      {...register("email")}
                    />
                  </div>
                  <div className={styles.field}>
                    <label className={styles.label} htmlFor="age">
                      Age :
                    </label>
                    <input id="age" name="age" type="number" {...register("age")} />
                  </div>
                  <div className={styles.field}>
                    <label className={styles.label} htmlFor="address">
                      Address :
                    </label>
                    <input
                      id="address"
                      name="address"
                      required="required"
                      {...register("address")}
                    />
                  </div>
                  <div className={styles.field}>
                    <label className={styles.label} htmlFor="country">
                      Country :
                    </label>
                    <input
                      id="country"
                      name="country"
                      required="required"
                      {...register("country")}
                    />
                  </div>
                  <Row>
                    <input className="submit" type="submit" />
                  </Row>
                </form>
              </div>
            )}
          </div>
        </Col>
        <Col>
          <Table columns={["name", "email", "age", "address", "country", "role.name"]} rows={data} />
        </Col>
      </Row>
    </Container>
  );
};

export default Users;
