import { AllRepoType } from "@/app/(dashboards)/vulnerabilities/types/types";
import { Pagination, Paper, Table } from "@mantine/core";
import { ChevronLeft, ChevronRight } from "lucide-react";
import Link from "next/link";

const RepoTable = ({
    allRepos,
    setPage,
    limit,
    page,
}: {
    allRepos: AllRepoType | undefined;
    setPage: (page: number) => void;
    limit: number;
    page: number;
}) => {
    const head = [
        "Repository Name",
        "Actions",
    ];

    const body = allRepos?.data?.length ? allRepos?.data?.map((item) => [
        item.repoName,

        <Link
            href={`/repositories/${item?._id}/details`}
            key={`link-${item?._id}/details`}
            className="border-[1px] rounded-md py-1 px-5 text-center cursor-pointer"
        >
            View
        </Link>,
    ])
        :
        [];

    const displayedRowsCount = Math.min(page * limit, allRepos?.count || 0);

    return (
        <>
            <Paper withBorder radius="md" className="overflow-x-auto">
                {body.length > 0 ? (
                    <Table
                        // withTableBorder
                        data={{ head, body }}
                        verticalSpacing={18}
                        className="min-w-[900px] !table-fixed w-full"
                        classNames={{
                            thead: "!text-[#64748B] !text-xs !font-normal",
                            th: "min-w-[120px] whitespace-nowrap",
                            td: "min-w-[120px] whitespace-nowrap",
                        }}
                    />
                ) : (
                    <Table
                        // withTableBorder
                        className="min-w-[900px] !table-fixed w-full rounded-md"
                        classNames={{
                            table: "border", // optional: outer border if needed
                            thead: "!text-[#64748B] !text-xs !font-normal",
                            th: "min-w-[120px] whitespace-nowrap",
                            td: "min-w-[120px] whitespace-nowrap",
                        }}
                    >
                        <thead className="!text-[#64748B] !text-xs !font-normal">
                            {/* @ts-ignore */}
                            <tr align="left">
                                <th className="min-w-[120px] whitespace-nowrap py-4 px-2">Repository Name</th>
                                <th className="min-w-[120px] whitespace-nowrap py-4 px-2">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td colSpan={2} className="text-center text-[#64748B] py-6">
                                    No Results
                                </td>
                            </tr>
                        </tbody>
                    </Table>
                    // <div className="w-full text-center text-[#64748B] text-sm py-6">No Results</div>
                )}
            </Paper>

            <div className="flex items-center">
                <div className="mr-auto text-sm text-[#64748B]">
                    {displayedRowsCount} of {allRepos?.count ?? 0} row(s) showing
                </div>
                <div className="flex justify-end mt-4 ml-auto">
                    <Pagination
                        gap={20}
                        classNames={{
                            root: "!justify-end",
                            control:
                                "!border-0 !border-[#E2E8F0] !rounded-lg !text-[#020617] !bg-transparent data-[active=true]:!border-[1px]",
                        }}
                        nextIcon={() => (
                            <span className="flex items-center gap-1 text-sm font-semibold">
                                Next <ChevronRight size={16} />
                            </span>
                        )}
                        previousIcon={() => (
                            <span className="flex items-center gap-1 text-sm font-semibold">
                                <ChevronLeft size={16} /> Previous
                            </span>
                        )}
                        onChange={setPage}
                        total={Math.ceil((allRepos?.count ?? 0) / limit)}
                        boundaries={1}
                        siblings={0}
                        defaultValue={page}
                    />
                </div>
            </div>
        </>
    );
};

export default RepoTable;
