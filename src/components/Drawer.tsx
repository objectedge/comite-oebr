import cn from "@/cn";
import React from "react";

const openClassNames = {
  right: "translate-x-0",
  left: "translate-x-0",
  top: "translate-y-0",
  bottom: "translate-y-0",
};

const closeClassNames = {
  right: "translate-x-full",
  left: "-translate-x-full",
  top: "-translate-y-full",
  bottom: "translate-y-full",
};

const classNames = {
  right: "inset-y-0 right-0",
  left: "inset-y-0 left-0",
  top: "inset-x-0 top-0",
  bottom: "inset-x-0 bottom-0",
};

type DrawerProps = {
  open: boolean;
  side?: "right" | "left" | "top" | "bottom";
  children: React.ReactNode;
};

const Drawer = ({ open, side = "right", children }: DrawerProps) => {
  return (
    <div
      id={`dialog-${side}`}
      className="relative z-10"
      aria-labelledby="slide-over"
      role="dialog"
      aria-modal="true"
    >
      <div
        className={cn(
          "fixed inset-0 bg-gray-500 bg-opacity-75 transition-all",
          open && "opacity-100 duration-500 ease-in-out visible",
          !open && "opacity-0 duration-500 ease-in-out invisible"
        )}
      ></div>
      <div className={cn(open && "fixed inset-0 overflow-hidden")}>
        <div className="absolute inset-0 overflow-hidden">
          <div
            className={cn(
              "pointer-events-none fixed max-w-full",
              classNames[side]
            )}
          >
            <div
              className={cn(
                "pointer-events-auto relative w-full h-full transform transition ease-in-out duration-500",
                !open && closeClassNames[side],
                open && openClassNames[side]
              )}
            >
              <div
                className={cn(
                  "flex flex-col h-full overflow-y-scroll bg-white p-5 shadow-x"
                )}
              >
                {children}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Drawer;
