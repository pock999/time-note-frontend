// react
import React from 'react';

// styled-components
import styled from 'styled-components';

// styled-component
const Center = styled('div')`
  background-image: url("../assets/background.jpg");
  background-repeat: no-repeat;
  background-size: cover;
  opacity: 0.6;
  width: 100%;
  height: 100%;
  display: flex;

  justify-content: center;
  align-items: center;
`;

export default function Empty({ title }) {
  return (
    <Center>
      <div
        style={{
          maxWidth: '400px',
          backgroundColor: 'rgba(255, 255, 255, 0.5)',
          color: 'black',
          padding: '1.5em',
          fontSize: '20px',
        }}
      >
        {title}
      </div>
    </Center>
  );
}
