import React from "react";
import { gql } from "apollo-boost";
import styled from "styled-components";
import { useQuery } from "@apollo/react-hooks";
import { useParams } from "react-router-dom";
import Movie from "../components/Movie";
import HomeIcon from "../components/HomeIcon";

const Base = styled.div`
  margin: 0 auto;
  padding: 0;
  width: 100%;
  display: flex;
  /* overflow: hidden; */
  @media screen and (max-width: 1210px) {
    flex-direction: column;
    /* height: 100vh; */
  }
`;
const Info = styled.div`
  position: absolute;
  left: 40%;
  margin: 0;
  width: 60%;
  box-sizing: border-box;
  padding: 50px;
  box-sizing: border-box;
  margin-top: 60px;
  @media screen and (max-width: 1400px) {
    left: 50%;
    width: 50%;
  }
  @media screen and (max-width: 1210px) {
    position: relative;
    width: 100%;
    left: 0;
    top: 70vh;
    padding: 30px 30px;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    height: 30vh;
    margin-top: 0;
  }
  @media screen and (max-width: 1210px) {
    display: block;
    text-align: center;
  }
  @media screen and (max-width: 500px) {
    top: 70vh;

  }
`;

const Loading = styled.div`
  font-size: 20px;
  font-family: "Noto Sans KR", sans-serif;
  font-weight: 500;
`;

const Title = styled.h1`
  font-family: "Fugaz One", cursive;
  font-size: 70px;
  color: #000;
  margin-bottom: 20px;
  @media screen and (max-width: 1210px) {
    font-size: 65px;
  }
  @media screen and (max-width: 500px) {
    font-size: 40px;
  }
`;
const Subtitle = styled.h3`
  font-family: "Noto Sans KR", sans-serif;
  font-weight: 700;
  font-size: 16px;
  color: #000;
  margin-bottom: 10px;
  @media screen and (max-width: 1210px) {
    white-space: nowrap;
  }
`;

const InfoTop = styled.div``;

const Description = styled.p`
  font-family: "Noto Sans KR", sans-serif;
  font-weight: 100;
  font-size: 15px;
  white-space: pre-wrap;
  margin-top: 20px;
  @media screen and (max-width: 1210px) {
    margin-left: 50px;
  }
  @media screen and (max-width: 500px) {
    margin-left: 0;
    /* margin-top: 20px; */
    margin-top: 20px;
  }
`;

const Poster = styled.div`
  width: 40%;
  height: 100vh;
  background-image: url(${(props) => props.bg});
  /* background-image: url("test.jpg"); */
  background-repeat: no-repeat;
  background-size: contain;
  background-position: center left;
  position: fixed;
  @media screen and (max-width: 1400px) {
    width: 50%;
  }
  @media screen and (max-width: 1210px) {
    background-position: top;
    background-size: cover;
    width: 100%;
    height: 70vh;
  z-index: 99;

  }
  @media screen and (max-width: 500px) {
    /* height: 70vh; */
  }
`;
const SuggestionText = styled.h3`
  font-family: "Noto Sans KR", sans-serif;
  font-weight: 700;
  margin-top: 100px;
  font-size: 16px;
  margin-bottom: 20px;
`;
const Suggestion = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 25px;
  width: 100%;
  position: relative;
  @media screen and (max-width: 1400px) {
    grid-template-columns: repeat(2, 1fr);
  }
  @media screen and (max-width: 1210px) {
    grid-template-columns: repeat(4, 1fr);
  margin-bottom: 50px;

  }
  @media screen and (max-width: 900px) {
    grid-gap: 15px;
    grid-template-columns: repeat(2, 1fr);
  }
  
`;


const GET_MOVIE = gql`
  query getMovie($id: Int!) {
    movie(id: $id) {
      id
      title
      language
      rating
      description_intro
      medium_cover_image
      genres
    }
    suggestions(id:$id) {
      id
      medium_cover_image
    }
  }
`;

export default function Detail() {
  const { id } = useParams();
  const { loading, data } = useQuery(GET_MOVIE, {
    variables: { id: parseInt(id) }
  });
  return (
    <Base>
    <HomeIcon />
      <Poster bg={data?.movie?.medium_cover_image} />
      {loading ? (
        <Info>
          <Loading>Loading....</Loading>
        </Info>
      ) : (
        <Info>
          <InfoTop>
            <Title>{data?.movie?.title}</Title>
            <Subtitle>
              {data?.movie?.language} • {data?.movie?.rating} • {data?.movie?.genres}
            </Subtitle>
          </InfoTop>
          <Description>{data?.movie?.description_intro}</Description>
          <SuggestionText>Suggestion</SuggestionText>
          <Suggestion>
          {data?.suggestions?.map(m => <Movie key={m.id} id={m.id} bg={m.medium_cover_image} />)}
          </Suggestion>
        </Info>
      )}
    </Base>
  );
}
