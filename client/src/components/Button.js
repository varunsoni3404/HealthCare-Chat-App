import React from 'react';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

const Button = ({ 
  text = "Hover me", 
  bgColor = "rgba(255, 208, 116)", 
  layerColors = ["rgba(163, 116, 255)", "rgba(23, 241, 209)", "rgba(255, 208, 116)"], 
  fontSize = "1.2rem", 
  linkTo = "/login" // Default link is to "/login"
}) => {
  return (
    <StyledWrapper 
      bgColor={bgColor} 
      layerColors={layerColors} 
      fontSize={fontSize}
    >
      <button className="button button-item">
        <span className="button-bg">
          <span className="button-bg-layers">
            <span className="button-bg-layer button-bg-layer-1" />
            <span className="button-bg-layer button-bg-layer-2" />
            <span className="button-bg-layer button-bg-layer-3" />
          </span>
        </span>
        <span className="button-inner">
          <span className="button-inner-static">{text}</span>
          <span className="button-inner-hover">{text}</span>
        </span>
        <Link to={linkTo} className="button-link">
          {text}
        </Link>
      </button>
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  button {
    all: unset;
  }

  .button {
    position: relative;
    display: inline-flex;
    height: 3.5rem;
    align-items: center;
    border-radius: 9999px;
    padding-left: 2rem;
    padding-right: 2rem;
    font-family: Segoe UI;
    font-size: ${(props) => props.fontSize};
    font-weight: 640;
    color: #fafaf6;
    letter-spacing: -0.06em;
  }

  .button-item {
    background-color: transparent;
    color: #1d1d1f;
  }

  .button-item .button-bg {
    border-color: ${(props) => props.bgColor};
    background-color: ${(props) => props.bgColor};
  }

  .button-inner,
  .button-inner-hover,
  .button-inner-static {
    pointer-events: none;
    display: block;
  }

  .button-inner {
    position: relative;
  }

  .button-inner-hover {
    position: absolute;
    top: 0;
    left: 0;
    opacity: 0;
    transform: translateY(70%);
  }

  .button-bg {
    overflow: hidden;
    border-radius: 2rem;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    transform: scale(1);
    transition: transform 1.8s cubic-bezier(0.19, 1, 0.22, 1);
  }

  .button-bg,
  .button-bg-layer,
  .button-bg-layers {
    display: block;
  }

  .button-bg-layers {
    position: absolute;
    left: 50%;
    transform: translate(-50%);
    top: -60%;
    aspect-ratio: 1 / 1;
    width: max(200%, 10rem);
  }

  .button-bg-layer {
    border-radius: 9999px;
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    transform: scale(0);
  }

  .button-bg-layer-1 {
    background-color: ${(props) => props.layerColors[0]};
  }

  .button-bg-layer-2 {
    background-color: ${(props) => props.layerColors[1]};
  }

  .button-bg-layer-3 {
    --tw-bg-opacity: 1;
    background-color: ${(props) => props.layerColors[2]};
  }

  .button:hover .button-inner-static {
    opacity: 0;
    transform: translateY(-70%);
    transition:
      transform 1.4s cubic-bezier(0.19, 1, 0.22, 1),
      opacity 0.3s linear;
  }

  .button:hover .button-inner-hover {
    opacity: 1;
    transform: translateY(0);
    transition:
      transform 1.4s cubic-bezier(0.19, 1, 0.22, 1),
      opacity 1.4s cubic-bezier(0.19, 1, 0.22, 1);
  }

  .button:hover .button-bg-layer {
    transition:
      transform 1.3s cubic-bezier(0.19, 1, 0.22, 1),
      opacity 0.3s linear;
  }

  .button:hover .button-bg-layer-1 {
    transform: scale(1);
  }

  .button:hover .button-bg-layer-2 {
    transition-delay: 0.1s;
    transform: scale(1);
  }

  .button:hover .button-bg-layer-3 {
    transition-delay: 0.2s;
    transform: scale(1);
  }

  .button-link {
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    text-decoration: none;
    color: inherit;
  }
`;

export default Button;
