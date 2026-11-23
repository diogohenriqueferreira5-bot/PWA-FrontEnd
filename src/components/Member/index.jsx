import { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { Container, Row, Col, Button } from 'reactstrap';
import styles from './styles.module.scss';
import { CameraMedia } from '../CameraMedia';
import { usePostData } from '../AdminPage/hooks/usePostData';
import { useGetMember } from '../../service/api/useGetMember';
import { getMember, createMember } from '../../service/api/member';

export const Member = ({ user }) => {
  const [showForm, setShowForm] = useState(false);
  const [imageSrc, setImageSrc] = useState(null);

  const { isLoading: isLoadingPost, addData } = usePostData((data) =>
    createMember(user._id, data)
  );

  const { member } = useGetMember(getMember, user._id);

  const { register, handleSubmit, reset } = useForm();

  const isMember = user.role ? user.role.scope.includes('member') : false;

  const addMember = (data) => {
    const body = {
      ...data,
      base64image: imageSrc,
    };
    addData(body);
  };

  useEffect(() => {
    if (isMember) {
      // reset form with user data
      reset(member);
    }
  }, [member, isMember]);

    // Se ainda não é member e não clicou no botão → mostra só o botão
  if (!showForm && !isMember) {
    return (
      <Button
        className={styles.button}
        onClick={() => setShowForm(true)}
      >
        Be a Member
      </Button>
    );
  }

  // Já é member → mostra os dados
  if (isMember) {
    return (
      <Container>
        <Row>
          <Col className={styles.column}>
            <h3>Member Perfil</h3>
            <div className={styles.container}>
              <div className={styles.field}>
                <label className={styles.label}>Tax Number:</label>
                <span>{member?.taxNumber}</span>
              </div>
              <div className={styles.field}>
                <label className={styles.label}>Photo:</label>
                {member?.photo && (
                  <img
                    alt="Member"
                    src={`/${member.photo.replace(/^\/+/, '')}`}
                  />
                )}
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    );
  }

  // Não é member, mas clicou no botão → mostra o formulário + câmara
  return (
    <Container>
      <Row>
        <Col className={styles.column}>
          <h3>Become a Member</h3>
          <div className={styles.container}>
            <form
              className={styles.form}
              onSubmit={handleSubmit(addMember)}
            >
              <div className={styles.field}>
                <label className={styles.label} htmlFor="taxNumber">
                  Tax Number:
                </label>
                <input
                  id="taxNumber"
                  type="text"
                  name="taxNumber"
                  required
                  {...register("taxNumber")}
                />
              </div>

              <CameraMedia setImage={setImageSrc} imageFile={imageSrc} />

              <input className="submit" type="submit" value="Submit" />
            </form>
          </div>
        </Col>
      </Row>
    </Container>
  );
};