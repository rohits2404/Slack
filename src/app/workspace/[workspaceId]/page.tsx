"use client";

import { useGetWorkSpace } from "@/features/workspaces/api/use-get-workspace";
import { useWorkSpaceId } from "@/hooks/use-workspace-id";

export default function WorkSpaceIdPage() {

    const workspaceId = useWorkSpaceId();

    const { data } = useGetWorkSpace({ id: workspaceId })

    return (
        <div>
            Id: {JSON.stringify(data)}
        </div>
    )
}