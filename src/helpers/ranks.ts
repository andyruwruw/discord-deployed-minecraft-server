// Local Imports
import { PLAYTIME_RANKS } from '../config/ranks';

// Types
import { PlaytimeRank } from '../types';

/**
 * Retrieves role for hours.
 *
 * @param {number} hours Number of hours. 
 * @returns {PlaytimeRank} Rank for hours.
 */
export const getRankForHours = (hours: number): PlaytimeRank => {
  let rank = 0;

  // For every role.
  for (let i = 0; i < PLAYTIME_RANKS.length; i += 1) {
    // If the hours are less than this role.
    if (hours < PLAYTIME_RANKS[i].hours) {
      // Their role is the previous.
      rank = i > 0 ? i - 1 : 0;
      break;
    } if (hours === PLAYTIME_RANKS[i].hours) {
      rank = i;
      break;
    } if (i === PLAYTIME_RANKS.length - 1) {
      // If at the end, final role.
      rank = i;
    }
  }

  return PLAYTIME_RANKS[rank] as PlaytimeRank;
}
