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

interface DynamicTableProps<T> {
    data: T[];
    columns: ColumnDef<T>[];
}

const DynamicTable = <T,>({ data, columns }: DynamicTableProps<T>) => {
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

export default DynamicTable;