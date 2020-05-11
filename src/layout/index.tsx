import React from 'react';
// @ts-ignore
import { useModel } from 'umi';
import { SettingDrawer } from '@ant-design/pro-layout';

const BasicLayout = (props: any) => {
  const { children } = props;
  const initialInfo = useModel ? useModel('@@initialState') : undefined;
  if (initialInfo) {
    return children;
  }
  const { initialState, setInitialState } = initialInfo;
  return (
    <>
      {children}
      <SettingDrawer
        {...initialState?.settingDrawer}
        settings={initialState?.settings}
        onSettingChange={settings => {
          setInitialState({ ...initialState, settings });
        }}
      />
    </>
  );
};

export default BasicLayout;
