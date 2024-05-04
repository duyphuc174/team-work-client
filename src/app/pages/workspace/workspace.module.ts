import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WorkspaceRoutingModule } from './workspace-routing.module';
import { WorkspaceComponent } from './workspace.component';
import { WorkspaceListComponent } from './components/workspace-list/workspace-list.component';
import { WorkspaceCreateComponent } from './components/workspace-create/workspace-create.component';
import { PartialsModule } from 'src/app/modules/partials/partials.module';
import { WorkspaceMemberListComponent } from './components/workspace-member-list/workspace-member-list.component';
import { WorkspaceMemberListItemComponent } from './components/workspace-member-list-item/workspace-member-list-item.component';
import { WorkspaceWorkListComponent } from './components/workspace-work-list/workspace-work-list.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { WorkspaceMemberAddComponent } from './components/workspace-member-add/workspace-member-add.component';
import { WorkspaceSprintComponent } from './components/workspace-sprint/workspace-sprint.component';
import { WorkspaceWorkCreateComponent } from './components/workspace-work-create/workspace-work-create.component';

@NgModule({
  declarations: [
    WorkspaceComponent,
    WorkspaceListComponent,
    WorkspaceCreateComponent,
    WorkspaceMemberListComponent,
    WorkspaceMemberListItemComponent,
    WorkspaceWorkListComponent,
    WorkspaceMemberAddComponent,
    WorkspaceSprintComponent,
    WorkspaceWorkCreateComponent,
  ],
  imports: [CommonModule, FormsModule, ReactiveFormsModule, WorkspaceRoutingModule, PartialsModule, HttpClientModule],
})
export class WorkspaceModule {}
