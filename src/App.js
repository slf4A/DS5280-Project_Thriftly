import "./App.css"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Header from "./components/Header";
import Footer from "./components/Footer";
import ChatPopup from "./components/ChatPopup";

import Home from "./pages/Home";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
      <Footer />
      <ChatPopup />
    </Router>
  );
}

export default App;