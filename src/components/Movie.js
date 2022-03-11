import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled.div`
    height: 380px;
    width: 100%;
    overflow: hidden;
    @media screen and (max-width: 1350px){
        height: 300px;
    }
    @media screen and (max-width: 750px){
        height: 260px;
    }
    @media screen and (max-width: 660px){
        height: 200px;
    }


    @media screen and (max-width: 540px) {
        height: 300px;
  }
  @media screen and (max-width: 460px) {
    height: 400px;
  }
`;


const StyledLink = styled(Link)`
    text-align: center;
    text-decoration: none;
`;


const Poster = styled.div`
    background-image: url(${props => props.bg});
    height: 100%;
    background-repeat: no-repeat;
    background-position: center center;
    background-size: cover;
    border-radius: 15px;
`;

export default function Movie({ id, bg }) {
  return (
      <Container>
        <StyledLink to={`/${id}`}>
            <Poster bg={bg}></Poster>
        </StyledLink>
    </Container>
  )
}
