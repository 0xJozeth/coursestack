import { Menu } from "lucide-react";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import Sidebar from "./sidebar";
import { DialogTitle } from "@radix-ui/react-dialog";

export const MobileSidebar = () => {
  return (
    <Sheet>
      <SheetTrigger className="md:hidden pr-4 hover:opacity-75 transition">
        <Menu />
      </SheetTrigger>
      <SheetContent position="left" className="p-0 bg-white">
        <DialogTitle className="hidden">Mobile Sidebar</DialogTitle>
        <Sidebar />
      </SheetContent>
    </Sheet>
  );
};
