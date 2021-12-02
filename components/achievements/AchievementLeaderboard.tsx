// Packages
import React from 'react';

// Local Imports
import { ConvertSVG } from '../ConvertSVG';
import { Text } from '../Text';
import {
  AchievementUser,
  AchievementUserProps,
} from './AchievementUser';

export interface AchievementLeaderboardProps {
  top: Array<AchievementUserProps>;
  highlight?: Array<AchievementUserProps>;
  highlightIndex?: number;
}

/**
 * Static height of entire component.
 */
const HEIGHT = 300;

/**
 * Static width of entire component.
 */
const WIDTH = 400;

/**
 * CSS for component.
 */
const STYLES = `
.leaderboard-user {
  display: flex;
}

.leaderboard-user-content-text {
  display: flex;
}
`;

/**
 * Returns the achievement leaderboard as an SVG React component.
 *
 * @param {AchievementLeaderboardProps} props Props for Achievement Leaderboard
 * @returns {string} JSX component.
 */
export const AchievementLeaderboard: React.FC<AchievementLeaderboardProps> = ({
  top,
  highlight = null,
  highlightIndex = 1,
}: AchievementLeaderboardProps) => {
  return (
    <ConvertSVG
      height={`${HEIGHT}`}
      width={`${WIDTH}`}>
      <Text
        id="title"
        color="standard"
        size="title"
        weight="bold">
        Current Standings
      </Text>

      <div className="leaderboard-wrapper">
        {top.map((user, index) => (
          <AchievementUser 
            src={user.src}
            username={user.username}
            minecraftUsername={user.minecraftUsername}
            value={user.value}
            highlight={user.highlight}
            showDifference={user.showDifference}
            index={index + 1} />
        ))}
      </div>

      {highlight && highlight.length && <div className="highlight-wrapper">
          {highlight.map((user, index) => {
            <AchievementUser 
              src={user.src}
              username={user.username}
              minecraftUsername={user.minecraftUsername}
              value={user.value}
              highlight={user.highlight}
              showDifference={user.showDifference}
              index={index + 1} />
          })}
      </div>}

      <style>
        {STYLES}
      </style>
    </ConvertSVG>
  );
};
