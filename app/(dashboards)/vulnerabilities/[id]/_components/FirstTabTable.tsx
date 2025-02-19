import React from "react";
import {
    flexRender,
    useReactTable,
    ColumnDef,
    getCoreRowModel,
} from "@tanstack/react-table";
import {
    Table,
    TableBody,
    TableCell,
    TableRow,
} from "@/components/ui/table";

type Data = {
    key: string;
    value: string;
};

const columns: ColumnDef<Data>[] = [
    {
        accessorKey: "key",
        cell: ({ row }: { row: any }) => (
            <div className="text-medium">{row.getValue("key") || "-"}</div>
        ),
    },
    {
        accessorKey: "value",
        cell: ({ row }: { row: any }) => (
            <div className="text-medium">{row.getValue("value") || "-"}</div>
        ),
    },
];

type FirstTabTableProps = {
    data: Data[];
};

const FristTabTable: React.FC<FirstTabTableProps> = ({ data }) => {
    const table = useReactTable({
        data,
        columns,
        getCoreRowModel: getCoreRowModel(),
    });

    return (
        <div className="w-[390px]">
            <Table className="border-none">
                <TableBody>
                    {table.getRowModel().rows.map((row: any) => (
                        <TableRow key={row.id} className="border-none">
                            {row.getVisibleCells().map((cell: any) => (
                                <TableCell key={cell.id} className="border-none">
                                    {flexRender(
                                        cell.column.columnDef.cell as React.ReactNode,
                                        cell.getContext()
                                    )}
                                </TableCell>
                            ))}
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    );
};

export default FristTabTable;