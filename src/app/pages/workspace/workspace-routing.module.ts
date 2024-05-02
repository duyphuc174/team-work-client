import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { WorkspaceComponent } from './workspace.component';
import { WorkspaceListComponent } from './components/workspace-list/workspace-list.component';
import { WorkspaceMemberListComponent } from './components/workspace-member-list/workspace-member-list.component';
import { WorkspaceWorkListComponent } from './components/workspace-work-list/workspace-work-list.component';

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
            component: WorkspaceWorkListComponent,
          },
          {
            path: 'members',
            component: WorkspaceMemberListComponent,
          },
          {
            path: '',
            redirectTo: 'works',
            pathMatch: 'full',
          }
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
