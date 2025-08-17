import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { JSX, useState } from "react"

export const useConfirm = (title: string, message: string ): [() => JSX.Element, () => Promise<unknown>] => {

    const [promise,setPromise] = useState<{ resolve: (value: boolean) => void } | null>(null);

    const confirm = () => new Promise((resolve,reject) => {
        setPromise({ resolve })
    })

    const handlClose = () => {
        setPromise(null);
    }

    const handleCancel = () => {
        promise?.resolve(false);
        handlClose();
    }

    const handleConfirm = () => {
        promise?.resolve(true);
        handlClose();
    }

    const ConfirmDialog = () => (
        <Dialog open={promise !== null}>
            <DialogContent>
                <DialogHeader>
                    <DialogTitle>
                        {title}
                    </DialogTitle>
                    <DialogDescription>
                        {message}
                    </DialogDescription>
                </DialogHeader>
                <DialogFooter className="pt-2">
                    <Button onClick={handleCancel} variant={"outline"}>
                        Cancel
                    </Button>
                    <Button onClick={handleConfirm}>
                        Confirm
                    </Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>
    )

    return [ConfirmDialog,confirm]
}