declare module "cmdk" {
  import * as React from "react";
  export const Command: React.ForwardRefExoticComponent<
    React.RefAttributes<HTMLElement> & { children?: React.ReactNode }
  >;
  export const CommandGroup: React.ForwardRefExoticComponent<
    React.RefAttributes<HTMLElement> & { children?: React.ReactNode }
  >;
  export const CommandItem: React.ForwardRefExoticComponent<
    React.RefAttributes<HTMLElement> & { children?: React.ReactNode }
  >;
  export const CommandEmpty: React.ForwardRefExoticComponent<
    React.RefAttributes<HTMLElement> & { children?: React.ReactNode }
  >;
}
