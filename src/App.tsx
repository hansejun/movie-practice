import { BrowserRouter, Routes, Route, useNavigate } from "react-router-dom";
import Home from "./Routes/Home";
import Search from "./Routes/Search";
import Tv from "./Routes/Tv";
import Header from "./components/Header";
import Movie from "./Routes/Movie";
import { QueryClient, QueryClientProvider } from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import MyContents from "./Routes/MyContents";
import { useRecoilState } from "recoil";
import { myContentAtom } from "./atom";
import { useEffect } from "react";
function App() {
  const client = new QueryClient();
  const [myContents, setMycontents] = useRecoilState(myContentAtom);
  useEffect(() => {
    const a = localStorage.getItem("myContents");
    if (a) {
      const getContents = JSON.parse(a as string);
      setMycontents((allContents) => {
        return [...allContents, ...getContents];
      });
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("myContents", JSON.stringify(myContents));
  }, [myContents]);

  return (
    <QueryClientProvider client={client}>
      <BrowserRouter>
        <Header />
        <Routes>
          <Route path="/movie-practice/movie" element={<Movie />} />
          <Route path="/movie-practice/tv" element={<Tv />} />
          <Route path="/movie-practice/myContents" element={<MyContents />} />
          <Route path="/movie-practice/search" element={<Search />} />
          <Route path="/movie-practice" element={<Home />} />
        </Routes>
      </BrowserRouter>
      <ReactQueryDevtools initialIsOpen={true} />
    </QueryClientProvider>
  );
}

export default App;
