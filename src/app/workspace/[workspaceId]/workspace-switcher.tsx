import { Button } from '@/components/ui/button'
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from '@/components/ui/dropdown-menu'
import { useGetWorkSpace } from '@/features/workspaces/api/use-get-workspace'
import { useGetWorkSpaces } from '@/features/workspaces/api/use-get-workspaces'
import { useCreateWorkSpaceModal } from '@/features/workspaces/store/use-create-workspace-modal'
import { useWorkSpaceId } from '@/hooks/use-workspace-id'
import { Loader, Plus } from 'lucide-react'
import { useRouter } from 'next/navigation'
import React from 'react'

const WorkSpaceSwitcher = () => {

    const router = useRouter();

    const workspaceId = useWorkSpaceId();

    const [_open,setOpen] = useCreateWorkSpaceModal();

    const { data: workspace, isLoading: workspaceLoading } = useGetWorkSpace({ id: workspaceId });

    const { data: workspaces, isLoading: workspacesLoading } = useGetWorkSpaces();

    const filterWorkSpaces = workspaces?.filter(
        (workspace) => workspace?._id !== workspaceId
    )

    return (
        <DropdownMenu>
            <DropdownMenuTrigger>
                <Button className='size-9 relative overflow-hidden bg-[#ABABAD] hover:bg-[#ABABAD]/80 text-slate-800 font-semibold text-xl'>
                    {workspaceLoading ? (
                        <Loader className='size-5 animate-spin shrink-0'/>
                    ) : (
                        workspace?.name.charAt(0).toUpperCase()
                    )}
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent side='bottom' align='start' className='w-64'>
                <DropdownMenuItem 
                onClick={() => router.push(`/workspace/${workspaceId}`)}
                className='cursor-pointer flex-col justify-start items-start capitalize'
                >
                    {workspace?.name}
                    <span className='text-xs text-muted-foreground'>
                        Active WorkSpace
                    </span>
                </DropdownMenuItem>
                {filterWorkSpaces?.map((workspace) => (
                    <DropdownMenuItem
                    key={workspace._id}
                    className='cursor-pointer capitalize overflow-hidden'
                    onClick={() => router.push(`/workspace/${workspace._id}`)}
                    >
                        <div className='shrink-0 size-9 relative overflow-hidden bg-[#616061] text-white font-semibold text-xl rounded-md flex items-center justify-center mr-2'>
                            {workspace.name.charAt(0).toUpperCase()}
                        </div>
                        <p className='truncate'>{workspace.name}</p>
                    </DropdownMenuItem>
                ))}
                <DropdownMenuItem
                onClick={() => setOpen(true)}
                className='cursor-pointer'
                >
                    <div className='size-9 relative overflow-hidden bg-[#F2F2F2] text-slate-800 font-semibold text-xl rounded-md flex items-center justify-center mr-2'>
                        <Plus/>
                    </div>
                    Create a New WorkSpace
                </DropdownMenuItem>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}

export default WorkSpaceSwitcher