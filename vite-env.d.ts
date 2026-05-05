/// <reference types="vite/client" />

declare module "*.svg?react" {
  import React from "react";
  const ReactComponent: React.FC<
    React.SVGProps<SVGSVGElement> & { title?: string }
  >;
  export default ReactComponent;
}
