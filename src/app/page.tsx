"use client";

import React, { useEffect, useMemo } from 'react'
import { UserButton } from '@/features/auth/components/user-button';
import { useGetWorkSpaces } from '@/features/workspaces/api/use-get-workspaces';
import { useCreateWorkSpaceModal } from '@/features/workspaces/store/use-create-workspace-modal';
import { useRouter } from 'next/navigation';

const Home = () => {

    const router = useRouter();

    const [open,setOpen] = useCreateWorkSpaceModal();

    const { data, isLoading } = useGetWorkSpaces();

    const workspaceId = useMemo(() => data?.[0]?._id, [data]);

    useEffect(() => {
        if(isLoading){
            return;
        }
        if(workspaceId){
            router.replace(`/workspace/${workspaceId}`)
        } else if(!open) {
            setOpen(true);
        }
    },[workspaceId,isLoading,open,setOpen,router])

    return (
        <div>
            <UserButton/>
        </div>
    )
}

export default Home