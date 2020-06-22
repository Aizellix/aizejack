import React, { PureComponent } from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import getConfig from 'next/config';
import GlobalStyle from '@styles/global';
import { Container, Row, Col } from 'styled-bootstrap-grid';
import Header from '@components/layouts/header';
import StartSection from '@components/elements/start';
import PlaySection from '@components/elements/play';
import ScoreSection from '@components/elements/score';

const { publicRuntimeConfig } = getConfig();
const { title: siteTitle } = publicRuntimeConfig;
class Index extends PureComponent {
  constructor(props) {
    super(props);
  }

  static async getInitialProps() {
    return { gameData: { state: 'start' } };
  }

  render() {
    const { gameData } = this.props;
    const { state: gameState } = gameData;
    return (
      <>
        <GlobalStyle />
        <Container>
          <Header title={siteTitle} />
          <Row justifyContent={'center'}>
            {gameState === 'start' && (
              <Col sx={12} sm={10} md={8}>
                <StartSection />
              </Col>
            )}
            {gameState === 'started' && (
              <Col sx={12} sm={10} md={10}>
                <PlaySection />
              </Col>
            )}
            {gameState === 'end' && (
              <Col sx={12} sm={10} md={10}>
                <ScoreSection />
              </Col>
            )}
          </Row>
        </Container>
      </>
    );
  }
}

Index.propTypes = {
  gameData: PropTypes.object
};

const mapStateToProps = state => state.gameData;

export default connect(mapStateToProps)(Index);
