"use client";

import React from 'react'
import ToolBar from './toolbar'
import Sidebar from './sidebar';
import { ResizableHandle, ResizablePanel, ResizablePanelGroup } from '@/components/ui/resizable';
import WorkSpaceSidebar from './workspace-sidebar';

const WorkSpaceLayout = ({ children }: { children: React.ReactNode }) => {
    return (
        <div className='h-full'>
            <ToolBar/>
            <div className='flex h-[calc(100vh-40px)]'>
                <Sidebar/>
                <ResizablePanelGroup direction="horizontal" autoSaveId={"ca-workspace-layout"}>
                    <ResizablePanel
                    defaultSize={20}
                    minSize={11}
                    className='bg-[#5E2C5F]'
                    >
                        <WorkSpaceSidebar/>
                    </ResizablePanel>
                    <ResizableHandle withHandle/>
                    <ResizablePanel
                    minSize={20}
                    >
                        {children}
                    </ResizablePanel>
                </ResizablePanelGroup>
            </div>
        </div>
    )
}

export default WorkSpaceLayout