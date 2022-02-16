import {
  Paper,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Table as MUITable,
  Typography
} from '../../atoms'
import React from 'react'

export interface ITableItem {
  id: string | number
}
type IColumn<T extends ITableItem> = Record<keyof T, string>

interface ITableProps<T extends ITableItem> {
  items: T[]
  headers: IColumn<T>
}

/** Helpers */

// helper to get an array containing the object values with
// the correct type infered.
function objectValues<T extends {}>(obj: T) {
  return Object.keys(obj).map((objKey) => obj[objKey as keyof T])
}

function objectKeys<T extends {}>(obj: T) {
  return Object.keys(obj).map((objKey) => objKey as keyof T)
}

const Table = <T extends ITableItem>({ items, headers }: ITableProps<T>) => {
  return (
    <TableContainer component={Paper}>
      <MUITable>
        <TableHead>
          <TableRow>
            {objectValues(headers).map((headerValue, i) => (
              <TableCell key={`headers-${i}`}>
                <Typography variant='subtitle1' fontWeight='bold'>
                  {headerValue}
                </Typography>
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {items.length ? (
            items.map((item, i) => (
              <TableRow key={`rows-${i}`}>
                {objectKeys(item).map((itemProperty, i) => (
                  <TableCell key={`${item[itemProperty]}-${i}`}>
                    {item[itemProperty]}
                  </TableCell>
                ))}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell>Table is empty</TableCell>
            </TableRow>
          )}
        </TableBody>
      </MUITable>
    </TableContainer>
  )
}

export default Table
