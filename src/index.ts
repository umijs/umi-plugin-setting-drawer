import { IApi, utils } from 'umi';
import { join } from 'path';
import getLayoutContent from './getLayoutContent';

const DIR_NAME = 'plugin-setting-drawer';

export default (api: IApi) => {
  api.onGenerateFiles(() => {
    api.writeTmpFile({
      path: join(DIR_NAME, 'SettingDrawer.tsx'),
      content: getLayoutContent(
        utils.winPath(join(__dirname, './layout/index.js')),
      ),
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
