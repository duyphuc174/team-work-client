import { Routes } from '@angular/router';

const Routing: Routes = [
  {
    path: 'board',
    loadChildren: () => import('./board/board.module').then((m) => m.BoardModule),
  },
  {
    path: 'workspace',
    loadChildren: () => import('./workspace/workspace.module').then((m) => m.WorkspaceModule),
  },
  {
    path: 'notifications',
    loadChildren: () => import('./notification/notification.module').then((m) => m.NotificationModule),
  },
];

export { Routing };
