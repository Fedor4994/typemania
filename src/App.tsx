import { Routes, Route } from "react-router-dom";

import Container from "./components/Container/Container";
import Layout from "./views/Layout/Layout";
import CountdownPage from "./views/CountdownPage/CountdownPage";
import WordsPage from "./views/WordsPage/WordsPage";
import QuotePage from "./views/QuotePage/QuotePage";

function App() {
  return (
    <Container>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<CountdownPage />} />
          <Route path="/words" element={<WordsPage />} />
          <Route path="quote" element={<QuotePage />} />
        </Route>
      </Routes>
    </Container>
  );
}

export default App;
