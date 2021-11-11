// @ts-nocheck
import React from "react";
// @ts-ignore
import { useModel } from "umi";
import { SettingDrawer } from "@ant-design/pro-layout";
import defaultSettings from "../../../config/defaultSettings";

const BasicLayout = (props: any) => {
  const { children } = props;
  const initialInfo = useModel ? useModel("@@initialState") : undefined;
  if (!initialInfo) {
    return children;
  }
  delete defaultSettings.logo;
  delete defaultSettings.pwa;
  delete defaultSettings.colorWeak;
  delete defaultSettings.iconfontUrl;
  
  const { initialState, setInitialState } = initialInfo;
  const settingsConfig =
    initialState?.settings && Object.keys(initialState?.settings).length > 0
      ? initialState?.settings
      : defaultSettings;
  return (
    <>
      {children}
      <SettingDrawer
        {...initialState?.SettingDrawer}
        settings={settingsConfig}
        onSettingChange={(settings) => {
          setInitialState({ ...initialState, settings });
        }}
      />
    </>
  );
};

export default BasicLayout;