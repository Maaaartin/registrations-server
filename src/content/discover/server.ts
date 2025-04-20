import { z } from 'zod';
import { defaultPageSize, maxPageSize } from './index';
import { serialize, vehicleSelect } from '../data';
import { DiscoverVehiclesParams } from '../../../prisma/queries';
import { DDiscover, DPage } from '../decoders';
import prisma from '../../../prisma';
import { es, getDiscoverQuery } from '../../elastic';
import { withCache } from '../../redis';

const discoverDecoder = z.object({ id: z.number() });

export const discoverVehicles = (params: DiscoverVehiclesParams) => {
  return withCache(
    async () => {
      const result = await es.search({
        index: 'registrations',
        from: params.pageSize * params.page,
        size: params.pageSize,
        _source: ['id'],
        sort: [{ id: 'asc' }],
        query: getDiscoverQuery(params)
      });

      const ids = result.hits.hits.map(
        (hit) => discoverDecoder.parse(hit._source).id
      );
      const vehicles = await prisma.registrations.findMany({
        where: { id: { in: ids } },
        orderBy: { id: 'asc' },
        select: vehicleSelect
      });
      return vehicles.map(serialize);
    },
    'discover' + JSON.stringify(params)
  );
};

const pageSizeDecoder = z.object({
  pageSize: z
    .string()
    .default(String(defaultPageSize))
    .transform((val) => {
      const valNr = parseInt(val, 10);
      if (!valNr) {
        return defaultPageSize;
      }
      if (valNr >= maxPageSize) {
        return maxPageSize;
      }
      return valNr;
    })
});

export const queryDecoder = DDiscover.merge(DPage).merge(pageSizeDecoder);
