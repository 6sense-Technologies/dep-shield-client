import React from "react";
import { ColumnDef } from "@tanstack/react-table";

import { getColor } from "@/constants/globalFunctions";
import { SecondTableData } from "@/types/tableprops.types";
import DynamicTable from "@/components/DynamicTable";

const columns: ColumnDef<SecondTableData>[] = [
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

type SecondTabTableProps = {
    data: SecondTableData[];
};

const SecondTabTable: React.FC<SecondTabTableProps> = ({ data }) => {
    return <DynamicTable<SecondTableData> data={data} columns={columns} />;
};

export default SecondTabTable;