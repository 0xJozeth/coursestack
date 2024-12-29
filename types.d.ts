declare module "cmdk" {
  import * as React from "react";

  interface CommandProps extends React.HTMLAttributes<HTMLElement> {}

  export const Command: React.ForwardRefExoticComponent<
    React.RefAttributes<HTMLElement> & CommandProps
  > & {
    Input: React.ForwardRefExoticComponent<
      React.RefAttributes<HTMLElement> & React.HTMLAttributes<HTMLElement>
    >;
    List: React.ForwardRefExoticComponent<
      React.RefAttributes<HTMLElement> & React.HTMLAttributes<HTMLElement>
    >;
    Empty: React.ForwardRefExoticComponent<
      React.RefAttributes<HTMLElement> & React.HTMLAttributes<HTMLElement>
    >;
    Group: React.ForwardRefExoticComponent<
      React.RefAttributes<HTMLElement> & React.HTMLAttributes<HTMLElement>
    >;
    Item: React.ForwardRefExoticComponent<
      React.RefAttributes<HTMLElement> & React.HTMLAttributes<HTMLElement>
    >;
    Separator: React.ForwardRefExoticComponent<
      React.RefAttributes<HTMLElement> & React.HTMLAttributes<HTMLElement>
    >;
  };
}
