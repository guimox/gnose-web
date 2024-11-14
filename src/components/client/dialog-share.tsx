'use client';
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';
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
      </DialogContent>
    </Dialog>
  );
};

export default DialogShare;
