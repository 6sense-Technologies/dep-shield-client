export type IntegrationAreaProps = {
    connections: {
        github: boolean;
        gitlab: boolean;
        bitbucket: boolean;
    };
    handleConnect: (integration: string, event?: React.MouseEvent) => void;
    handleDisconnect: (integration: string) => void;
    gitStatus: boolean;
    refetchGitStatus: () => void;
};