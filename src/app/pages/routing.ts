import { Routes } from '@angular/router';

const Routing: Routes = [
  {
    path: 'board',
    loadChildren: () => import('./board/board.module').then((m) => m.BoardModule),
  },
  {
    path: 'workspaces',
    loadChildren: () => import('./workspace/workspace.module').then((m) => m.WorkspaceModule),
  },
  {
    path: 'notifications',
    loadChildren: () => import('./notification/notification.module').then((m) => m.NotificationModule),
  },
  {
    path: 'profile',
    loadChildren: () => import('./profile/profile.module').then((m) => m.ProfileModule),
  },
];

export { Routing };
