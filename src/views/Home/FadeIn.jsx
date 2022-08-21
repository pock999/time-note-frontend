// react
import React from 'react';

// styled-components
import styled, { keyframes, css } from 'styled-components';

// keyframes
const fadeIn = keyframes`
  100% {
    opacity: 1;
  }
`;

// 動畫
const animationRule = css`
  1s ${fadeIn} 1s forwards
`;

const FadeIn = styled('div')`
  opacity: 0;
  animation: ${animationRule};
`;

export default FadeIn;
