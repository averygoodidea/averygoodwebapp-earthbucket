// jest is not-compatible with react-modal, which also prevents it from displaying in Storybook.
// so just mock it for the jest tests, and don't create story for it.
// https://github.com/storybookjs/storybook/issues/2822#issuecomment-360030765
import React from "react";

export default Object.assign(
  ({ children, ...props }) => (
    <div>
      <code>
        <pre>{JSON.stringify(props, null, 4)}</pre>
      </code>
      {children}
    </div>
  ),
  {
    displayName: "MockReactModal",
    setAppElement: () => {}
  }
);
