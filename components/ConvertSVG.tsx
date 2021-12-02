// Packages
import React from 'react';

export interface ConvertSVGProps {
  children: React.ReactNode,
  height: string,
  width: string,
}

/**
 * Most important component here; allows us to send components as images.
 *
 * @param {string} width CSS value of component width.
 * @param {string} height CSS value of component height.
 * @returns {React.StatelessComponent} React component.
 */
export const ConvertSVG: React.StatelessComponent<{
  height: string,
  width: string,
}> = ({
  children,
  height,
  width,
}: ConvertSVGProps) => (
  <svg
    height={height}
    width={width}
    viewBox={`0 0 ${width} ${height}`}
    fill="none"
    xmlns="http://www.w3.org/2000/svg">
    <foreignObject
      width={width}
      height={height}>
      <div {...{ xmlns: "http://www.w3.org/1999/xhtml" }}>
        <style>
          {`
            * {
              margin: 0;
              box-sizing: border-box;
            }
          `}
        </style>
        { children }
      </div>
    </foreignObject>
  </svg>
);
