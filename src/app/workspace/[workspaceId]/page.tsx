interface WorkSpaceIdProps {
    params: Promise<{ 
        workspaceId: string 
    }>
}

export default async function WorkSpaceIdPage({ params }: WorkSpaceIdProps) {

    const { workspaceId } = await params

    return (
        <div>
            ID: {workspaceId}
        </div>
    )
}