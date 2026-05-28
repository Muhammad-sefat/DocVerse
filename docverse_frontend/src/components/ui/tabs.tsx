"use client";

import * as React from "react";
import { cn } from "@/lib/utils";

interface TabsProps {
  defaultValue: string;
  value?: string;
  onValueChange?: (value: string) => void;
  children: React.ReactNode;
  className?: string;
}

interface TabsListProps {
  children: React.ReactNode;
  className?: string;
}

interface TabsTriggerProps {
  value: string;
  children: React.ReactNode;
  className?: string;
}

interface TabsContentProps {
  value: string;
  children: React.ReactNode;
  className?: string;
}

const TabsContext = React.createContext<{
  value: string;
  onValueChange: (value: string) => void;
} | null>(null);

function Tabs({ defaultValue, value, onValueChange, children, className }: TabsProps) {
  const [tabValue, setTabValue] = React.useState(defaultValue);
  const currentValue = value ?? tabValue;
  
  return (
    <TabsContext.Provider
      value={{
        value: currentValue,
        onValueChange: (v) => {
          setTabValue(v);
          onValueChange?.(v);
        },
      }}
    >
      <div className={cn("", className)}>{children}</div>
    </TabsContext.Provider>
  );
}

function TabsList({ children, className }: TabsListProps) {
  return (
    <div
      className={cn(
        "inline-flex h-10 items-center justify-center rounded-lg bg-secondary-100 p-1",
        className
      )}
    >
      {children}
    </div>
  );
}

function TabsTrigger({ value, children, className }: TabsTriggerProps) {
  const context = React.useContext(TabsContext);
  if (!context) throw new Error("TabsTrigger must be used within Tabs");

  const isActive = context.value === value;

  return (
    <button
      onClick={() => context.onValueChange(value)}
      className={cn(
        "inline-flex items-center justify-center whitespace-nowrap rounded-md px-3 py-1.5 text-sm font-medium transition-all",
        isActive
          ? "bg-white text-secondary-900 shadow-sm"
          : "text-secondary-500 hover:text-secondary-700",
        className
      )}
    >
      {children}
    </button>
  );
}

function TabsContent({ value, children, className }: TabsContentProps) {
  const context = React.useContext(TabsContext);
  if (!context) throw new Error("TabsContent must be used within Tabs");

  if (context.value !== value) return null;

  return <div className={cn("mt-4", className)}>{children}</div>;
}

export { Tabs, TabsList, TabsTrigger, TabsContent };
