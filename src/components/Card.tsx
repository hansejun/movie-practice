import { motion, AnimatePresence } from "framer-motion";
import { useRecoilState, useRecoilValue } from "recoil";
import styled from "styled-components";
import { idAtom, isClickAtom, itemAtom } from "../atom";
import { makeImagePath } from "../util";

const Box = styled(motion.div)`
  width: 300px;
  height: 400px;
  position: fixed;
  top: 30%;
  left: 0px;
  right: 0px;
  margin: 0 auto;
  background-color: #141414;
  border-radius: 10px;
  display: grid;
  grid-template-rows: 1fr 1fr;
`;
const BoxPoster = styled.div<{ bgImage: string }>`
  width: 100%;
  height: 100%;
  background: url(${(props) => props.bgImage});
  background-position: center center;
  background-size: cover;
  border-radius: 10px 10px 0px 0px;
`;
function Card() {
  const id = useRecoilValue(idAtom);
  const data = useRecoilValue(itemAtom);
  const [isClick, setIsClick] = useRecoilState(isClickAtom);
  console.log(data);
  return (
    <AnimatePresence>
      {isClick ? (
        <Box layoutId={id} onClick={() => setIsClick(false)}>
          <BoxPoster bgImage={makeImagePath(data?.backdrop_path + "" || "")} />
          {data.title || data.name}
        </Box>
      ) : null}
    </AnimatePresence>
  );
}
export default Card;
