// Packages
import React from 'react';

export interface TextProps {
  children: React.ReactNode | string,
  weight: string,
  family: string,
  color: string,
  size: string,
}

/**
 * Font sizes by key.
 */
const TEXT_FONT_SIZES: object = {
  default: 14,
  small: 12,
  title: 18,
};

/**
 * Font colors by key.
 */
const TEXT_COLORS: object = {
  default: 'black',
  'grey-lighter': '#999999',
  'gray-light': '#e1e4e8',
  gray: '#586069',
  'gray-dark': '#24292e',
  'standard': 'rgba(115, 115, 115, .8)',
};

/**
 * Font families by key.
 */
const FONT_FAMILIES: object = {
  default: '-apple-system,BlinkMacSystemFont,Segoe UI,Helvetica,Arial,sans-serif,Apple Color Emoji,Segoe UI Emoji',
  mono: 'SFMono-Regular,Consolas,Liberation Mono,Menlo,monospace',
};

/**
 * Font weights by key.
 */
const FONT_WEIGHTS: object = {
  default: 400,
  bold: 600,
};

/**
 * Simple text line with styles as props.
 *
 * @param {string} weight Key of font weight, either 'default' or 'bold'.
 * @param {string} family Key of font family, either 'default' or 'mono'.
 * @param {string} color Key of font color, either 'default', 'grey-lighter', 'grey-light', 'grey', 'grey-dark', or 'standard'.
 * @param {string} size Key of font size, either 'default', 'small' or 'title'.
 * @returns {React.FC<any>} React component of text.
 */
export const Text: React.FC<any> = ({
  children = '',
  weight = 'default',
  family = 'default',
  color = 'default',
  size = 'default',
  ...props
}: TextProps) => {
  return (
    <p
      style={{
        color: TEXT_COLORS[color],
        fontFamily: FONT_FAMILIES[family],
        fontSize: `${TEXT_FONT_SIZES[size]}px`,
        fontWeight: FONT_WEIGHTS[weight],
        lineHeight: 1.5,
        whiteSpace: 'pre',
      }}
      { ...props }>
      { children }
    </p>
  );
};
