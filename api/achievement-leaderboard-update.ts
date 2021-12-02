// Packages
import {
  VercelRequest,
  VercelResponse,
} from '@vercel/node';
import { renderToString } from 'react-dom/server';

// Local Imports
import { AchievementLeaderboard } from '../components/achievements/AchievementLeaderboard';
import { AchievementUserProps } from '../components/achievements/AchievementUser';

const HIGHLIGHT_QUERY_KEY = 'highlight';

const SHOW_DIFFERENCE_QUERY_KEY = 'show-difference';

const HIGHLIGHT_INDEX_QUERY_KEY = 'highlight-index';

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
