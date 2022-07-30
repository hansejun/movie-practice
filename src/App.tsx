import { BrowserRouter, Routes, Route } from "react-router-dom";
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
          <Route path="/movie" element={<Movie />} />
          <Route path="/tv" element={<Tv />} />
          <Route path="/myContents" element={<MyContents />} />
          <Route path="/search" element={<Search />} />
          <Route path="/" element={<Home />}>
            <Route path="movies/:id" element={<Home />} />
          </Route>
        </Routes>
      </BrowserRouter>
      <ReactQueryDevtools initialIsOpen={true} />
    </QueryClientProvider>
  );
}

export default App;
