import type { NextApiRequest, NextApiResponse } from 'next';
import { stringify } from 'csv-stringify/sync';
import { DId } from '../../content/decoders';
import prisma from '../../../prisma';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<string>
) {
  const { id } = DId.parse(req.query);
  try {
    const vehicle = await prisma.registrations.findFirstOrThrow({
      where: { id },
      omit: { id: true }
    });

    const values = Object.values(vehicle).map((val) => {
      if (typeof val === 'bigint') {
        return Number(val);
      }
      if (val instanceof Date) {
        return val.toISOString();
      }
      return val;
    });

    const csv = stringify([values], {
      header: true,
      columns: Object.keys(vehicle)
    });

    res.setHeader('Content-Type', 'text/csv');
    res.setHeader(
      'Content-Disposition',
      `attachment; filename="${vehicle.tovarni_znacka}_${vehicle.obchodni_oznaceni}_${vehicle.vin}.csv"`
    );
    res.send(csv);
  } catch (error) {
    res.status(500).send('Server error');
  }
}
