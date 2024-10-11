import { Dialog, DialogPanel, DialogTitle } from "@headlessui/react";

import type { ReactNode } from "react";

interface IProps {
  isOpen: boolean;
  title?: string;
  setOpenAndClose: () => void;
  children: ReactNode;
}

function Modal({ isOpen, setOpenAndClose, title, children }: IProps) {
  return (
    <>
      <Dialog
        open={isOpen}
        as="div"
        className="relative z-10 focus:outline-none space-y-2 shadow-lg "
        onClose={setOpenAndClose}
        __demoMode>
        <div className="fixed inset-0 z-10 w-screen overflow-y-auto backdrop-blur-sm duration-300 ease-out">
          <div className="flex min-h-full items-center justify-center p-4">
            <DialogPanel
              transition
              className="w-full max-w-md rounded-xl bg-white shadow-2xl p-6  duration-300 ease-out data-[closed]:transform-[scale(95%)] data-[closed]:opacity-0">
              <DialogTitle
                as="h3"
                className="font-bold mb-3 text-xl text-blue-700 selection:bg-blue-500 selection:text-white">
                {title?.length ? `${title}` : "Modal"}
              </DialogTitle>
              <div className="">{children}</div>
            </DialogPanel>
          </div>
        </div>
      </Dialog>
    </>
  );
}

export default Modal;
