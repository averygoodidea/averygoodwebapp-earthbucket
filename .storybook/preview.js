import { action } from "@storybook/addon-actions"
import { addDecorator } from '@storybook/react'; // <- or your view layer
import { withInfo } from '@storybook/addon-info';
import { withTests } from '@storybook/addon-jest';

import results from '../.jest-test-results.json';
import "../src/assets/sass/font-icons.scss";
import "../src/components/organisms/layout/layout.scss";

addDecorator(withInfo); 
addDecorator(
  withTests({
    results,
  })
);

// Gatsby's Link overrides:
// Gatsby Link calls the `enqueue` & `hovering` methods on the global variable ___loader.
// This global object isn't set in storybook context, requiring you to override it to empty functions (no-op),
// so Gatsby Link doesn't throw any errors.
global.___loader = {
  enqueue: () => {},
  hovering: () => {},
}

// __PATH_PREFIX__ is used inside gatsby-link an other various places. For storybook not to crash, you need to set it as well.
global.__PATH_PREFIX__ = ""
// same issue with __BASE_PATH__
global.__BASE_PATH__ = '';

// Navigating through a gatsby app using gatsby-link or any other gatsby component will use the `___navigate` method.
// In Storybook it makes more sense to log an action than doing an actual navigate. Checkout the actions addon docs for more info: https://github.com/storybookjs/storybook/tree/master/addons/actions.

window.___navigate = pathname => {
  action("NavigateTo:")(pathname)
}