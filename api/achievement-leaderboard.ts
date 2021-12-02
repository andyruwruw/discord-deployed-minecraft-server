// Packages
import {
  VercelRequest,
  VercelRequestQuery,
  VercelResponse,
} from '@vercel/node';
import { renderToString } from 'react-dom/server';

// Local Imports
import { AchievementLeaderboard } from '../components/achievements/AchievementLeaderboard';
import { AchievementUserProps } from '../components/achievements/AchievementUser';

const TOP_USERNAMES_QUERY_KEY = 'top-usernames';

const TOP_MINECRAFT_USERNAMES_QUERY_KEY = 'top-minecraft-usernames';

const TOP_SRCS_QUERY_KEY = 'top-srcs';

const TOP_VALUES_QUERY_KEY = 'top-values';

const HIGHLIGHT_QUERY_KEY = 'highlight';

const SHOW_DIFFERENCE_QUERY_KEY = 'show-difference';

const HIGHLIGHT_USERNAMES_QUERY_KEY = 'highlight-usernames';

const HIGHLIGHT_MINECRAFT_USERNAMES_QUERY_KEY = 'highlight-minecraft-usernames';

const HIGHLIGHT_SRCS_QUERY_KEY = 'highlight-srcs';

const HIGHLIGHT_VALUES_QUERY_KEY = 'highlight-values';

const HIGHLIGHT_INDEX_QUERY_KEY = 'highlight-index';

/**
 * Generates top users from query parameters.
 *
 * @param {VercelRequestQuery} query Query parameters.
 * @returns {Array<AchievementUserProps>} List of users.
 */
const getTop = (
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

/**
 * Generates highlight users from query parameters.
 *
 * @param {VercelRequestQuery} query Query parameters.
 * @returns {Array<AchievementUserProps>} List of users.
 */
 const getHighlight = (
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

/**
 * Returns an SVG of the achievement leaderboard.
 *
 * @param {VercelRequest} req Vercel request object from request.
 * @param {VercelResponse} res Vercel response object.
 * @returns {VercelResponse} Returns response to end.
 */
export default async function (req: VercelRequest, res: VercelResponse) {
  try {
    const highlightUsername = (req.query[HIGHLIGHT_QUERY_KEY] as string) || '';
    const showDifferenceUsername = (req.query[SHOW_DIFFERENCE_QUERY_KEY] as string) || '';

    const highlightIndex = parseInt((req.query[HIGHLIGHT_INDEX_QUERY_KEY] as string), 10) || 0;

    // Hey! I'm returning an image!
    res.setHeader(
      'Content-Type',
      'image/svg+xml',
    );
    res.setHeader(
      'Cache-Control',
      's-maxage=1, stale-while-revalidate',
    );

    // Generating the component and rendering it
    const text: string = renderToString(
      AchievementLeaderboard({
        top: getTop(
          req.query,
          highlightUsername,
          showDifferenceUsername,
        ),
        highlight: getHighlight(
          req.query,
          highlightIndex,
          highlightUsername,
          showDifferenceUsername,
        ),
      }),
    );

    return res.send(text);
  } catch (error) {
    console.log(error);
  }
};
