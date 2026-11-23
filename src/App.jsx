import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { useEffect } from "react";
import styles from "./App.module.scss";
import HomePage from "./components/HomePage";
import AdminPage from "./components/AdminPage";
import UserPage from "./components/UserPage";
import Header from "./components/Header";
import ProtectedRoute from "./components/ProtectRoute";
import { UsersProvider } from "./contexts/UsersProvider/UsersProvider";
import { TabProvider } from "./components/AdminPage/contexts/TabProvider/TabProvider";
import { ToastContainer } from "react-toastify";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  initSocket,
  socketAddListener,
  socketRemoveListener,
} from "./socket/socket";

function App() {
  useEffect(() => {
    initSocket();

    const handleNotification = (data) => {
      const notify = data.key === "Game" ? toast.warn : toast.info;
      notify(data.message, {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: false,
        pauseOnHover: true,
        draggable: true,
        theme: "dark",
      });
    };

    socketAddListener("admin_notifications", handleNotification);
    return () => socketRemoveListener("admin_notifications", handleNotification);
  }, []);

  const router = createBrowserRouter([
    {
      path: "/",
      element: <HomePage />,
    },
    {
      path: "/admin",
      element: (
        <ProtectedRoute>
          <TabProvider>
            <AdminPage />
          </TabProvider>
        </ProtectedRoute>
      ),
    },
    {
      path: "/user",
      element: (
        <ProtectedRoute>
          <UserPage />
        </ProtectedRoute>
      ),
    },
  ]);

  return (
    <div className={styles.App}>
      <ToastContainer />
      <UsersProvider>
        <Header />
        <main>
          <RouterProvider router={router} />
        </main>
      </UsersProvider>
    </div>
  );
}

export default App;
