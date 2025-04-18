import type { NextApiRequest, NextApiResponse } from 'next';
import { DDiscover } from '../../content/decoders';
import { es, getDiscoverQuery } from '../../elastic';
import { withCache } from '../../redis';

type Params = ReturnType<typeof DDiscover.parse>;

const fetchCount = async (params: Params) =>
  withCache(
    async () => {
      const result = await es.count({
        index: 'registrations',
        query: getDiscoverQuery(params)
      });
      return result.count;
    },
    'discoverCount' + JSON.stringify(params)
  );

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<number>
) {
  const params = DDiscover.parse(req.query);
  const count = await fetchCount(params);
  res.send(count);
}
