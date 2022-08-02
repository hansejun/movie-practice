import { AnimatePresence, motion } from "framer-motion";
import { useQuery } from "react-query";
import { useLocation } from "react-router-dom";
import styled from "styled-components";
import { getSearchMovies, getSearchTvShows, ISearchResult } from "../api";
import { makeImagePath } from "../util";
const Wrapper = styled.div`
  width: 100%;
  height: 100%;
  padding: 5vh 3vw;
  z-index: -1;
  margin-top: 70px;
`;
const GridParent = styled.div`
  margin-bottom: 10vh;
`;
const Title = styled.h1`
  font-size: 30px;
  font-weight: 600;
`;
const Grid = styled.div`
  padding-top: 5vh;
  width: 100%;
  height: 100%;
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  grid-auto-rows: minmax(120px, 1fr);
  gap: 40px 10px;
`;
const GridItem = styled(motion.div)<{ bgImage?: string }>`
  background-image: url(${(props) => props.bgImage});
  background-position: center center;
  background-size: cover;
  display: flex;
  justify-content: center;
  align-items: center;
  text-align: center;
  cursor: pointer;
  border: 0.5px solid rgba(255, 255, 255, 0.2);
  border-radius: 10px;
  max-width: 220px;
`;

const itemVar = {
  initial: { opacity: 0, filter: "blur(5px)" },
  animate: { opacity: 1, filter: "blur(0px)" },
  exit: { opacity: 0, filter: "blur(5px)" },
};
function Search() {
  const location = useLocation();
  const search = new URLSearchParams(location.search);
  const keyword = search.get("keyword");
  const { data: movieData } = useQuery<ISearchResult>(
    ["searchMovies", keyword],
    () => getSearchMovies(keyword as string)
  );
  const { data: TvData } = useQuery<ISearchResult>(
    ["searchTvShows", keyword],
    () => getSearchTvShows(keyword as string)
  );

  return (
    <Wrapper>
      <GridParent>
        <Title>Movie</Title>
        <Grid>
          <AnimatePresence>
            {movieData?.results
              .filter((item) => item.backdrop_path != undefined)
              .map((item) => (
                <GridItem
                  key={item.id}
                  bgImage={makeImagePath(item.backdrop_path + "")}
                  variants={itemVar}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  transition={{ duration: 1 }}
                >
                  {item.backdrop_path == undefined ? item.title : null}
                </GridItem>
              ))}
          </AnimatePresence>
        </Grid>
      </GridParent>
      <GridParent>
        <Title>Tv Show</Title>
        <Grid>
          <AnimatePresence>
            {TvData?.results
              .filter(
                (item) =>
                  item.backdrop_path != null && item.backdrop_path != undefined
              )
              .map((item) => (
                <GridItem
                  key={item.id}
                  bgImage={makeImagePath(item.backdrop_path + "")}
                  variants={itemVar}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                  transition={{ duration: 1 }}
                >
                  {item.backdrop_path == undefined ? item.name : null}
                </GridItem>
              ))}
          </AnimatePresence>
        </Grid>
      </GridParent>
    </Wrapper>
  );
}
export default Search;
