import { Button } from '@/components/ui/button';
import { Dialog, DialogClose, DialogContent, DialogDescription, DialogHeader, DialogTitle } from '@/components/ui/dialog'
import { useNewJoinCode } from '@/features/workspaces/api/use-new-join-code';
import { useConfirm } from '@/hooks/use-confirm';
import { useWorkSpaceId } from '@/hooks/use-workspace-id';
import { CopyIcon, RefreshCcw } from 'lucide-react';
import React from 'react'
import { toast } from 'sonner';

interface InviteModalProps {
    open: boolean;
    setOpen: (open: boolean) => void;
    name: string;
    joinCode: string;
}

const InviteModal = ({ open, setOpen, name, joinCode }: InviteModalProps) => {

    const workspaceId = useWorkSpaceId();

    const [ConfirmDialog,confirm] = useConfirm(
        "Are You Sure ?",
        "This will Deactivate the Current Invite Code and Regenerate a New One"
    )

    const { mutate, isPending } = useNewJoinCode();

    const handleNewCode = async () => {
        const ok = await confirm();
        if(!ok) return;
        mutate({ workspaceId }, {
            onSuccess: () => {
                toast.success("Invite Code Re-Generated")
            },
            onError: () => {
                toast.error("Failed To Regenerate Invite Code")
            }
        })
    }

    const handleCopy = () => {
        const invitation = `${window.location.origin}/join/${workspaceId}`;
        navigator.clipboard.writeText(invitation).then(() => toast.success("Invite Link Copied to Clipboard"))
    }

    return (
        <>
            <ConfirmDialog />
            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Invite People to your {name}</DialogTitle>
                        <DialogDescription>
                            Use The Code Below To Invite People to your {name}
                        </DialogDescription>
                    </DialogHeader>
                    <div className='flex flex-col gap-y-4 items-center justify-center py-10'>
                        <p className='text-4xl font-bold tracking-widest uppercase'>{joinCode}</p>
                        <Button
                        variant={"ghost"}
                        size={"sm"}
                        onClick={handleCopy}
                        >
                            Copy Link
                            <CopyIcon className='size-4 ml-2'/>
                        </Button>
                    </div>
                    <div className='flex items-center justify-between w-full'>
                        <Button
                        disabled={isPending}
                        onClick={handleNewCode}
                        variant={"outline"}
                        >   
                            New Code
                            <RefreshCcw className='size-4 ml-2' />
                        </Button>
                        <DialogClose asChild>
                            <Button>Close</Button>
                        </DialogClose>
                    </div>
                </DialogContent>
            </Dialog>
        </>
    )
}

export default InviteModal