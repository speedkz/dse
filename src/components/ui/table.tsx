/* eslint-disable @typescript-eslint/no-explicit-any */
import { Box, Table as ChakraTable, Stack } from "@chakra-ui/react";
import {
  ColumnResizeDirection,
  ColumnResizeMode,
  flexRender,
  RowSelectionState,
  Table as TanstackTable,
} from "@tanstack/react-table";
import { forwardRef, memo, useMemo } from "react";
import { FaCaretDown, FaCaretUp } from "react-icons/fa";
import { Pagination } from ".";
import { Checkbox } from "./checkbox";

export interface TableProps<T> extends ChakraTable.RootProps {
  table: TanstackTable<T>;
  selection?: boolean;
  rowSelection?: RowSelectionState;
  columnResizeMode?: ColumnResizeMode;
  columnResizeDirection?: ColumnResizeDirection;
  data?: any;
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export const Table = forwardRef<HTMLTableElement, TableProps<any>>(
  function Table(props, ref) {
    const {
      table,
      selection,
      rowSelection,
      columnResizeMode = "onChange",
      columnResizeDirection = "ltr",
    } = props;

    const {
      getHeaderGroups,
      getRowModel,
      getFooterGroups,
      setRowSelection,
      getRowCount,
      setPagination,
      getTotalSize,
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

    const columnSizeVars = useMemo(() => {
      const headers = table.getFlatHeaders();
      const colSizes: { [key: string]: number } = {};
      for (let i = 0; i < headers.length; i++) {
        const header = headers[i]!;
        colSizes[`--header-${header.id}-size`] = header.getSize();
        colSizes[`--col-${header.column.id}-size`] = header.column.getSize();
      }
      return colSizes;
    }, [table.getState().columnSizingInfo, table.getState().columnSizing]);

    return (
      <Stack h={"100%"} bg="bg">
        <ChakraTable.Root ref={ref} style={{ ...columnSizeVars }}>
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

                {headers.map(
                  ({
                    isPlaceholder,
                    column,
                    colSpan,
                    id,
                    getContext,
                    getResizeHandler,
                  }) => (
                    <ChakraTable.ColumnHeader
                      colSpan={colSpan}
                      pos={"relative"}
                      key={id}
                      w={`calc(var(--header-${id}-size) * 1px)`}
                      cursor={column.getCanSort() ? "pointer" : "auto"}
                    >
                      {isPlaceholder
                        ? null
                        : flexRender(column.columnDef.header, getContext())}

                      <Box
                        as={"span"}
                        pos={"absolute"}
                        onClick={column.getToggleSortingHandler()}
                      >
                        {{
                          asc: <FaCaretUp />,
                          desc: <FaCaretDown />,
                        }[column.getIsSorted() as string] ?? null}
                      </Box>

                      <Box
                        as={"span"}
                        pos={"absolute"}
                        top={0}
                        w={2}
                        opacity={column.getIsResizing() ? 1 : 0}
                        _hover={{ opacity: 1 }}
                        height={"100%"}
                        bg={
                          column.getIsResizing() ? "primary.400" : "neutral.400"
                        }
                        cursor={"col-resize"}
                        userSelect={"none"}
                        touchAction={"none"}
                        {...(columnResizeDirection === "ltr"
                          ? { right: 0 }
                          : { left: 0 })}
                        {...{
                          onDoubleClick: column.resetSize,
                          onMouseDown: getResizeHandler(),
                          onTouchStart: getResizeHandler(),
                          transform:
                            columnResizeMode === "onEnd" &&
                            column.getIsResizing()
                              ? `translateX(${
                                  (table.options.columnResizeDirection === "rtl"
                                    ? -1
                                    : 1) *
                                  (table.getState().columnSizingInfo
                                    .deltaOffset ?? 0)
                                }px)`
                              : "",
                        }}
                      />
                    </ChakraTable.ColumnHeader>
                  )
                )}
              </ChakraTable.Row>
            ))}
          </ChakraTable.Header>

          <MemoizedTableBody
            table={table}
            selection={selection}
            rowSelection={rowSelection}
            data={table.options.data}
          />

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

        <Box flexGrow={1} borderBottom={"solid 1px {colors.neutral.100}"}></Box>

        <Box display={"flex"} p={"10px 15px"}>
          <Pagination
            setPagination={setPagination}
            count={getRowCount()}
            w={"100%"}
          />
        </Box>
      </Stack>
    );
  }
);

interface TableBodyProps<T> {
  table: TanstackTable<T>;
  selection?: boolean;
  rowSelection?: RowSelectionState;
  data: T[];
}
const TableBody = <T,>(props: TableBodyProps<T>) => {
  const { table, rowSelection, selection } = props;

  const { setRowSelection, getRowModel } = table;
  const { rows } = getRowModel();

  return (
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
  );
};

export const MemoizedTableBody = memo(TableBody, (prev, next) => {
  return JSON.stringify(prev.data) === JSON.stringify(next.data);
}) as typeof TableBody;
