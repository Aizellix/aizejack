import React, { useState } from 'react';
import { connect } from 'react-redux';
import { setGameInit } from '@utility/api';
import { setGameData } from '@reduxStore/gameData/actions';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import { Container, Row, Col } from 'styled-bootstrap-grid';
import { Button, Input } from 'reactstrap';

const StartBox = styled.section`
  background-color: #e2e2e2;
  border-radius: 6px;
  padding: 20px 0;
  text-align: center;
  h2 {
    color: #0f4c81;
  }
`;

const StartSection = ({ getGameData }) => {
  const [state, setState] = useState({
    userName: ''
  });

  const onChange = val => {
    const userName = val;
    setState(prevState => ({
      ...prevState,
      userName
    }));
  };

  const startGame = getGameData => {
    setGameInit(state.userName).then(data => {
      const gameData = {
        userData: data,
        state: 'started'
      };
      getGameData(gameData);
    });
  };

  const clickScoreTable = getGameData => {
    const gameData = {
      userData: [],
      state: 'end'
    };
    getGameData(gameData);
  };

  return (
    <>
      <StartBox>
        <Container>
          <Row justifyContent={'center'}>
            <Col className="p-4" md={8}>
              <Row>
                <Col className="p-4">
                  <h2>Enter your name to Start</h2>
                </Col>
                <Col className="p-4">
                  <Input type="text" onChange={e => onChange(`${e.target.value}`)} />
                </Col>
                <Col className="p-4">
                  <Button
                    color="primary"
                    onClick={() => {
                      startGame(getGameData);
                    }}
                  >
                    Play
                  </Button>
                </Col>
              </Row>
            </Col>
          </Row>
        </Container>
      </StartBox>
      <Container>
        <Row justifyContent={'center'}>
          <Col col={12} className="p-4 text-center">
            <Button
              color="secondary"
              onClick={() => {
                clickScoreTable(getGameData);
              }}
            >
              Score Table
            </Button>
          </Col>
        </Row>
      </Container>
    </>
  );
};

StartSection.propTypes = {
  getGameData: PropTypes.func
};

const mapDispatchToProps = dispatch => ({
  getGameData: data => dispatch(setGameData(data))
});

export default connect(null, mapDispatchToProps)(StartSection);
