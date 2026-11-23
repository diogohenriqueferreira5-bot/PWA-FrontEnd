import { Container, Row, Col } from "reactstrap";
import Table from "../../../Table";
import { useForm } from "react-hook-form";
import styles from "./styles.module.scss";
import { useGetData } from "../../hooks/useGetData";
import { usePostData } from "../../hooks/usePostData";
import { getGames, createGame } from "../../../../service/api/games";
import { useContext, useEffect } from "react";
import { TabContext } from "../../contexts/TabProvider/TabContext";

const Games = () => {
  const { isError, isLoading, data, load } = useGetData(getGames, 10, 1);
  const { setGames } = useContext(TabContext);
  useEffect(() => {
    setGames(data.data);
  }, [data, setGames]);
  const { register, handleSubmit } = useForm();
  const { isLoading: isLoadingPost, postData } = usePostData(createGame);

  const handleAddGame = (formData) => {
    postData({
      name: formData.name,
      date: formData.date,
      image: formData.image,
      team: {
        home: formData.home,
        visitor: formData.visitor,
      },
    })
      .then(() => load())
      .catch((error) => {
        console.error("Erro ao atualizar a tabela de jogos:", error);
      });
  };

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
          <h3>Create Game</h3>
          {isLoadingPost ? (
            <div> is Loading </div>
          ) : (
            <div className={styles.container}>
              <form
                className={styles.form}
                onSubmit={handleSubmit(handleAddGame)}
              >
                <div className={styles.field}>
                  <label className={styles.label} htmlFor="name">
                    Name:
                  </label>
                  <input id="name" name="name" required {...register("name")} />
                </div>
                <div className={styles.field}>
                  <label className={styles.label} htmlFor="date">
                    Date:
                  </label>
                  <input
                    data-testid="date"
                    placeholder="date"
                    id="date"
                    name="date"
                    type="date"
                    required
                    {...register("date")}
                  />
                </div>
                <div className={styles.field}>
                  <label className={styles.label} htmlFor="image">
                    Image:
                  </label>
                  <input
                    id="image"
                    name="image"
                    required
                    {...register("image")}
                  />
                </div>
                <div className={styles.field}>
                  <label className={styles.label} htmlFor="home">
                    Home team:
                  </label>
                  <input id="home" name="home" required {...register("home")} />
                </div>
                <div className={styles.field}>
                  <label className={styles.label} htmlFor="visitor">
                    Visitor team:
                  </label>
                  <input
                    id="visitor"
                    name="visitor"
                    required
                    {...register("visitor")}
                  />
                </div>
                <Row>
<input data-testid="submitButton" className="submit" type="submit" value="Enviar" />                </Row>
              </form>
            </div>
          )}
        </Col>
        <Col>
          <Table
            columns={["date", "name", "image", "team.visitor", "team.home"]}
            rows={data}
          />
        </Col>
      </Row>
    </Container>
  );
};

export default Games;
