import React from "react";

export default function Slot<T>({ children, ...props }: React.HTMLAttributes<T>) {
  return React.cloneElement(children as React.ReactElement, props)
}
