import { motion } from "framer-motion";

import styled from "styled-components";
import { IMovieResult, ITvResult } from "../api";
import { AnimatePresence } from "framer-motion";
import { useState } from "react";
import { makeImagePath } from "../util";
import { useRecoilState, useSetRecoilState } from "recoil";
import { dataTypeAtom, idAtom, isClickAtom, itemAtom } from "../atom";
const SliderWrapper = styled(motion.div)`
  width: 100%;
  display: flex;
  flex-direction: column;
  margin-top: 60px;
  overflow: hidden;
  height: 230px;
`;
const TitleBox = styled(motion.div)`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  cursor: pointer;
`;
const Title = styled(motion.h1)`
  font-size: 35px;
  margin-right: 15px;
  font-weight: 600;
  color: rgba(255, 255, 255, 0.85);
  &:hover {
    color: rgba(255, 255, 255, 1);
  }
`;
const TitleDetail = styled(motion.span)`
  font-weight: 600;
  font-size: 15px;
  position: relative;
  top: 5px;
  color: red;
  svg {
    width: 6px;
    top: -1px;
    position: relative;
    margin-left: 7px;
    stroke-width: 10px;
  }
  display: flex;
  align-items: center;
`;
const Row = styled(motion.div)`
  position: relative;
  width: 100%;
`;
const RowSlider = styled(motion.ul)`
  width: 100%;
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 5px;
  position: absolute;
  cursor: pointer;
`;
const RowSliderItem = styled(motion.li)<{ bgImage: string }>`
  height: 160px;
  background-image: url(${(props) => props.bgImage});
  background-position: center center;
  background-size: cover;
  &:first-child {
    transform-origin: center left;
  }
  &:last-child {
    transform-origin: center right;
  }
  display: flex;
  justify-content: center;
  align-items: center;
`;
const RowSliderBtn = styled(motion.span)`
  position: absolute;
  width: 50px;
  height: 160px;
  background-color: rgba(0, 0, 0, 0.3);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 50;
  cursor: pointer;
  svg {
    width: 15px;
    transition: width 0.5s, color 0.5s;
    color: rgba(255, 255, 255, 0.5);
  }
  &:hover {
    svg {
      width: 20px;
      color: rgba(255, 255, 255, 1);
    }
  }
`;

const ChangeBtns = styled.div`
  width: 200px;
  height: 40px;
  border: 1px solid black;
  border-radius: 20px;
  display: grid;
  grid-template-columns: 1fr 1fr;
`;
const ChangeBtn = styled(motion.span)`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  height: 100%;
  border-radius: 20px;
  position: relative;
  font-size: 16px;
  font-weight: 600;
`;
const ChangeBtnFill = styled(motion.span)`
  width: 100%;
  height: 100%;
  border-radius: 20px;
  background: linear-gradient(
    135deg,
    rgba(255, 50, 149, 1),
    rgba(211, 0, 0, 1)
  );
  position: absolute;
  z-index: -1;
`;

interface ISlider {
  text: string;
  contentType: string;
  dataTv?: ITvResult;
  dataMovie?: IMovieResult;
  isHome?: boolean;
  contentKey?: string;
}

const rowVar = {
  initial: { opacity: 0, filter: "blur(5px)" },
  animate: { opacity: 1, filter: "blur(0px)" },
  exit: { opacity: 0, filter: "blur(5px)" },
};
const btnVar = {
  initial: { opacity: 0 },
  animate: { opacity: 1 },
  end: { opacity: 0, scale: 1 },
  hover: { backgroundColor: "rgba(0,0,0,0.7)" },
};
const sliderVar = {
  initial: (next: boolean) => ({
    x: next ? window.innerWidth * 0.9 + 5 : -window.innerWidth * 0.9 - 5,
  }),
  animate: { x: 0 },
  exit: (next: boolean) => ({
    x: next ? -window.innerWidth * 0.9 - 5 : window.innerWidth * 0.9 + 5,
  }),
};

const detailTextVar = {
  initial: { opacity: 0, x: -20 },
  animate: { opacity: 1, x: 0 },
  exit: { opacity: 0, x: -15 },
};
const detailSvgVar = {
  initial: { x: -40 },
  animate: { x: 0, opacity: 1 },
  exit: { opacity: 0 },
};

function Slider({
  text,
  contentType,
  dataTv,
  dataMovie,
  isHome,
  contentKey,
}: ISlider) {
  const isMovie = contentType == "movies" ? true : false;
  const offset = 6;
  const [index, setIndex] = useState(0);
  const data = dataTv || dataMovie;
  const pageBtnClick = (bool: boolean) => {
    setNext(bool);
    if (data) {
      const moviesLength = data?.results.length - 1;
      const maxIndex = Math.floor(moviesLength / offset);
      if (next) {
        setIndex((prev) => (prev == maxIndex ? 0 : prev + 1));
      } else {
        setIndex((prev) => (prev == 0 ? maxIndex : prev - 1));
      }
    }
  };

  const [isHover, setIsHover] = useState(false);
  const [isTitleHover, setIsTitleHover] = useState(false);
  const [next, setNext] = useState(true);

  const setId = useSetRecoilState(idAtom);
  const setItemData = useSetRecoilState(itemAtom);
  const setIsClick = useSetRecoilState(isClickAtom);
  const [dataType, setDataType] = useRecoilState(dataTypeAtom);
  return (
    <>
      <AnimatePresence>
        <SliderWrapper>
          <TitleBox>
            <Title
              onHoverStart={() => setIsTitleHover(true)}
              onHoverEnd={() => setIsTitleHover(false)}
            >
              {text}
            </Title>
            {isHome ? (
              <ChangeBtns>
                <ChangeBtn
                  onClick={() =>
                    setDataType((prev) => {
                      return { ...dataType, [contentKey as string]: "movies" };
                    })
                  }
                >
                  Movie
                  {dataType[contentKey as string] == "movies" ? (
                    <ChangeBtnFill layoutId={text + "changeMode"} />
                  ) : null}
                </ChangeBtn>
                <ChangeBtn
                  onClick={() =>
                    setDataType((prev) => {
                      return { ...dataType, [contentKey as string]: "tvShows" };
                    })
                  }
                >
                  Tv
                  {dataType[contentKey as string] == "tvShows" ? (
                    <ChangeBtnFill layoutId={text + "changeMode"} />
                  ) : null}
                </ChangeBtn>
              </ChangeBtns>
            ) : (
              <AnimatePresence>
                {isTitleHover ? (
                  <TitleDetail>
                    <motion.span
                      variants={detailTextVar}
                      initial="initial"
                      animate="animate"
                      exit="exit"
                      transition={{ duration: 0.5 }}
                    >
                      Detail
                    </motion.span>
                    <motion.svg
                      variants={detailSvgVar}
                      initial="initial"
                      animate="animate"
                      exit="exit"
                      fill="currentColor"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 256 512"
                    >
                      <motion.path
                        strokeWidth="60"
                        stroke="red"
                        d="M64 448c-8.188 0-16.38-3.125-22.62-9.375c-12.5-12.5-12.5-32.75 0-45.25L178.8 256L41.38 118.6c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0l160 160c12.5 12.5 12.5 32.75 0 45.25l-160 160C80.38 444.9 72.19 448 64 448z"
                      />
                    </motion.svg>
                  </TitleDetail>
                ) : null}
              </AnimatePresence>
            )}
          </TitleBox>
          <Row
            variants={rowVar}
            initial="initial"
            animate="animate"
            exit="exit"
            transition={{ duration: 1 }}
            key={dataType[contentKey as string]}
            onHoverStart={() => setIsHover(true)}
            onHoverEnd={() => setIsHover(false)}
          >
            <AnimatePresence initial={false} custom={next}>
              <RowSlider
                key={index}
                variants={sliderVar}
                initial="initial"
                animate="animate"
                exit="exit"
                custom={next}
                transition={{ type: "tween", duration: 1 }}
              >
                {data?.results
                  .slice(offset * index, offset * index + offset)
                  .map((movie) => (
                    <RowSliderItem
                      key={movie.id}
                      layoutId={text + movie.id}
                      bgImage={makeImagePath(movie.backdrop_path + "")}
                      whileHover={{ scale: 1.2, transition: { delay: 0.4 } }}
                      onClick={() => {
                        setId(text + movie.id);
                        setItemData(movie);
                        setIsClick(true);
                      }}
                    >
                      {movie.backdrop_path == null ? (
                        <p>{movie.title || movie.name}</p>
                      ) : null}
                    </RowSliderItem>
                  ))}
              </RowSlider>
            </AnimatePresence>
            <AnimatePresence>
              {isHover ? (
                <>
                  <RowSliderBtn
                    key={"323"}
                    style={{ left: 0 }}
                    variants={btnVar}
                    initial="initial"
                    animate="animate"
                    exit="end"
                    whileHover="hover"
                    onClick={() => pageBtnClick(false)}
                  >
                    <motion.svg
                      fill="currentColor"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 256 512"
                    >
                      <path d="M192 448c-8.188 0-16.38-3.125-22.62-9.375l-160-160c-12.5-12.5-12.5-32.75 0-45.25l160-160c12.5-12.5 32.75-12.5 45.25 0s12.5 32.75 0 45.25L77.25 256l137.4 137.4c12.5 12.5 12.5 32.75 0 45.25C208.4 444.9 200.2 448 192 448z" />
                    </motion.svg>
                  </RowSliderBtn>
                  <RowSliderBtn
                    key={"324"}
                    style={{ right: 0 }}
                    onClick={() => pageBtnClick(true)}
                    variants={btnVar}
                    initial="initial"
                    animate="animate"
                    exit="end"
                    whileHover="hover"
                  >
                    <motion.svg
                      fill="currentColor"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 256 512"
                    >
                      <path d="M64 448c-8.188 0-16.38-3.125-22.62-9.375c-12.5-12.5-12.5-32.75 0-45.25L178.8 256L41.38 118.6c-12.5-12.5-12.5-32.75 0-45.25s32.75-12.5 45.25 0l160 160c12.5 12.5 12.5 32.75 0 45.25l-160 160C80.38 444.9 72.19 448 64 448z" />
                    </motion.svg>
                  </RowSliderBtn>
                </>
              ) : null}
            </AnimatePresence>
          </Row>
        </SliderWrapper>
      </AnimatePresence>
    </>
  );
}
export default Slider;
