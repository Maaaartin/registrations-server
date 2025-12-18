import { Table, TableBody, TableCell, TableRow } from '@mui/material';
import TextWithDescription from '../../../components/TextWithDescription';

export default function DataPairsTable<T>({
  data,
  renderRow
}: {
  data: T[];
  // eslint-disable-next-line no-unused-vars
  renderRow: (object: T) => {
    name: string;
    description?: string | null;
    value: string;
  };
}) {
  return (
    <Table>
      <TableBody>
        {data.map((object, index) => {
          const { name, description, value } = renderRow(object);
          return (
            <TableRow key={index}>
              <TableCell>
                <TextWithDescription name={name} description={description} />
              </TableCell>
              <TableCell>{value}</TableCell>
            </TableRow>
          );
        })}
      </TableBody>
    </Table>
  );
}
