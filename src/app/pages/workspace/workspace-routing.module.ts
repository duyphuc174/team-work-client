import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WorkspaceComponent } from './workspace.component';
import { WorkspaceMemberListComponent } from './components/members/workspace-member-list/workspace-member-list.component';
import { WorkspaceWorkListComponent } from './components/works/workspace-work-list/workspace-work-list.component';
import { WorkspaceWorkDetailComponent } from './components/works/workspace-work-detail/workspace-work-detail.component';
import { WorkspaceWorkComponent } from './components/works/workspace-work/workspace-work.component';
import { WorkspaceListComponent } from './components/workspaces/workspace-list/workspace-list.component';
import { WorkspaceTaskComponent } from './components/tasks/workspace-task/workspace-task.component';
import { WorkspaceNotificationComponent } from './components/notifications/workspace-notification/workspace-notification.component';

const routes: Routes = [
  {
    path: '',
    component: WorkspaceComponent,
    children: [
      {
        path: '',
        redirectTo: 'list',
        pathMatch: 'full',
      },
      {
        path: 'list',
        component: WorkspaceListComponent,
      },

      {
        path: ':id',
        children: [
          {
            path: 'works',
            component: WorkspaceWorkComponent,
            children: [
              {
                path: '',
                component: WorkspaceWorkListComponent,
              },
              {
                path: ':id',
                component: WorkspaceWorkDetailComponent,
              },
            ],
          },
          {
            path: 'members',
            component: WorkspaceMemberListComponent,
          },
          {
            path: 'tasks',
            component: WorkspaceTaskComponent,
          },
          {
            path: 'notifications',
            component: WorkspaceNotificationComponent,
          },
          {
            path: '',
            redirectTo: 'works',
            pathMatch: 'full',
          },
        ],
      },
    ],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class WorkspaceRoutingModule {}
