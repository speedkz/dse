import { PageContainer, PageHeader } from "@/components/template";
import { Button, Table } from "@/components/ui";
import { useFormControl } from "@/hooks";
import { useList } from "@/hooks/useList";
import { IContainer } from "@/services";
import { Box, IconButton } from "@chakra-ui/react";
import { createColumnHelper } from "@tanstack/react-table";
import { ReactNode, useEffect } from "react";
import { useForm } from "react-hook-form";
import {
  FiEdit3,
  FiLogOut,
  FiPlus,
  FiSearch,
  FiTrash2,
  FiUpload,
} from "react-icons/fi";

interface ColumnHelperProps extends IContainer {
  action: ReactNode;
}
export const ContainerContainer = () => {
  const columnHelper = createColumnHelper<ColumnHelperProps>();

  const columns = [
    columnHelper.accessor("name", {
      cell: (info) => info.getValue(),
      header: () => <span>Container name</span>,
    }),
    columnHelper.accessor((row) => row.type, {
      id: "type",
      cell: (info) => <i>{info.getValue()}</i>,
      header: () => <span>Container type</span>,
    }),
    columnHelper.accessor("weight", {
      header: () => "Weight (kg)",
      cell: (info) => info.renderValue(),
    }),
    columnHelper.accessor("capacity", {
      header: () => <span>Capacity (m3)</span>,
    }),
    columnHelper.accessor("action", {
      header: "",
      size: 20,
      cell: () => (
        <Box display={"flex"} gap={2}>
          <IconButton color={"primary.400"} variant={"ghost"}>
            <FiEdit3 />
          </IconButton>

          <IconButton color={"primary.400"} variant={"ghost"}>
            <FiTrash2 />
          </IconButton>
        </Box>
      ),
    }),
  ];

  const useFormReturn = useForm();
  const { InputGroupControl } = useFormControl({ useFormReturn });

  const { table, rowSelection, handleGet } = useList<ColumnHelperProps>({
    columns,
    resource: "container",
  });

  useEffect(() => {
    handleGet();
  }, []);

  return (
    <PageContainer>
      <PageHeader title="Container">
        <Box display={"flex"} alignItems={"center"} gap={"15px"}>
          <InputGroupControl
            name="searchText"
            fieldProps={{
              w: "330px",
            }}
            inputGroupProps={{
              startElement: <FiSearch />,
            }}
            inputProps={{
              placeholder: "Search",
            }}
          />

          <Button variant={"outline"} onClick={handleGet}>
            <FiLogOut /> Import
          </Button>

          <Button variant={"outline"} disabled>
            <FiUpload /> Export
          </Button>

          <Button>
            <FiPlus /> Add
          </Button>
        </Box>
      </PageHeader>

      <Table selection w={"100%"} table={table} rowSelection={rowSelection} />
    </PageContainer>
  );
};
