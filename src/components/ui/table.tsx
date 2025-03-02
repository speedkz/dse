import { Box, Table as ChakraTable, Stack } from "@chakra-ui/react";
import {
  flexRender,
  RowSelectionState,
  Table as TanstackTable,
} from "@tanstack/react-table";
import { forwardRef } from "react";
import { FaCaretDown, FaCaretUp } from "react-icons/fa";
import { Checkbox } from "./checkbox";
import { Pagination } from ".";

export interface TableProps<T> extends ChakraTable.RootProps {
  table: TanstackTable<T>;
  selection?: boolean;
  rowSelection?: RowSelectionState;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const Table = forwardRef<HTMLTableElement, TableProps<any>>(
  function Table(props, ref) {
    const { table, selection, rowSelection } = props;

    const {
      getHeaderGroups,
      getRowModel,
      getFooterGroups,
      setRowSelection,
      getRowCount,
    } = table;

    const headerGroups = getHeaderGroups();
    const { rows } = getRowModel();
    const footerGroup = getFooterGroups();

    const ids = rows.map((x) => x.id);

    const isSelectAll = ids.every((id) => rowSelection?.[id]);

    const onSelectAll = (value: boolean) => {
      const selection = value
        ? ids.reduce(
            (acc, cur) => ({
              ...acc,
              [cur]: true,
            }),
            {}
          )
        : {};
      setRowSelection(selection);
    };

    return (
      <Stack>
        <ChakraTable.Root ref={ref}>
          <ChakraTable.Header>
            {headerGroups.map(({ id, headers }) => (
              <ChakraTable.Row key={id}>
                {selection && (
                  <ChakraTable.ColumnHeader
                    w={"58px"}
                    p={"18px"}
                    _after={{
                      w: 0,
                    }}
                  >
                    <Checkbox
                      checked={isSelectAll}
                      onCheckedChange={(e) => onSelectAll(!!e.checked)}
                    />
                  </ChakraTable.ColumnHeader>
                )}
                {headers.map(({ isPlaceholder, column, getContext }) => (
                  <ChakraTable.ColumnHeader
                    cursor={column.getCanSort() ? "pointer" : "auto"}
                    onClick={column.getToggleSortingHandler()}
                    title={
                      column.getCanSort()
                        ? column.getNextSortingOrder() === "asc"
                          ? "Sort ascending"
                          : column.getNextSortingOrder() === "desc"
                          ? "Sort descending"
                          : "Clear sort"
                        : undefined
                    }
                  >
                    {isPlaceholder
                      ? null
                      : flexRender(column.columnDef.header, getContext())}
                    <Box as={"span"} pos={"absolute"}>
                      {{
                        asc: <FaCaretUp />,
                        desc: <FaCaretDown />,
                      }[column.getIsSorted() as string] ?? null}
                    </Box>
                  </ChakraTable.ColumnHeader>
                ))}
              </ChakraTable.Row>
            ))}
          </ChakraTable.Header>
          <ChakraTable.Body>
            {rows.map((row) => (
              <ChakraTable.Row key={row.id}>
                {selection && (
                  <ChakraTable.Cell p={"18px"}>
                    <Checkbox
                      checked={!!rowSelection?.[row.id]}
                      onCheckedChange={(e) =>
                        setRowSelection({
                          ...rowSelection,
                          [row.id]: !!e.checked,
                        })
                      }
                    />
                  </ChakraTable.Cell>
                )}
                {row.getVisibleCells().map((cell) => (
                  <ChakraTable.Cell key={cell.id}>
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </ChakraTable.Cell>
                ))}
              </ChakraTable.Row>
            ))}
          </ChakraTable.Body>
          <ChakraTable.Footer>
            {footerGroup.map((footerGroup) => (
              <ChakraTable.Row key={footerGroup.id}>
                {footerGroup.headers.map((header) => (
                  <ChakraTable.Cell key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.footer,
                          header.getContext()
                        )}
                  </ChakraTable.Cell>
                ))}
              </ChakraTable.Row>
            ))}
          </ChakraTable.Footer>
        </ChakraTable.Root>
        <Pagination count={getRowCount()} w={"100%"} />
      </Stack>
    );
  }
);
