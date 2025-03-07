export const getBadgeVariant = (severity: string) => {
    switch (severity) {
        case "Critical":
            return "text-[#B91C1C] bg-[#FEF2F2] hover:bg-[#FEF2F2] font-normal";
        case "High":
            return "text-[#B45309] bg-[#FDEBDD] hover:bg-[#FDEBDD] font-normal";
        case "Medium":
            return "text-[#0284C7] bg-[#DDF3FD] hover:bg-[#DDF3FD] font-normal";
        case "Low":
            return "text-[#166534] bg-[#DCFCE7] hover:bg-[#DCFCE7] font-normal";
        default:
            return "text-[#0F172A] bg-[#F1F5F9] hover:bg-[#F1F5F9] font-normal";
    }
};


export const getColor = (key: string, value: string) => {
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

export const getInitials = (name: string) => {
    if (!name) return "NA";
    const parts = name.split(" ");
    if (parts.length === 1) {
        return parts[0][0].toUpperCase();
    }
    return (parts[0][0] + parts[1][0]).toUpperCase();
};

export const getHealthBadgeVariant = (value: number) => {
    if (value === null) {
        return "text-[#020617] bg-[#F1F5F9] hover:bg-[#F1F5F9] font-normal";
    } else if (value >= 0 && value <= 30) {
        return "text-[#FFFFFF] bg-[#B91C1C] hover:bg-[#B91C1C] font-normal";
    } else if (value >= 31 && value <= 70) {
        return "text-[#FFFFFF] bg-[#B45309] hover:bg-[#B45309] font-normal";
    }
    return "text-[#FFFFFF] bg-[#15803D] hover:bg-[#15803D] font-normal";
};

export const formatShareTime = (shareTime: string) => {
    const [time, date] = shareTime.split(".");
    return (
        <div className="flex flex-col">
            <span className="text-black">{time}</span>
            <span className="text-inputFooterColor pt-1">{date}</span>
        </div>
    );
}