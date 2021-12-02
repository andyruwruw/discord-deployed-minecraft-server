// Packages
import React from 'react';

// Local Imports
import { Text } from '../Text';

export interface AchievementUserProps {
  children?: React.ReactNode | string,
  src: string;
  username: string;
  minecraftUsername: string;
  value: number;
  highlight: boolean;
  showDifference: boolean;
  index: number;
}

/**
 * Achievement leaderboard row.
 *
 * @returns {React.FC<any>} React component of achievement user.
 */
export const AchievementUser: React.FC<any> = ({
  children = '',
  src = '',
  index = 0,
  username = 'Unknown',
  minecraftUsername = 'Unknown',
  value = 0,
  highlight = false,
  showDifference = false,
  ...props
}: AchievementUserProps) => {
  return (
    <div className="leaderboard-user">
      <Text>
        { index }
      </Text>

      <img src={src} />

      <div className="leaderboard-user-content">
        <div className="leaderboard-user-content-text">
          <Text>
            { username }
          </Text>

          <Text color="">
            { minecraftUsername }
          </Text>
        </div>

        <div className="leaderboard-user-bar-wrapper">
          <div className="leaderboard-user-bar" />

          <div className="leaderboard-user-bar-difference" />
        </div>
      </div>
    </div>
  );
};
