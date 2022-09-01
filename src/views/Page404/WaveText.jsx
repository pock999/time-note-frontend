// react
import React from 'react';

// styled-components
import styled, { keyframes, css } from 'styled-components';

// keyframes
const wave = keyframes`
  0%, 100% {
    clip-path: polygon(0% 60%, 30% 60%, 40% 72%, 54% 60%, 70% 61%, 84% 59%, 100% 87%, 100% 100%, 0% 100%);
  }

  50% {
    clip-path: polygon(0% 70%, 50% 79%, 42% 84%, 51% 62%, 67% 50%, 84% 45%, 100% 80%, 100% 100%, 0% 100%);
  }
`;

// 動畫
const animationRule = css`
  ${wave} 3s ease-in-out infinite;
`;

const BorderText = styled('h2')`
  font-size: 40vw;
  position: absolute;

  color: white;
  text-shadow:
      -1px -1px 0 black, 
      1px -1px 0 black,
      -1px 1px 0 black,
      1px 1px 0 black;  
`;

const WaveText = styled('h2')`
  font-size: 40vw;
  position: absolute;

  color: black;
  animation: ${animationRule};
`;

export default function (props) {
  return (
    <>
      <BorderText>{props.children}</BorderText>
      <WaveText>{props.children}</WaveText>
    </>
  );
}
