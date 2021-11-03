export default (path: string) => `import React from "react";
import BasicLayout from "${path}";
export default props => {
  return React.createElement(BasicLayout, {
    ...props
  });
};
`;
