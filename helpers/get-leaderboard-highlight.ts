// Packages
import { VercelRequestQuery } from '@vercel/node';

// Local Imports
import { AchievementUserProps } from '../components/achievements/AchievementUser';

const HIGHLIGHT_USERNAMES_QUERY_KEY = 'highlight-usernames';

const HIGHLIGHT_MINECRAFT_USERNAMES_QUERY_KEY = 'highlight-minecraft-usernames';

const HIGHLIGHT_SRCS_QUERY_KEY = 'highlight-srcs';

const HIGHLIGHT_VALUES_QUERY_KEY = 'highlight-values';

/**
 * Generates highlight users from query parameters.
 *
 * @param {VercelRequestQuery} query Query parameters.
 * @returns {Array<AchievementUserProps>} List of users.
 */
 const getLeaderboardHighlight = (
  query: VercelRequestQuery,
  highlightIndex: number,
  highlightUsername: string,
  showDifferenceUsername: string,
): Array<AchievementUserProps> => {
  const users: Array<AchievementUserProps> = [];

  if (!(HIGHLIGHT_USERNAMES_QUERY_KEY in query)
    || !(HIGHLIGHT_MINECRAFT_USERNAMES_QUERY_KEY in query)
    || !(HIGHLIGHT_SRCS_QUERY_KEY in query)
    || !(HIGHLIGHT_VALUES_QUERY_KEY in query)) {
    return users;
  }

  const usernames = (query[HIGHLIGHT_USERNAMES_QUERY_KEY] as string).split(',');
  const minecraftUsernames = (query[HIGHLIGHT_MINECRAFT_USERNAMES_QUERY_KEY] as string).split(',');
  const srcs = (query[HIGHLIGHT_SRCS_QUERY_KEY] as string).split(',');
  const values = (query[HIGHLIGHT_VALUES_QUERY_KEY] as string).split(',');

  for (let i = 0; i < usernames.length; i++) {
    users.push({
      username: usernames[i],
      minecraftUsername: minecraftUsernames[i],
      src: srcs[i],
      value: parseInt(values[i], 10),
      highlight: highlightUsername === usernames[i],
      showDifference: showDifferenceUsername === usernames[i],
      index: i + highlightIndex,
    });
  }

  return users;
}