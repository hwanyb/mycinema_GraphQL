import React from 'react';
import styled from 'styled-components';
import { gql } from 'apollo-boost';
import { useQuery } from '@apollo/react-hooks';
import Movie from '../components/Movie';
import HomeIcon from '../components/HomeIcon';

const Base = styled.div`
  position: relative;
  width: 100%;
`;
const Intro = styled.div`
  position: relative;
  width: 100%;
  background-image: url('bgimg.jpg');
  background-size: cover;
  background-repeat: no-repeat;
  background-position: center;
  height: 400px;
`;

const IntroTitle = styled.h1`
  text-align: center;
  color: #fff;
  font-family: 'Fugaz One', cursive;
  font-size: 50px;
  padding-top: 120px;
  width: 80%;
  margin: 0 auto;
  @media screen and (max-width: 400px) {
    font-size: 28px;
  }
`;

const SubTitle = styled.h3`
  text-align: center;
  color: #fff;
  font-family: 'Noto Sans KR', sans-serif;
  font-weight: 100;
  font-size: 15px;
  margin: 0 auto;
  margin-top: 30px;
  width: 80%;

`;

const Loading =  styled.p`
  font-family: 'Noto Sans KR', sans-serif;
  color: #fff;
  font-weight: 700;
  text-align: center;
  position: relative;
  top: -50px;
`;

const Movies = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 25px;
  width: 60%;
  margin: 0 auto;
  position: relative;
  top: -100px;

  @media screen and (max-width: 1650px) {
    width: 80%;
  }

  @media screen and (max-width: 980px) {
    grid-gap: 15px;
    grid-template-columns: repeat(3, 1fr);
  }
  @media screen and (max-width: 540px) {
    width: 90%;
    grid-gap: 15px;
    grid-template-columns: repeat(2, 1fr);
  }
  @media screen and (max-width: 460px) {
    grid-template-columns: repeat(1, 1fr);
    width: 70%;
  }
  
`;

const GET_MOVIES = gql`
  {
    movies {
      id
      medium_cover_image
    }
  }
`;

const Home = () => {
  const { loading, data } = useQuery(GET_MOVIES);
  return (
    <Base>
      <HomeIcon />
      <Intro>
        <IntroTitle>Welcome to My Cinema</IntroTitle>
        <SubTitle>다양한 영화 정보를 볼 수 있는 페이지입니다.</SubTitle>
      </Intro>
      {
        loading ? (
          <Loading>Loading...</Loading>
        ) : (
          <Movies>
          {data?.movies?.map(m => <Movie key={m.id} id={m.id} bg={m.medium_cover_image} />)}
          </Movies>
        )
      }
    </Base>
  )
}
export default Home