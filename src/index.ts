import { IApi, utils } from 'umi';
import { join } from 'path';
import getLayoutContent from './getLayoutContent';
import { readFileSync } from 'fs';

const DIR_NAME = 'plugin-setting-drawer';

export default (api: IApi) => {
  api.onGenerateFiles(() => {
    api.writeTmpFile({
      // compiled path: lib/index.js
      path: join(DIR_NAME, 'layout.tsx'),
      content: readFileSync(
        join(__dirname, '../src/layout/index.tsx'),
        'utf-8',
      ),
    });
    api.writeTmpFile({
      path: join(DIR_NAME, 'SettingDrawer.tsx'),
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
