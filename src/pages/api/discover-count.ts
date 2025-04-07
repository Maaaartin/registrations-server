import type { NextApiRequest, NextApiResponse } from 'next';
import { discoverCount, vehicleIdsWithImports_ } from '../../../prisma/queries';
import { DDiscover } from '../../content/decoders';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<number>
) {
  const props = DDiscover.parse(req.query);
  const {
    imported,
    tovarni_znacka,
    typ,
    datum_prvni_registrace_do,
    datum_prvni_registrace_od,
    pohon
  } = props;
  if (imported) {
    const result = await vehicleIdsWithImports_({
      tovarni_znacka,
      typ,
      datum_prvni_registrace_do,
      datum_prvni_registrace_od,
      pohon
    });
    res.send(Number(result[0]?.total_count) || 0);
  } else {
    const result = await discoverCount(props);
    res.send(result);
  }
}
