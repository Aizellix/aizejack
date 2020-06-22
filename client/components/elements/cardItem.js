import React from 'react';
import PropTypes from 'prop-types';
import { Spades, Diamonds, Clubs, Heart } from '@styled-icons/icomoon';
import styled from 'styled-components';

export const HeartIcon = styled(Heart)`
  color: #b01f32;
  font-weight: bold;
`;

export const DiamondsIcon = styled(Diamonds)`
  color: #b01f32;
  font-weight: bold;
`;

export const SpadesIcon = styled(Spades)`
  color: #233658;
  font-weight: bold;
`;

export const ClubsIcon = styled(Clubs)`
  color: #262b37;
  font-weight: bold;
`;

const CardItem = styled.div`
  background-color: #f2f2f6;
  ${props =>
    props.type === ''
      ? `background-image: url('/static/cardBack.jpg');
  background-position: center center;
  background-size: auto;
  `
      : ''}

  border: #999 1px solid;
  border-radius: 4px;
  width: 80px;
  height: 120px;
  margin: 4px;
  display: flex;
  justify-content: center;
  align-items: center;
  > div {
    width: 100%;
  }
`;

const CardNumber = styled.div`
  text-align: center;
  font-size: 1.5rem;
  width: 100%;
`;

const CardType = styled.div`
  text-align: center;
  width: 100%;
`;
//''
const CardItems = ({ name, type }) => {
  return (
    <CardItem type={type}>
      <div>
        {type === '' ? (
          <></>
        ) : (
          <>
            <CardNumber>{name}</CardNumber>
            <CardType>
              {type === 'H' && <HeartIcon size="36" />}
              {type === 'C' && <ClubsIcon size="36" />}
              {type === 'S' && <SpadesIcon size="36" />}
              {type === 'D' && <DiamondsIcon size="36" />}
            </CardType>
          </>
        )}
      </div>
    </CardItem>
  );
};

CardItems.propTypes = {
  name: PropTypes.string,
  type: PropTypes.string
};

export default CardItems;
