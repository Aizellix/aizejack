import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const S1Button = styled.button`
  width: 50px;
  height: 50px;
  border-radius: 50px;
  background-color: #487d49;
  margin: 4px;
  outline: none !important;
`;

const S10Button = styled.button`
  width: 50px;
  height: 50px;
  border-radius: 50px;
  background-color: #f7b718;
  margin: 4px;
  outline: none !important;
`;

const S50Button = styled.button`
  width: 50px;
  height: 50px;
  border-radius: 50px;
  background-color: #0086bb;
  margin: 4px;
  outline: none !important;
`;

const S100Button = styled.button`
  width: 50px;
  height: 50px;
  border-radius: 50px;
  background-color: #c03444;
  margin: 4px;
  outline: none !important;
`;

const S500Button = styled.button`
  width: 50px;
  height: 50px;
  border-radius: 50px;
  background-color: #543d7d;
  margin: 4px;
  outline: none !important;
`;

const BestButtonText = styled.div`
  text-align: center;
  font-size: 0.75rem;
  width: 100%;
  color: #fff;
  text-shadow: 1px 1px 1px #000;
`;

const BetsSection = ({ setBets, coins, playState }) => {
  return (
    <>
      {coins >= 1 && (
        <S1Button
          disabled={playState !== 'call' ? true : false}
          onClick={() => {
            setBets(1);
          }}
        >
          <BestButtonText>$1</BestButtonText>
        </S1Button>
      )}

      {coins >= 10 && (
        <S10Button
          disabled={playState !== 'call' ? true : false}
          onClick={() => {
            setBets(10);
          }}
        >
          <BestButtonText>$10</BestButtonText>
        </S10Button>
      )}

      {coins >= 50 && (
        <S50Button
          disabled={playState !== 'call' ? true : false}
          onClick={() => {
            setBets(50);
          }}
        >
          <BestButtonText>$50</BestButtonText>
        </S50Button>
      )}

      {coins >= 100 && (
        <S100Button
          disabled={playState !== 'call' ? true : false}
          onClick={() => {
            setBets(100);
          }}
        >
          <BestButtonText>$100</BestButtonText>
        </S100Button>
      )}

      {coins >= 500 && (
        <S500Button
          disabled={playState !== 'call' ? true : false}
          onClick={() => {
            setBets(500);
          }}
        >
          <BestButtonText>$500</BestButtonText>
        </S500Button>
      )}
    </>
  );
};

BetsSection.propTypes = {
  setBets: PropTypes.func,
  coins: PropTypes.number,
  playState: PropTypes.string
};

export default BetsSection;
