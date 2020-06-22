import React, { useState } from 'react';
import { connect } from 'react-redux';
import { isEmpty } from '@utility/isEmpty';
import { getScoreTable } from '@utility/api';
import { newGame } from '@reduxStore/gameData/actions';
import PropTypes from 'prop-types';
import styled from 'styled-components';
import moment from 'moment';
import { Row, Col } from 'styled-bootstrap-grid';
import { Button, Table } from 'reactstrap';

const ScoreBox = styled.section`
  background-color: #e2e2e2;
  border-radius: 6px;
  padding: 20px 0;
  text-align: center;
  h2 {
    color: #0f4c81;
  }
  table {
    background-color: rgba(255, 255, 255, 0.3);
  }
`;

const ScoreSection = ({ getNewGameData }) => {
  const [state, setState] = useState({
    scoreData: [],
    called: false
  });

  if (!state.called) {
    getScoreTable().then(data => {
      setState(prevState => ({
        ...prevState,
        scoreData: data,
        called: true
      }));
    });
  }
  const clickNewGame = getNewGameData => {
    const gameData = {
      userData: [],
      state: 'start'
    };
    getNewGameData(gameData);
  };

  return (
    <ScoreBox>
      <Row justifyContent={'center'}>
        <Col className="p-4" col={12}>
          <Row>
            <Col className="p-4">
              <h2>Top 10 Highest Score</h2>
            </Col>
            <Col className="p-4">
              <Table hover>
                <thead>
                  <tr>
                    <th>#</th>
                    <th>Score</th>
                    <th>Name</th>
                    <th>Playing Date</th>
                  </tr>
                </thead>
                <tbody>
                  {!isEmpty(state.scoreData) &&
                    state.scoreData.map((item, index) => {
                      return (
                        <tr key={index}>
                          <th scope="row">{index + 1}</th>
                          <td>{item.point}</td>
                          <td>{item.name}</td>
                          <td>{moment(item.createdTime).format('Y-MMM-D hh:mm')}</td>
                        </tr>
                      );
                    })}
                </tbody>
              </Table>
            </Col>
            <Col className="p-4">
              <Button
                color="primary"
                onClick={() => {
                  clickNewGame(getNewGameData);
                }}
              >
                Back to Title
              </Button>
            </Col>
          </Row>
        </Col>
      </Row>
    </ScoreBox>
  );
};

ScoreSection.propTypes = {
  getNewGameData: PropTypes.func
};

const mapDispatchToProps = dispatch => ({
  getNewGameData: data => dispatch(newGame(data))
});

export default connect(null, mapDispatchToProps)(ScoreSection);
