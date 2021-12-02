// Packages
import { VercelRequestQuery } from '@vercel/node';

// Local Imports
import { AchievementUserProps } from '../components/achievements/AchievementUser';

const TOP_USERNAMES_QUERY_KEY = 'top-usernames';

const TOP_MINECRAFT_USERNAMES_QUERY_KEY = 'top-minecraft-usernames';

const TOP_SRCS_QUERY_KEY = 'top-srcs';

const TOP_VALUES_QUERY_KEY = 'top-values';

/**
 * Generates top users from query parameters.
 *
 * @param {VercelRequestQuery} query Query parameters.
 * @returns {Array<AchievementUserProps>} List of users.
 */
 const getLeaderboardTop = (
  query: VercelRequestQuery,
  highlightUsername: string,
  showDifferenceUsername: string,
): Array<AchievementUserProps> => {
  const users: Array<AchievementUserProps> = [];

  if (!(TOP_USERNAMES_QUERY_KEY in query)
    || !(TOP_MINECRAFT_USERNAMES_QUERY_KEY in query)
    || !(TOP_SRCS_QUERY_KEY in query)
    || !(TOP_VALUES_QUERY_KEY in query)) {
    return users;
  }

  const usernames = (query[TOP_USERNAMES_QUERY_KEY] as string).split(',');
  const minecraftUsernames = (query[TOP_MINECRAFT_USERNAMES_QUERY_KEY] as string).split(',');
  const srcs = (query[TOP_SRCS_QUERY_KEY] as string).split(',');
  const values = (query[TOP_VALUES_QUERY_KEY] as string).split(',');

  for (let i = 0; i < usernames.length; i++) {
    users.push({
      username: usernames[i],
      minecraftUsername: minecraftUsernames[i],
      src: srcs[i],
      value: parseInt(values[i], 10),
      highlight: highlightUsername === usernames[i],
      showDifference: showDifferenceUsername === usernames[i],
      index: i + 1,
    });
  }

  return users;
}
