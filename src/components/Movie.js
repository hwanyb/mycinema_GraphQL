import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';
import { FcLike, FcLikePlaceholder } from 'react-icons/fc';
import { gql } from 'apollo-boost';
import { useMutation } from '@apollo/react-hooks';

const Container = styled.div`
    height: 380px;
    width: 100%;
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

const LikeBtn = styled.button`
    z-index: 98;
    cursor: pointer;
    background-color: transparent;
    border: none;
    position: relative;
    bottom: 30px;
`;

const LIKE_MOVIE = gql`
  mutation toggleLikeMovie($id: Int!, $isLiked: Boolean!) {
    toggleLikeMovie(id: $id, isLiked: $isLiked) @client
  }
`;

export default function Movie({ id, bg, isLiked }) {
    const [toggleMovie] = useMutation(LIKE_MOVIE, { variables: { id: parseInt(id), isLiked } });
  return (
    <Container>
      <StyledLink to={`/${id}`}>
        <Poster bg={bg}></Poster>
      </StyledLink>
      <LikeBtn onClick={toggleMovie}>
        {isLiked ? <FcLike size={24} /> : <FcLikePlaceholder size={24} />}
      </LikeBtn>
    </Container>
  );
}
