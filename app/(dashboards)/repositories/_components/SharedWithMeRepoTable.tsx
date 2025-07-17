import ShareRepoModal from "@/app/(dashboards)/repositories/_components/ShareRepoModal";
import { AllRepoSharedUsers } from "@/app/(dashboards)/repositories/model/types";
import { Button } from "@/components/ui/button";
import { Pagination, Paper, Table } from "@mantine/core";
import { useDisclosure } from "@mantine/hooks";
import { ChevronLeft, ChevronRight, Share } from "lucide-react";
import Link from "next/link";
import { useState } from "react";

const SharedWithMeRepoTable = ({
    session,
    sharedWithMeRepos,
    setPage,
    limit,
    page,
}: {
    session: any
    sharedWithMeRepos: AllRepoSharedUsers | undefined;
    setPage: (page: number) => void;
    limit: number;
    page: number;
}) => {
    const [opened, { open, close }] = useDisclosure(false);
    const head = [
        "Repository Name",
        "Platform",
        "Shared by",
        "Actions",
    ];
    const [selectedRepoId, setSelectedRepoId] = useState('')

    const body = sharedWithMeRepos?.length ? sharedWithMeRepos?.map((item) => [
        item.repositoryName,
        "-",
        item.sharedByName,
        <section key={`link-${item?._id}`}>
            <Link
                href={`/repositories/${item?._id}/details`}

                className="border-[1px] rounded-md py-1 px-5 text-center cursor-pointer"
            >
                View
            </Link>
            <Button
                onClick={() => {
                    setSelectedRepoId(item?._id)
                    open()
                }}
                size='xsTight'
                variant='light'
                className='ml-2'
            >
                <Share />
                <span className='text-sm font-medium text-deepBlackColor lg:hidden'>
                    Share
                </span>
            </Button>
        </section>
    ]) : []

    // const displayedRowsCount = Math.min(page * limit, sharedWithMeRepos?.count || 0);

    return (
        <>
            <ShareRepoModal selectedRepoId={selectedRepoId} close={close} opened={opened} session={session} />
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
                                <th className="min-w-[120px] whitespace-nowrap py-4 px-2">Name</th>
                                <th className="min-w-[120px] whitespace-nowrap py-4 px-2">Discovered</th>
                                <th className="min-w-[120px] whitespace-nowrap py-4 px-2">Severity (CVSS3)</th>
                                <th className="min-w-[120px] whitespace-nowrap py-4 px-2">Severity (CVSS2)</th>
                                <th className="min-w-[120px] whitespace-nowrap py-4 px-2">Dependencies</th>
                                <th className="min-w-[120px] whitespace-nowrap py-4 px-2">Exploited (CISA)</th>
                                <th className="min-w-[120px] whitespace-nowrap py-4 px-2">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td colSpan={7} className="text-center text-[#64748B] py-6">
                                    No Results
                                </td>
                            </tr>
                        </tbody>
                    </Table>
                    // <div className="w-full text-center text-[#64748B] text-sm py-6">No Results</div>
                )}
            </Paper>

            <div className="flex items-center">
                {/* <div className="mr-auto text-sm text-[#64748B]">
                    {displayedRowsCount} of {sharedWithMeRepos?.count ?? 0} row(s) showing
                </div> */}
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
                        // total={Math.ceil((sharedWithMeRepos?.count ?? 0) / limit)}
                        total={Math.ceil((0) / limit)}
                        boundaries={1}
                        siblings={0}
                        defaultValue={page}
                    />
                </div>
            </div>

        </>
    );
};

export default SharedWithMeRepoTable;
