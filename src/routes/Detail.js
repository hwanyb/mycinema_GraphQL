import { useQuery } from '@apollo/react-hooks';
import { gql } from 'apollo-boost';
import React from 'react';
import { useParams } from 'react-router-dom';


const GET_MOVIES = gql`
  query getMovie($id: Int!){
    movies(id: $id) {
      id
      title
      medium_cover_image
      description_intro
    }
  }
`;

export default function Detail() {
  const { id } = useParams();
  const { loading, data } = useQuery(GET_MOVIES, {
    variables: { id }
  });
  console.log(data);
  return (
    <div>Detail</div>
  )
}
