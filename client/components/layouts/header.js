import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const HeaderBox = styled.section`
  display: flex;
  margin: 20px 0;
  justify-content: center;
  h1 {
    font-size: 2.5rem;
  }
`;

const Header = ({ title }) => {
  return (
    <HeaderBox>
      <h1>{title}</h1>
    </HeaderBox>
  );
};

Header.propTypes = {
  title: PropTypes.string
};

export default Header;
