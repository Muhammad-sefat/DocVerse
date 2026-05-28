"use client";

import { Toaster as SonnerToaster } from "sonner";

type ToasterProps = React.ComponentProps<typeof SonnerToaster>;

function Toaster({ ...props }: ToasterProps) {
  return (
    <SonnerToaster
      className="toaster group"
      position="top-right"
      toastOptions={{
        classNames: {
          toast:
            "group toast group-[.toaster]:bg-white group-[.toaster]:text-secondary-900 group-[.toaster]:border group-[.toaster]:border-secondary-200 group-[.toaster]:shadow-lg",
          description: "group-[.toast]:text-secondary-500",
          actionButton:
            "group-[.toast]:bg-primary-700 group-[.toast]:text-white",
          cancelButton:
            "group-[.toast]:bg-secondary-100 group-[.toast]:text-secondary-700",
        },
      }}
      {...props}
    />
  );
}

export { Toaster };
