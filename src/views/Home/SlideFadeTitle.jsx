// react
import React from 'react';

// styled-components
import styled, { keyframes, css } from 'styled-components';

// keyframes
const slidefade = keyframes`
  100% {
    opacity: 1;
    margin: 0;
  }
`;

// 動畫
const animationRule = css`
  1s ${slidefade} 1s forwards
`;

const SlideFadeTitle = styled('h1')`
  opacity: 0;
  animation: ${animationRule};
  font-size: 60px;
  margin-top: 100px;
  color: white;
`;

export default SlideFadeTitle;
