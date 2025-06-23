const PageTitle = ({ pageName, title }: { pageName?: string, title: string }) => {
    return (
        <title>{pageName ? `${pageName} - ${title}` : title}</title>
    )
}

export default PageTitle