import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AddBook from "./pages/AddBook.jsx";
import HomePage from "./pages/HomePage.jsx";
import Dashboard from "./pages/Dashboard.jsx";
import "./assets/sass/main.scss";
import Explore from "./pages/Explore.jsx";
import ListBook from "./pages/ListBook.jsx";
import Login from "./pages/login.jsx";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/explore" element={<Explore />} />
        <Route path="/dashboard">
          <Route index element={<Dashboard />} />
          <Route path="addBook" element={<AddBook />} />
          <Route path="book" element={<ListBook />} />
        </Route>
        <Route path="*" element={<b>Page Not Found</b>} />
      </Routes>
    </Router>
  );
}

export default App;
