import { Skeleton } from "./ui/skeleton";

export default function EmptyTableSkeleton() {
  const widths = [
    ["w-1/4", "w-1/2", "w-3/4", "w-full", "w-1/3"],
    ["w-1/2", "w-1/4", "w-3/4", "w-1/3", "w-full"],
    ["w-3/4", "w-1/3", "w-1/2", "w-full", "w-1/4"],
    ["w-full", "w-1/2", "w-1/4", "w-3/4", "w-1/3"],
    ["w-1/3", "w-full", "w-1/2", "w-1/4", "w-3/4"],
    ["w-1/4", "w-3/4", "w-full", "w-1/2", "w-1/3"],
    ["w-1/2", "w-1/3", "w-1/4", "w-full", "w-3/4"],
    ["w-3/4", "w-full", "w-1/3", "w-1/2", "w-1/4"],
    ["w-full", "w-1/4", "w-3/4", "w-1/3", "w-1/2"],
    ["w-1/3", "w-1/2", "w-full", "w-1/4", "w-3/4"],
  ];

  return (
    <div className="w-full">
      <div className="overflow-hidden rounded-lg border border-lightborderColor">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b bg-muted/50">
              {[...Array(5)].map((_, i) => (
                <th key={i} className="h-12 pl-4 pr-4 text-left align-middle font-medium">
                  <Skeleton className="h-4 w-full pl-2 pr-2" />
                </th>
              ))}
            </tr>
          </thead>
          <tbody>
            {widths.map((rowWidths, rowIndex) => (
              <tr key={rowIndex} className="border-b h-12">
                {rowWidths.map((width, colIndex) => (
                  <td key={colIndex} className="py-1 pl-4 pr-4">
                    <Skeleton className={`h-4 ${width}`} />
                  </td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}