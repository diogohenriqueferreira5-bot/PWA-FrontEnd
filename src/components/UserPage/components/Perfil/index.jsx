
import { useEffect } from "react";
import { Container, Row, Col } from "reactstrap";
import { useForm } from "react-hook-form";
import styles from "./styles.module.scss";
import Qrcode from "../../../QrcodeCreate";

export const Perfil = ({ user = { name: "" } }) => {
    const { register, handleSubmit, reset } = useForm();

    useEffect(() => {
        // reset form with user data
        reset(user);
    }, [user, reset]);

    return (
        <Container>
            <Row>
                <Col className={styles.column}>
                    <h3>Perfil</h3>
                    <div className={styles.container}>
                        <form
                            className={styles.form}
                            onSubmit={handleSubmit((data) => {
                                console.log(data);
                            })}
                        >
                            <div className={styles.field}>
                                <label className={styles.label} htmlFor="name">
                                    Name:
                                </label>
                                <input
                                    id="name"
                                    type="text"
                                    required
                                    {...register("name")}
                                />
                            </div>
                            {/* ...campos do formulário (password, email, age, address, country)... */}
                            <Row>
                                <input className="submit" type="submit" />
                            </Row>
                        </form>
                    </div>
                </Col>
                <Col>
                    <div className={styles.qrCodeContainer}>
                        <h2>Qr Code to Login</h2>
                        <Qrcode user={user} />
                    </div>
                </Col>
            </Row>
        </Container>
    );
};