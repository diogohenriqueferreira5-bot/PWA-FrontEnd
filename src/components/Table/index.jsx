import { Table as TableReact } from "reactstrap";
import _ from "lodash";

const Table = ({ columns = [], rows = { data: [] }, pagination = {} }) => {
  return (
    <TableReact hover>
      <thead>
        <tr>
          {columns.map((column, index) => {
            return <th key={`${index}_${column}`}>{column}</th>;
          })}
        </tr>
      </thead>
      <tbody>
        {rows.data.map((row, index) => {
          return (
            <tr key={`${row.id}_${index}`}>
              {columns.map((column) => {
                return (
                  <td key={`${column}_${row[column]}`}>
                    {_.get(row, column)}
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    </TableReact>
  );
};

export default Table;