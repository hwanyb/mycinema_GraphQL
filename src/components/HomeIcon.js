import React from 'react';
import { AiOutlineHome } from 'react-icons/ai';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Container = styled(Link)`
    position: fixed;
    top: 20px;
    left: 20px;
    z-index: 9999;
    text-decoration: none;
`;

export default function HomeIcon() {
  return (
    <Container to='/'>
      <AiOutlineHome size={36} color='#000' />
    </Container>
  );
}
