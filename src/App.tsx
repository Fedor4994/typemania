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

function App() {
  return (
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
          <Route path="/login" element={<LoginPage />} />
        </Route>
      </Routes>
    </Container>
  );
}

export default App;
