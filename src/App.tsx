import { useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import Container from "./components/Container/Container";
import Layout from "./views/Layout/Layout";
import CountdownPage from "./views/CountdownPage/CountdownPage";
import WordsPage from "./views/WordsPage/WordsPage";
import QuotePage from "./views/QuotePage/QuotePage";
import LeaderbordPage from "./views/LeaderbordPage/LeaderbordPage";
import AboutPage from "./views/AboutPage/AboutPage";
import SettingsPage from "./views/SettingsPage/SettingsPage";
import LoginPage from "./views/LoginPage/LoginPage";
import ContactsPage from "./views/ContactsPage/ContactsPage";
import { useAppDispatch } from "./redux/store";
import { getCurrentUser } from "./redux/auth/auth-operations";
import PublicRoute from "./components/PublicRoute";
import PrivateRoute from "./components/PrivateRoute";
import AccountPage from "./views/AccountPage/AccountPage";
import { useSelector } from "react-redux";
import { selectIsFetchingUser } from "./redux/auth/auth-selectors";
import FetchingUserLoader from "./components/FetchingUserLoader/FetchingUserLoader";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  const dispatch = useAppDispatch();
  const isFetchingUser = useSelector(selectIsFetchingUser);

  useEffect(() => {
    dispatch(getCurrentUser());
  }, [dispatch]);

  return isFetchingUser ? (
    <FetchingUserLoader />
  ) : (
    <Container>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<CountdownPage />} />
          <Route path="/words" element={<WordsPage />} />
          <Route path="/quote" element={<QuotePage />} />
          <Route path="/leaderbord" element={<LeaderbordPage />} />
          <Route path="/about" element={<AboutPage />} />
          <Route path="/settings" element={<SettingsPage />} />
          <Route path="/contacts" element={<ContactsPage />} />
          <Route
            path="/login"
            element={
              <PublicRoute component={<LoginPage />} redirectTo="/account" />
            }
          />
          <Route
            path="/account"
            element={
              <PrivateRoute component={<AccountPage />} redirectTo="/login" />
            }
          />
        </Route>
      </Routes>
      <ToastContainer
        position="top-center"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss={false}
        draggable
        pauseOnHover={false}
        theme="dark"
      />
    </Container>
  );
}

export default App;
