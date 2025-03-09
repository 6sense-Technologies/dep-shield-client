import React from "react";
import { ColumnDef } from "@tanstack/react-table";

import { getColor } from "@/constants/globalFunctions";
import { FirstTableData, FirstTabTableProps } from "@/types/tableprops.types";
import DynamicTable from "@/components/DynamicTable";

const columns: ColumnDef<FirstTableData>[] = [
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

const FirstTabTable: React.FC<FirstTabTableProps> = ({ data }) => {
    return <DynamicTable<FirstTableData> data={data} columns={columns} />;
};

export default FirstTabTable;