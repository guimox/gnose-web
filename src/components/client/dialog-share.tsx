// components/DialogShare.js
'use client';

import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
import { Button } from '../ui/button';
import { useModal } from '@/context/ModalContext';
import { FormQuote } from './form-quote';

const DialogShare = () => {
  const { isOpen, closeModal } = useModal();

  return (
    <Dialog open={isOpen} onOpenChange={(open) => !open && closeModal()}>
      <DialogContent className="flex flex-col gap-8">
        <DialogHeader>
          <DialogTitle>Share your quote to the world</DialogTitle>
        </DialogHeader>
        <DialogDescription>
          <FormQuote />
        </DialogDescription>
        <DialogFooter className="space-x-4 sm:justify-end">
          <DialogClose asChild>
            <Button
              type="button"
              variant="secondary"
              className="w-1/3"
              onClick={closeModal}
            >
              Close
            </Button>
          </DialogClose>
          <Button type="submit" form="form-quote" className="w-1/3">
            Share
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default DialogShare;
