import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const ControlButton = styled.button`
  width: 50px;
  height: 30px;
  border-radius: 10px;
  background-color: #a19fa5;
  margin: 4px;
  outline: none !important;
`;

const ButtonText = styled.div`
  text-align: center;
  font-size: 0.75rem;
  width: 100%;
  color: #fff;
  text-shadow: 1px 1px 1px #000;
`;

const ControlBox = styled.div`
  margin-top: 8px;
`;

const ControlSection = ({ callCard, hitCard, standCard, restartRound, playState, isEndRound = false, betsTotal }) => {
  return (
    <ControlBox>
      {playState === 'call' && (
        <ControlButton
          disabled={betsTotal >= 1 ? false : true}
          onClick={() => {
            callCard();
          }}
        >
          <ButtonText>Call</ButtonText>
        </ControlButton>
      )}

      {playState === 'called' && (
        <>
          <ControlButton
            onClick={() => {
              hitCard();
            }}
          >
            <ButtonText>Hit</ButtonText>
          </ControlButton>
          <ControlButton
            onClick={() => {
              standCard();
            }}
          >
            <ButtonText>Stand</ButtonText>
          </ControlButton>
        </>
      )}

      {isEndRound && (
        <ControlButton
          onClick={() => {
            restartRound();
          }}
        >
          <ButtonText>Next</ButtonText>
        </ControlButton>
      )}
    </ControlBox>
  );
};

ControlSection.propTypes = {
  callCard: PropTypes.func,
  hitCard: PropTypes.func,
  standCard: PropTypes.func,
  restartRound: PropTypes.func,
  betsTotal: PropTypes.number,
  isEndRound: PropTypes.bool,
  playState: PropTypes.string
};

export default ControlSection;
