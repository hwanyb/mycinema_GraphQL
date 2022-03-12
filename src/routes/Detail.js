import React from "react";
import { gql } from "apollo-boost";
import styled from "styled-components";
import { useQuery } from "@apollo/react-hooks";
import { useParams } from "react-router-dom";
import Movie from "../components/Movie";

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
  margin: 0;
  width: 60%;
  box-sizing: border-box;
  padding: 50px;
  box-sizing: border-box;
  margin-top: 150px;
  @media screen and (max-width: 1400px) {
    width: 50%;
  }
  @media screen and (max-width: 1210px) {
    width: 100%;
    padding: 30px 30px;
    display: flex;
    justify-content: space-between;
    align-items: flex-end;
    height: 30vh;
    margin-top: 0;
  }
  @media screen and (max-width: 500px) {
    display: block;
    text-align: center;
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
    margin-bottom: 0;
    font-size: 65px;
  }
  @media screen and (max-width: 500px) {
    font-size: 40px;
    margin-bottom: 20px;
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
    margin-bottom: 0;
  }
`;

const InfoTop = styled.div``;

const Description = styled.p`
  font-family: "Noto Sans KR", sans-serif;
  font-weight: 100;
  font-size: 15px;
  white-space: pre-wrap;
  margin-top: 160px;
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
  @media screen and (max-width: 1400px) {
    width: 50%;
  }
  @media screen and (max-width: 1210px) {
    background-position: top;
    background-size: cover;
    width: 100%;
    height: 70vh;
  }
  @media screen and (max-width: 500px) {
    /* height: 70vh; */
  }
`;

const Suggestion = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  grid-gap: 25px;
  width: 100%;
  position: relative;
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
      summary
      large_cover_image
    }
    suggestion(id:$id) {
      id
      medium_cover_image
    }
  }
`;

export default function Detail() {
  const { id } = useParams();
  const { loading, data } = useQuery(GET_MOVIE, {
    variables: { id }
  });
  return (
    <Base>
      <Poster bg={data?.movie?.large_cover_image} />
      {loading ? (
        <Info>
          <Loading>Loading....</Loading>
        </Info>
      ) : (
        <Info>
          <InfoTop>
            <Title>{data?.movie?.title}</Title>
            <Subtitle>
              {data?.movie?.language} • {data?.movie?.rating}
            </Subtitle>
          </InfoTop>
          <Description>{data?.movie?.summary}</Description>
          <Suggestion>
          {data?.suggestion?.map(m => <Movie key={m.id} id={m.id} bg={m.medium_cover_image} />)}
          </Suggestion>
        </Info>
      )}
    </Base>
  );
}
