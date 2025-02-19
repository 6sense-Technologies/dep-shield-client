"use client";

import { TrendingUp } from "lucide-react";
import {
    Label,
    PolarGrid,
    PolarRadiusAxis,
    RadialBar,
    RadialBarChart,
} from "recharts";

import {
    Card,
    CardContent,
    CardDescription,
    CardFooter,
    CardHeader,
    CardTitle,
} from "@/components/ui/card";
import { ChartConfig, ChartContainer } from "@/components/ui/chart";

type CustomRadialGraphProps = {
    chartData: { browser: string; visitors: number; fill: string }[];
    heading: string;
    subHeading: string;
};

const chartConfig = {
    visitors: {
        label: "Visitors",
    },
    safari: {
        label: "Safari",
        color: "hsl(var(--chart-2))",
    },
} satisfies ChartConfig;

export default function CustomRadialGraph({ chartData, heading, subHeading }: CustomRadialGraphProps) {
    return (
        <Card className="flex flex-col w-full max-w-[200px]">
            <CardHeader className="items-center pb-0">
                <CardTitle className="text-[16px] font-semibold text-deepBlackColor">{heading}</CardTitle>
                <CardDescription className="text-sm !text-[#60646C] font-normal">{subHeading}</CardDescription>
            </CardHeader>
            <CardContent className="flex-1 pb-0 flex justify-center items-center">
                <div style={{ width: '200px', height: '200px' }}>
                    <RadialBarChart
                        data={chartData}
                        width={180}
                        height={180}
                        endAngle={90}
                        innerRadius={60}
                        outerRadius={100}
                    >
                        <PolarGrid
                            gridType="circle"
                            radialLines={false}
                            stroke="none"
                            className="first:fill-muted last:fill-background"
                            polarRadius={[86, 74]}
                        />
                        <RadialBar dataKey="visitors" background={{ fill: '#d3d3d3' }} />
                        <PolarRadiusAxis tick={false} tickLine={false} axisLine={false}>
                            <Label
                                content={({ viewBox }) => {
                                    if (viewBox && "cx" in viewBox && "cy" in viewBox) {
                                        return (
                                            <text
                                                x={viewBox.cx}
                                                y={viewBox.cy}
                                                textAnchor="middle"
                                                dominantBaseline="middle"
                                            >
                                                <tspan
                                                    x={viewBox.cx}
                                                    y={viewBox.cy}
                                                    className="fill-deepBlackColor text-4xl font-bold"
                                                >
                                                    {chartData[0].visitors.toLocaleString()}
                                                </tspan>
                                            </text>
                                        );
                                    }
                                }}
                            />
                        </PolarRadiusAxis>
                    </RadialBarChart>
                </div>
            </CardContent>
        </Card>
    );
}