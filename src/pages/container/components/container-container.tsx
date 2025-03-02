import { Table } from "@/components/ui";
import { Box } from "@chakra-ui/react";
import {
    createColumnHelper,
    getCoreRowModel,
    getSortedRowModel,
    RowSelectionState,
    useReactTable,
} from "@tanstack/react-table";
import { useState } from "react";
type Person = {
  firstName: string;
  lastName: string;
  age: number;
  visits: number;
  status: string;
  progress: number;
};
export const ContainerContainer = () => {
  const defaultData: Person[] = [
    {
      firstName: "tanner",
      lastName: "linsley",
      age: 24,
      visits: 100,
      status: "In Relationship",
      progress: 50,
    },
    {
      firstName: "tandy",
      lastName: "miller",
      age: 40,
      visits: 40,
      status: "Single",
      progress: 80,
    },
    {
      firstName: "joe",
      lastName: "dirte",
      age: 45,
      visits: 20,
      status: "Complicated",
      progress: 10,
    },
  ];

  const columnHelper = createColumnHelper<Person>();

  const columns = [
    columnHelper.accessor("firstName", {
      cell: (info) => info.getValue(),
      header: () => <span>First Name</span>,
    }),
    columnHelper.accessor((row) => row.lastName, {
      id: "lastName",
      cell: (info) => <i>{info.getValue()}</i>,
      header: () => <span>Last Name</span>,
    }),
    columnHelper.accessor("age", {
      header: () => "Age",
      cell: (info) => info.renderValue(),
    }),
    columnHelper.accessor("visits", {
      header: () => <span>Visits</span>,
    }),
    columnHelper.accessor("status", {
      header: "Status",
    }),
    columnHelper.accessor("progress", {
      header: "Profile Progress",
    }),
  ];

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [data, _setData] = useState(() => [...defaultData]);
  const [rowSelection, setRowSelection] = useState<RowSelectionState>({});

  const table = useReactTable({
    data,
    columns,
    onRowSelectionChange: setRowSelection,
    state: {
      rowSelection,
    },
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <Box w={"vw"}>
      <Table selection w={"100%"} table={table} rowSelection={rowSelection} />
    </Box>
  );
};
