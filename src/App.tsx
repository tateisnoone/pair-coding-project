import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import QuizComponent from "./components/card/card";
import SuccessPage from "./components/success-page/success";
import { quiz } from "../src/components/data";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<QuizComponent quiz={quiz} />} />
        <Route path="/success" element={<SuccessPage />} />
      </Routes>
    </Router>
  );
}

export default App;
