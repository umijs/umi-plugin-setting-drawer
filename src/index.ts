import type { IApi } from '@umijs/types';
import { join } from 'path';
import getLayoutContent from './getLayoutContent';
import winPath from './utils/winPath';
import { existsSync, readFileSync, writeFileSync } from 'fs';

const DIR_NAME = 'plugin-setting-drawer';

const layoutTsx = `// @ts-nocheck
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

export default BasicLayout;`;

export default (api: IApi) => {
  api.onGenerateFiles(() => {
    const layoutPath = join(DIR_NAME, 'SettingDrawer.tsx');
    const defaultSettingPath = join(
      api.paths.cwd || '',
      'config',
      'defaultSettings',
    );
    // 如果defaultSettings.ts存在，读取一下作为默认值
    if (
      existsSync(`${defaultSettingPath}.js`) ||
      existsSync(`${defaultSettingPath}.ts`)
    ) {
      try {
        writeFileSync(join(__dirname, '../src/layout/index.tsx'), layoutTsx);
      } catch (error) {
        console.log(error);
      }
    }

    api.writeTmpFile({
      // compiled path: lib/index.js
      path: join(DIR_NAME, 'layout.tsx'),
      content: readFileSync(
        join(__dirname, '../src/layout/index.tsx'),
        'utf-8',
      ),
    });

    api.writeTmpFile({
      path: layoutPath,
      content: getLayoutContent('./layout.tsx'),
    });
  });
  api.modifyRoutes(routes => {
    return [
      {
        path: '/',
        component: utils.winPath(
          join(api.paths.absTmpPath || '', DIR_NAME, 'SettingDrawer.tsx'),
        ),
        routes,
      },
    ];
  });
};
