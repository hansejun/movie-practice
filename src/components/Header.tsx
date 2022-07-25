import styled from "styled-components";
import { motion, useAnimation } from "framer-motion";
import { Link } from "react-router-dom";
import { white } from "jest-matcher-utils/node_modules/chalk";
import { useState } from "react";
const Nav = styled(motion.nav)`
  display: grid;
  grid-template-columns: 1fr 3fr;
  align-items: center;
  position: fixed;
  width: 100%;
  top: 0;
  font-size: 14px;
  padding: 20px 3vw;
  color: white;
  z-index: 99;
  h1 {
    font-size: 26px;
    font-weight: 500;
  }
`;

const NavItem = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
`;
const Col = styled.ul`
  display: flex;
  align-items: center;
`;
const Item = styled(motion.li)`
  font-size: 16px;
  margin-right: 3vw;
  color: rgba(255, 255, 255, 0.7);
  cursor: pointer;
`;
const Col2 = styled.ul`
  display: grid;
  grid-template-columns: 1fr 1fr;
  align-items: center;
`;
const Search = styled.form`
  color: white;
  display: flex;
  align-items: center;
  svg {
    height: 25px;
  }
  position: relative;
  justify-self: end;
`;
const SearchInput = styled(motion.input)``;
const Social = styled.span`
  justify-self: end;
`;
const SocialSvg = styled(motion.svg)`
  margin-left: 20px;
  color: white;
  height: 25px;
`;
function Header() {
  const [openSearch, setOpenSearch] = useState(false);
  return (
    <Nav>
      <Link to="/">
        <h1>NEWFLIX</h1>
      </Link>
      <NavItem>
        <Col>
          <Item>
            <Link to="/">Home</Link>
          </Item>
          <Item>
            <Link to="/">Movie</Link>
          </Item>
          <Item>
            <Link to="/">TV</Link>
          </Item>
          <Item>
            <Link to="/">My contents</Link>
          </Item>
        </Col>
        <Col2>
          <Search>
            <motion.svg
              onClick={() => setOpenSearch((prev) => !prev)}
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <motion.path
                fillRule="evenodd"
                d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                clipRule="evenodd"
              ></motion.path>
            </motion.svg>
            <SearchInput
              placeholder="Search"
              initial={{ scaleX: openSearch ? 0 : 1 }}
              animate={{ scaleX: openSearch ? 1 : 0 }}
            />
          </Search>
          <Social>
            <SocialSvg
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 576 512"
            >
              <path d="M549.655 124.083c-6.281-23.65-24.787-42.276-48.284-48.597C458.781 64 288 64 288 64S117.22 64 74.629 75.486c-23.497 6.322-42.003 24.947-48.284 48.597-11.412 42.867-11.412 132.305-11.412 132.305s0 89.438 11.412 132.305c6.281 23.65 24.787 41.5 48.284 47.821C117.22 448 288 448 288 448s170.78 0 213.371-11.486c23.497-6.321 42.003-24.171 48.284-47.821 11.412-42.867 11.412-132.305 11.412-132.305s0-89.438-11.412-132.305zm-317.51 213.508V175.185l142.739 81.205-142.739 81.201z" />
            </SocialSvg>
            <SocialSvg
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 512 512"
            >
              <path d="M459.37 151.716c.325 4.548.325 9.097.325 13.645 0 138.72-105.583 298.558-298.558 298.558-59.452 0-114.68-17.219-161.137-47.106 8.447.974 16.568 1.299 25.34 1.299 49.055 0 94.213-16.568 130.274-44.832-46.132-.975-84.792-31.188-98.112-72.772 6.498.974 12.995 1.624 19.818 1.624 9.421 0 18.843-1.3 27.614-3.573-48.081-9.747-84.143-51.98-84.143-102.985v-1.299c13.969 7.797 30.214 12.67 47.431 13.319-28.264-18.843-46.781-51.005-46.781-87.391 0-19.492 5.197-37.36 14.294-52.954 51.655 63.675 129.3 105.258 216.365 109.807-1.624-7.797-2.599-15.918-2.599-24.04 0-57.828 46.782-104.934 104.934-104.934 30.213 0 57.502 12.67 76.67 33.137 23.715-4.548 46.456-13.32 66.599-25.34-7.798 24.366-24.366 44.833-46.132 57.827 21.117-2.273 41.584-8.122 60.426-16.243-14.292 20.791-32.161 39.308-52.628 54.253z" />
            </SocialSvg>
            <SocialSvg
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 448 512"
            >
              <path d="M400 32H48A48 48 0 0 0 0 80v352a48 48 0 0 0 48 48h137.25V327.69h-63V256h63v-54.64c0-62.15 37-96.48 93.67-96.48 27.14 0 55.52 4.84 55.52 4.84v61h-31.27c-30.81 0-40.42 19.12-40.42 38.73V256h68.78l-11 71.69h-57.78V480H400a48 48 0 0 0 48-48V80a48 48 0 0 0-48-48z" />
            </SocialSvg>
          </Social>
        </Col2>
      </NavItem>
    </Nav>
  );
}

export default Header;
