export default (path: string) => `import React from "react";
export default props => {
  return React.createElement(require("${path}").default, {
    ...props
  });
};
`;
