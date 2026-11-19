"use client";
import { cn } from "@/lib/utils";
import React, {
  useState,
  createContext,
  useContext,
  MouseEventHandler,
} from "react";
import { IconMenu2, IconX } from "@tabler/icons-react";
import { usePathname } from "next/navigation";

interface Links {
  label: string;
  href: string;
  icon: React.JSX.Element | React.ReactNode;
  onClick?: MouseEventHandler<HTMLAnchorElement>;
}

interface SidebarContextProps {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  animate: boolean;
}

const SidebarContext = createContext<SidebarContextProps | undefined>(
  undefined,
);

export const useSidebar = () => {
  const context = useContext(SidebarContext);
  if (!context) {
    throw new Error("useSidebar must be used within a SidebarProvider");
  }
  return context;
};

export const SidebarProvider = ({
  children,
  open: openProp,
  setOpen: setOpenProp,
  animate = true,
}: {
  children: React.ReactNode;
  open?: boolean;
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  animate?: boolean;
}) => {
  const [openState, setOpenState] = useState(false);

  const open = openProp !== undefined ? openProp : openState;
  const setOpen = setOpenProp !== undefined ? setOpenProp : setOpenState;

  return (
    <SidebarContext.Provider value={{ open, setOpen, animate: animate }}>
      {children}
    </SidebarContext.Provider>
  );
};

export const Sidebar = ({
  children,
  open,
  setOpen,
  animate,
}: {
  children: React.ReactNode;
  open?: boolean;
  setOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  animate?: boolean;
}) => {
  return (
    <SidebarProvider open={open} setOpen={setOpen} animate={animate}>
      {children}
    </SidebarProvider>
  );
};

export const SidebarBody = (props: React.ComponentProps<"div">) => {
  return (
    <>
      <DesktopSidebar {...props} />
      <MobileSidebar {...props} />
    </>
  );
};

export const DesktopSidebar = ({
  className,
  children,
  ...props
}: React.ComponentProps<"div">) => {
  const { open, setOpen, animate } = useSidebar();
  return (
    <div
      className={cn(
        "h-full px-4 py-4 hidden md:flex border-r-2 border-r-teal-700 md:flex-col bg-navy-900 shrink-0 transition-[width] duration-300 ease-in-out",
        className,
      )}
      style={{ width: animate ? (open ? "300px" : "60px") : "300px" }}
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      {...props}
    >
      {children}
    </div>
  );
};

export const MobileSidebar = ({
  className,
  children,
  ...props
}: React.ComponentProps<"div">) => {
  const { open, setOpen } = useSidebar();
  return (
    <div
      className="h-10 z-1000 px-4 py-4 flex flex-row md:hidden items-center justify-between bg-navy-900 w-full"
      {...props}
    >
      <div className="flex justify-end z-20 w-full">
        <button
          type="button"
          className="text-teal-300"
          aria-label="Open navigation"
          onClick={() => setOpen(!open)}
        >
          <IconMenu2 />
        </button>
      </div>
      {open && (
        <div
          className={cn(
            "fixed h-full w-full inset-0 bg-navy-900 p-10 z-100 flex flex-col justify-between",
            className,
          )}
        >
          <button
            type="button"
            className="absolute right-10 top-10 z-50 text-teal-300"
            aria-label="Close navigation"
            onClick={() => setOpen(false)}
          >
            <IconX />
          </button>
          {children}
        </div>
      )}
    </div>
  );
};

export const SidebarLink = ({
  link,
  className,
  onClick,
  ...props
}: {
  link: Links;
  className?: string;
  onClick?: MouseEventHandler<HTMLAnchorElement>;
}) => {
  const { open, animate } = useSidebar();
  const path = usePathname();

  const handleClick: MouseEventHandler<HTMLAnchorElement> = (event) => {
    link.onClick?.(event);
    onClick?.(event);
  };

  return (
    <a
      onClick={handleClick}
      href={link.href}
      className={cn(
        `w-full flex items-center justify-start gap-2 group/sidebar py-2 ${open ? "px-1" : "px-0.5"} hover:bg-teal-200/20 ${path.includes(link.href) || path.split("/").at(-2) == link.href.split("/").at(-1) ? "bg-teal-200/20" : ""} rounded-full`,
        className,
      )}
      {...props}
    >
      {link.icon}

      {(!animate || open) && (
        <span className="text-teal-300 text-sm group-hover/sidebar:translate-x-1 transition duration-150 whitespace-pre p-0! m-0!">
          {link.label}
        </span>
      )}
    </a>
  );
};
