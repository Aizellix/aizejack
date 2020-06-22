import React, { useState } from 'react';
import { connect } from 'react-redux';
import { isEmpty } from '@utility/isEmpty';
import { getCallingCard, getHittingCard, getStandingCard } from '@utility/api';
import * as ReduxActions from '@reduxStore/gameData/actions';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Container, Row, Col } from 'styled-bootstrap-grid';
import CardItems from './cardItem';
import BetsSection from './betsSection';
import ControlSection from './controlSection';

const StartBox = styled.section`
  background-color: #e2e2e2;
  border-radius: 6px;
  padding: 20px 0;
  text-align: center;
  h2 {
    font-size: 1.5rem;
    color: #0f4c81;
  }
  h4 {
    font-size: 1.25rem;
    color: #HTML383D3F;
  }
`;

const PlayerName = styled.div`
  border-top: 1px solid #666;
  margin-top: 8px;
`;

const CardTable = styled.div`
  display: flex;
  height: 150px;
  justify-content: center;
`;
const Bets = styled.b`
  span {
    color: #b01f32;
  }
`;
const formatCoins = new Intl.NumberFormat('en-US', {
  style: 'currency',
  currency: 'USD',
  minimumFractionDigits: 0
});

const PlaySection = props => {
  const { getCallingData, getHittingData, getStandingData, getRestartData, getEndData } = props;
  const { userData } = props.gameData;

  const [state, setState] = useState({
    betsTotal: 0,
    userData,
    currentCoins: userData.coins,
    playState: 'call',
    score: 0,
    isEndRound: false
  });

  const setBets = bets => {
    let { betsTotal, currentCoins } = state;
    betsTotal += bets;
    currentCoins -= bets;
    setState(prevState => ({
      ...prevState,
      betsTotal,
      currentCoins
    }));
  };

  const callCard = () => {
    let {
      betsTotal,
      userData: { userId }
    } = state;

    getCallingCard(userId, betsTotal).then(data => {
      const { coins, playerPoint, playerCards, dealerCards } = data;
      let userData = {
        coins,
        playerPoint,
        playerCards,
        dealerCards
      };
      getCallingData(userData);
      userData = { ...state.userData, ...userData };
      setState(prevState => ({
        ...prevState,
        userData
      }));
    });

    setState(prevState => ({
      ...prevState,
      playState: 'called'
    }));
  };

  const hitCard = () => {
    let {
      userData: { userId }
    } = state;
    getHittingCard(userId).then(data => {
      const { playerPoint, playerCards } = data;
      let userData = {
        playerPoint,
        playerCards
      };
      getHittingData(userData);
      userData = { ...state.userData, ...userData };
      setState(prevState => ({
        ...prevState,
        userData
      }));
    });
  };

  const standCard = () => {
    let {
      betsTotal,
      userData: { userId }
    } = state;
    getStandingCard(userId, betsTotal).then(data => {
      const { winner, coins, score, dealerPoint, playerPoint, isBlackjack, dealerCards } = data;
      let userData = {
        dealerCards,
        playerPoint,
        dealerPoint
      };
      getStandingData(userData);
      userData = { ...state.userData, ...userData };
      setState(prevState => ({
        ...prevState,
        userData,
        winner: coins > 0 ? winner : 'end',
        score,
        isBlackjack,
        playState: 'stand',
        currentCoins: coins,
        isEndRound: true
      }));
    });
  };

  const restartRound = () => {
    const { currentCoins } = state;
    let userData = {
      playerPoint: 0,
      playerCards: [],
      dealerCards: []
    };

    if (currentCoins > 0) {
      getRestartData(userData);
    } else {
      const gameData = {
        userData,
        state: 'end'
      };
      getEndData(gameData);
    }
    userData = { ...state.userData, ...userData };
    setState(prevState => ({
      ...prevState,
      userData,
      betsTotal: 0,
      winner: '',
      isEndRound: false,
      playState: 'call'
    }));
  };

  let WinMsg = 'Push!';
  WinMsg = state.winner === 'player' ? `You Win!` : WinMsg;
  WinMsg = state.winner === 'dealer' ? `Dealer Win!` : WinMsg;
  WinMsg = state.winner === 'end' ? `Game Over!` : WinMsg;

  return (
    <StartBox>
      <Container>
        <Row>
          <Col col={12}>
            <Row>
              <Col col={6} className="text-left">
                <h4>{`${formatCoins.format(state.currentCoins)}`}</h4>
              </Col>
              <Col col={6} className="text-right">
                <h4>Score: {state.score}</h4>
              </Col>
            </Row>
          </Col>
          <Col col={12}>
            <CardTable>
              {!isEmpty(state.userData.dealerCards) && !state.isEndRound && <CardItems name={''} type={''} />}
              {!isEmpty(state.userData.dealerCards) &&
                state.userData.dealerCards.map((item, index) => <CardItems key={index} name={item.name} type={item.type} />)}
            </CardTable>
          </Col>
          <Col col={12}>
            <PlayerName>
              <b>{`${state.userData.userName}${
                !isEmpty(state.userData.playerPoint) && state.userData.playerPoint > 0 ? ` : Cards Point is ${state.userData.playerPoint}` : ''
              }`}</b>
            </PlayerName>
          </Col>
          <Col col={12}>
            <CardTable>
              {!isEmpty(state.userData.playerCards) &&
                state.userData.playerCards.map((item, index) => <CardItems key={index} name={item.name} type={item.type} />)}
            </CardTable>
          </Col>
          <Col col={12} className="text-center">
            <Bets>
              {state.isEndRound ? (
                <>
                  <span>{WinMsg}</span>
                </>
              ) : (
                <>
                  Best: <span>{`${formatCoins.format(state.betsTotal)}`}</span>
                </>
              )}
            </Bets>
          </Col>
          <Col col={12}>
            <BetsSection setBets={setBets} coins={state.currentCoins} playState={state.playState} />
          </Col>
          <Col col={12}>
            <ControlSection
              isEndRound={state.isEndRound}
              betsTotal={state.betsTotal}
              restartRound={restartRound}
              standCard={standCard}
              hitCard={hitCard}
              callCard={callCard}
              playState={state.playState}
            />
          </Col>
        </Row>
      </Container>
    </StartBox>
  );
};

PlaySection.propTypes = {
  getCallingData: PropTypes.func,
  getHittingData: PropTypes.func,
  getStandingData: PropTypes.func,
  getRestartData: PropTypes.func,
  getEndData: PropTypes.func,
  gameData: PropTypes.object
};

const mapDispatchToProps = dispatch => ({
  getCallingData: data => dispatch(ReduxActions.callCard(data)),
  getHittingData: data => dispatch(ReduxActions.hitCard(data)),
  getStandingData: data => dispatch(ReduxActions.standCard(data)),
  getRestartData: data => dispatch(ReduxActions.restartRound(data)),
  getEndData: data => dispatch(ReduxActions.endGame(data))
});

const mapStateToProps = state => state.gameData;

export default connect(mapStateToProps, mapDispatchToProps)(PlaySection);
