'use client';

import { useModal } from '@/context/ModalContext';
import { FormQuote } from './form-quote';

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from '@/components/ui/dialog';

import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
} from '@/components/ui/drawer';

import { useMediaQuery } from '@/hooks/user-media-query';

const ResponsiveDialogShare = () => {
  const { isOpen, closeModal } = useModal();
  const isDesktop = useMediaQuery('(min-width: 768px)');

  if (isDesktop) {
    return (
      <Dialog open={isOpen} onOpenChange={(open) => !open && closeModal()}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Share your quote to the world</DialogTitle>
          </DialogHeader>
          <DialogDescription>
            <FormQuote />
          </DialogDescription>
        </DialogContent>
      </Dialog>
    );
  }

  return (
    <Drawer
      open={isOpen}
      onOpenChange={(open: boolean) => !open && closeModal()}
    >
      <DrawerContent className="py-10">
        <DrawerHeader className="text-left">
          <DrawerTitle>Share your quote to the world</DrawerTitle>
        </DrawerHeader>
        <div className="px-4">
          <FormQuote />
        </div>
      </DrawerContent>
    </Drawer>
  );
};

export default ResponsiveDialogShare;
