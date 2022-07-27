import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useQuery } from "react-query";
import styled from "styled-components";
import { getMovies, IMovieResult } from "../api";
import Slider from "../components/Slider";
import { makeImagePath } from "../util";

const Wrapper = styled.div`
  width: 100%;
  height: 200vh;
  padding: 0 3vw;

  z-index: -1;
  margin-top: 70px;
`;
const FirstContainer = styled.div`
  width: 100%;
  height: 80vh;
  display: grid;
  grid-template-columns: 1fr 2.5fr;
  position: relative;
  overflow: hidden;
`;
const SideBox = styled(motion.div)`
  width: 100%;
  height: 80vh;
  display: grid;
  grid-template-rows: 50px 1fr;
  position: relative;
`;
const NowPlayBox = styled.div`
  width: 100%;
  height: 100%;
  font-size: 16px;
  font-weight: 500;
  z-index: 50;
  background-color: black;
  display: flex;
  justify-content: center;
  align-items: center;
`;
const SideItems = styled(motion.ul)`
  width: 100%;
  height: 100%;
  display: grid;
  gap: 3px;
  grid-template-rows: repeat(6, 1fr);
  position: absolute;
`;
const SideItem = styled(motion.li)`
  width: 100%;
  min-height: 100px;
  background-color: rgba(0, 0, 0, 0.4);
  display: grid;
  grid-template-columns: 1fr 1.5fr;
  cursor: pointer;
`;
const SideItemPoster = styled.div<{ bgImage: string | undefined }>`
  background-image: url(${(props) => props.bgImage});
  background-position: center center;
  background-size: cover;
`;
const SideItemText = styled(motion.div)`
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-left: 13px;
  h2 {
    font-weight: 600;
    margin-bottom: 5px;
  }
  p {
    font-size: 13px;
    opacity: 0.7;
  }
  transform-origin: left bottom;
  z-index: 100;
`;
const SideBtn = styled(motion.div)`
  width: 40px;
  height: 40px;
  background-color: rgba(0, 0, 0, 0.7);
  border-radius: 50%;
  position: absolute;
  left: 0;
  right: 0;
  margin: 0 auto;
  display: flex;
  justify-content: center;
  align-items: center;
  cursor: pointer;
  svg {
    fill: rgba(255, 255, 255, 0.7);
    width: 15px;
  }
  &:hover {
    svg {
      fill: rgba(255, 255, 255, 1);
    }
  }
  z-index: 100;
`;
const Poster = styled(motion.div)<{ bgImage: string | undefined }>`
  width: 100%;
  height: 80vh;
  background-image: linear-gradient(rgba(0, 0, 0, 0), rgba(0, 0, 0, 0.8)),
    url(${(props) => props.bgImage});
  background-position: center center;
  background-size: cover;
  display: flex;
  justify-content: center;
  flex-direction: column;
  padding-left: 40px;
`;
const PosterTitle = styled.h1`
  font-size: 65px;
  font-weight: 600;
  margin-bottom: 20px;
  margin-top: 30vh;
`;
const PosterOverview = styled.p`
  width: 70%;
  color: rgba(255, 255, 255, 0.7);
`;

const rowVar = {
  initial: (isUp: boolean) => ({
    y: isUp ? window.innerHeight * 0.75 + 5 : -(window.innerHeight * 0.75) - 5,
  }),
  animate: { y: 0 },
  exit: (isUp: boolean) => ({
    y: isUp ? -(window.innerHeight * 0.75) - 5 : window.innerHeight * 0.75 + 5,
  }),
};

const btnVar = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  exit: { opacity: 0 },
};
const itemVar = {
  initial: { scale: 1 },
  hover: {
    scaleX: 1.1,
    backgroundColor: "black",
    transition: { delay: 0.5, duration: 0.3 },
  },
};
function Movie() {
  const { data, isLoading } = useQuery<IMovieResult>(
    ["movies,nowPlaying"],
    getMovies,
    {
      refetchOnWindowFocus: true,
    }
  );
  console.log("movie data", data);
  let offset = 6;
  const [index, setIndex] = useState(0);
  const [isUp, setIsUp] = useState(true);
  const [isHover, setIsHover] = useState(false);
  const [leaving, setLeaving] = useState(false);
  const toggleUpBtn = (bool: boolean) => {
    setIsUp(bool);
    if (data) {
      if (leaving) return;
      toggleLeaving();
      const moviesLength = data?.results.length - 1;
      const maxIndex = Math.floor(moviesLength / offset);
      if (isUp) {
        setIndex((prev) => (prev === maxIndex ? 0 : prev + 1));
      } else {
        setIndex((prev) => (prev === 0 ? maxIndex : prev - 1));
      }
    }
  };
  const toggleLeaving = () => setLeaving((prev) => !prev);
  return (
    <Wrapper>
      <FirstContainer>
        <SideBox
          onHoverStart={() => setIsHover((prev) => !prev)}
          onHoverEnd={() => setIsHover((prev) => !prev)}
        >
          <NowPlayBox>NOW PLAYING</NowPlayBox>
          <div style={{ position: "relative" }}>
            <AnimatePresence
              initial={false}
              onExitComplete={toggleLeaving}
              custom={isUp}
            >
              <SideItems
                key={index}
                custom={isUp}
                variants={rowVar}
                initial="initial"
                animate="animate"
                exit="exit"
                transition={{ type: "tween", duration: 1 }}
              >
                {data?.results
                  .slice(offset * index, offset * index + offset)
                  .map((movie) => (
                    <SideItem key={movie.id}>
                      <SideItemPoster
                        bgImage={makeImagePath(movie.backdrop_path + "")}
                      />
                      <SideItemText
                        variants={itemVar}
                        initial="initial"
                        whileHover="hover"
                        transition={{ type: "tween" }}
                      >
                        <h2>{movie.title}</h2>
                        <p>
                          Average: <span>{movie.vote_average}</span>
                        </p>
                      </SideItemText>
                    </SideItem>
                  ))}
              </SideItems>
            </AnimatePresence>
          </div>
          <AnimatePresence>
            {isHover ? (
              <>
                <SideBtn
                  style={{ top: 50 }}
                  onClick={() => toggleUpBtn(false)}
                  variants={btnVar}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                >
                  <svg
                    color="currentColor"
                    style={{ transform: "rotateZ(-90deg)" }}
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 384 512"
                  >
                    <path d="M361 215C375.3 223.8 384 239.3 384 256C384 272.7 375.3 288.2 361 296.1L73.03 472.1C58.21 482 39.66 482.4 24.52 473.9C9.377 465.4 0 449.4 0 432V80C0 62.64 9.377 46.63 24.52 38.13C39.66 29.64 58.21 29.99 73.03 39.04L361 215z" />
                  </svg>
                </SideBtn>
                <SideBtn
                  style={{ bottom: 0 }}
                  onClick={() => toggleUpBtn(true)}
                  variants={btnVar}
                  initial="initial"
                  animate="animate"
                  exit="exit"
                >
                  <svg
                    color="currentColor"
                    xmlns="http://www.w3.org/2000/svg"
                    style={{ transform: "rotateZ(90deg)" }}
                    viewBox="0 0 384 512"
                  >
                    <path d="M361 215C375.3 223.8 384 239.3 384 256C384 272.7 375.3 288.2 361 296.1L73.03 472.1C58.21 482 39.66 482.4 24.52 473.9C9.377 465.4 0 449.4 0 432V80C0 62.64 9.377 46.63 24.52 38.13C39.66 29.64 58.21 29.99 73.03 39.04L361 215z" />
                  </svg>
                </SideBtn>
              </>
            ) : null}
          </AnimatePresence>
        </SideBox>
        <Poster bgImage={makeImagePath(data?.results[0].backdrop_path + "")}>
          <PosterTitle>{data?.results[0].title}</PosterTitle>
          <PosterOverview>{data?.results[0].overview}</PosterOverview>
        </Poster>
      </FirstContainer>
      <Slider text={"What's Popular"} type={"popular"} />
      <Slider type={"topRated"} text={"Top Rated"} />
      <Slider type={"upcoming"} text={"Upcoming Movies"} />
    </Wrapper>
  );
}
export default Movie;
