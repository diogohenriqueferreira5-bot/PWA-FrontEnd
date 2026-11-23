import { useState } from "react";
import {
  Row,
  Container,
  Nav,
  NavItem,
  NavLink,
  TabContent,
  TabPane,
} from "reactstrap";
import { useGetPerfil } from "../../service/api/userGetPerfil";
import { getPerfil } from "../../service/api/perfil";

import { Tickets } from "./components/Tickets";
import { Perfil } from "./components/Perfil";
import { Member } from "../Member";
import styles from "./styles.module.scss";

const UserPage = () => {
  const [activePage, setActivePage] = useState("1");
  const { isError, isLoading, user } = useGetPerfil(getPerfil);

  const navItems = [
    { id: "1", title: "Perfil" },
    { id: "2", title: "Tickets" },
    { id: "3", title: "Member" },
  ];

  if (isLoading) {
    return <p>A carregar perfil...</p>;
  }

  if (isError || !user?.data) {
    return <p>Erro ao carregar o perfil.</p>;
  }

  const items = [
    {
      id: "1",
      children: <Perfil user={user.data} />,
    },
    {
      id: "2",
      children: <Tickets />,
    },
    {
      id: "3",
      children: <Member user={user.data} />,
    },
  ];

  return (
    <Container className={styles.container}>
      <h1>User {user?.data?.name}</h1>
      <Row className={styles.row}>
        <Nav tabs>
          {navItems.map((item) => (
            <NavItem key={item.id}>
              <NavLink
                className={item.id === activePage ? "active" : ""}
                onClick={() => setActivePage(item.id)}
              >
                {item.title}
              </NavLink>
            </NavItem>
          ))}
        </Nav>

        <TabContent activeTab={activePage}>
          {items.map((item) => (
            <TabPane tabId={item.id} key={item.id}>
              {item.children}
            </TabPane>
          ))}
        </TabContent>
      </Row>
    </Container>
  );
};

export default UserPage;