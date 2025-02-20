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

const getColor = (key: string, value: string) => {
    if (key === "Attack Vector") {
        switch (value) {
            case "Network":
                return "text-red-600";
            case "Adjacent Network":
                return "text-[#B45309]";
            case "Local":
                return "text-[#0284C7]";
            case "Physical":
                return "text-[#166534]";
            default:
                return "";
        }
    } else if (key === "Attack Complexity") {
        switch (value) {
            case "Low":
                return "text-red-600";
            case "Medium":
                return "text-[#B45309]";
            case "High":
                return "text-[#166534]";
            default:
                return "";
        }
    } else if (key === "Privileges Required") {
        switch (value) {
            case "None":
                return "text-red-600";
            case "Low":
                return "text-[#B45309]";
            case "Medium":
                return "text-[#0284C7]";
            default:
                return "";
        }
    }
    else if (key === "User Interaction") {
        switch (value) {
            case "None":
                return "text-red-600";
            case "Required":
                return "text-[#166534]";
        }
    }
    else if (key === "Scope") {
        switch (value) {
            case "Changed":
                return "text-red-600";
            case "Unchanged":
                return "text-[#166534]";
        }
    }
    else if (key === "Confidentiality") {
        switch (value) {
            case "High":
                return "text-red-600";
            case "Partial":
                return "text-[#B45309]";
            case "Low":
                return "text-[#0284C7]";
            case "None":
                return "text-[#166534]";
        }
    }
    else if (key === "Integrity") {
        switch (value) {
            case "High":
                return "text-red-600";
            case "Partial":
                return "text-[#B45309]";
            case "Low":
                return "text-[#0284C7]";
            case "None":
                return "text-[#166534]";
        }
    }
    else if (key === "Availability") {
        switch (value) {
            case "High":
                return "text-red-600";
            case "Partial":
                return "text-[#B45309]";
            case "Low":
                return "text-[#0284C7]";
            case "None":
                return "text-[#166534]";
        }
    }
    else if (key === "Authentication") {
        switch (value) {
            case "None":
                return "text-red-600";
            case "Partial":
                return "text-[#B45309]";
            case "Low":
                return "text-[#0284C7]";
            case "High":
                return "text-[#166534]";
        }
    }
    return "";
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
        cell: ({ row }: { row: any }) => {
            const key = row.getValue("key");
            const value = row.getValue("value");
            const colorClass = getColor(key, value);
            return (
                <div className={`text-medium ${colorClass}`}>{value || "-"}</div>
            );
        },
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