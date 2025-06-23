export type IntegrationAreaProps = {
    email1: string;
    email2: string;
    email3: string;
};

export type ProfileAvatarSectionProps = {
    defaultAvatarUrl: string;
    session: any;
    getInitials: (name: string) => string;



}