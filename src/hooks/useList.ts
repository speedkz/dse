/* eslint-disable @typescript-eslint/no-explicit-any */
import { Resource, ResourceService } from "@/services";
import {
  ColumnDef,
  getCoreRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  RowSelectionState,
  useReactTable,
} from "@tanstack/react-table";
import { useState } from "react";

interface UseListProps<T> {
  columns: ColumnDef<T, any>[];
  resource: Resource;
  data?: T[];
  manualPagination?: boolean;
}

export const useList = <T, TParams = object>(props: UseListProps<T>) => {
  const {
    columns,
    data: dataProps = [],
    resource: resourceProps,
    manualPagination = false,
  } = props;
  const resourceService = new ResourceService(resourceProps);

  const [data, _setData] = useState<T[]>(() => dataProps);
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});
  const [rowCount, setRowCount] = useState(0);

  const [pagination, setPagination] = useState({
    pageIndex: 0, //initial page index
    pageSize: 10, //default page size
  });

  const table = useReactTable({
    data,
    columns,
    onRowSelectionChange: setRowSelection,
    onPaginationChange: setPagination,
    state: {
      rowSelection,
      pagination,
    },
    manualPagination,
    rowCount,
    columnResizeMode: "onChange",
    columnResizeDirection: "ltr",
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
  });

  const handleGet = async (params?: TParams) => {
    const { data } = await resourceService.get<T[], TParams>(params);
    _setData(data);
    setRowCount(data.length);
    return data;
  };

  return { table, rowSelection, data, handleGet };
};
