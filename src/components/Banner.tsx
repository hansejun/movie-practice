import styled from "styled-components";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import {
  getMovies,
  getTvshows,
  IMovieResult,
  ITvResult,
  ITv,
  IMoive,
} from "../api";
import { makeImagePath } from "../util";
import { useQuery } from "react-query";
import { useEffect } from "react";
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
    backgroundColor: "rgba(0, 0, 0, 1)",
    transition: { delay: 0.5, duration: 0.3 },
  },
};

interface IBanner {
  contentType: string;
  dataTv?: ITvResult;
  dataMovie?: IMovieResult;
}
function Banner({ contentType, dataTv, dataMovie }: IBanner) {
  const isMovie = contentType == "movies" ? true : false;
  const data = isMovie ? dataMovie : dataTv;
  let offset = 6;
  const [index, setIndex] = useState(0);
  const [isUp, setIsUp] = useState(true);
  const [isHover, setIsHover] = useState(false);
  const [leaving, setLeaving] = useState(false);
  const [poster, setPoster] = useState(data?.results[0]);

  const toggleUpBtn = (bool: boolean) => {
    setIsUp(bool);
    if (data) {
      if (leaving) return;
      toggleLeaving();
      const moviesLength = data?.results.length;
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
                  <SideItem key={movie.id} onClick={() => setPoster(movie)}>
                    <SideItemPoster
                      bgImage={makeImagePath(movie.backdrop_path + "")}
                    />
                    <SideItemText
                      variants={itemVar}
                      initial="initial"
                      whileHover="hover"
                      transition={{ type: "tween" }}
                    >
                      <h2>{isMovie ? movie?.title : movie?.name}</h2>
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
      <AnimatePresence initial={false}>
        <Poster
          bgImage={makeImagePath(
            poster
              ? poster?.backdrop_path + ""
              : data?.results[0].backdrop_path + ""
          )}
        >
          <PosterTitle>
            {isMovie
              ? poster
                ? poster?.title
                : data?.results[0].title
              : poster
              ? poster?.name
              : data?.results[0].name}
          </PosterTitle>
          <PosterOverview>
            {poster ? poster?.overview : data?.results[0].overview}
          </PosterOverview>
        </Poster>
      </AnimatePresence>
    </FirstContainer>
  );
}
export default Banner;
