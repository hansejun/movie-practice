import { BrowserRouter, Routes, Route } from "react-router-dom";
import Home from "./Routes/Home";
import Search from "./Routes/Search";
import Tv from "./Routes/Tv";
import Header from "./components/Header";
function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path="/tv" element={<Tv />} />
        <Route path="/search" element={<Search />} />
        <Route path="/" element={<Home />}>
          <Route path="movies/:id" element={<Home />} />
        </Route>
      </Routes>
    </BrowserRouter>
  );
}

export default App;
