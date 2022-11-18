/* eslint-disable */
import React from "react";
import { ActivityWizard } from "./ActivityWizard.js";

export default {
  title: "Create Activity/ActivityWizard",
  component: ActivityWizard,
  argTypes: {
    backgroundColor: { control: "color" },
  },
};

const Template = () => <ActivityWizard />;

export const component = Template.bind({});
