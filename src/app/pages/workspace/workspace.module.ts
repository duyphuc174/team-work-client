import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { WorkspaceRoutingModule } from './workspace-routing.module';
import { WorkspaceComponent } from './workspace.component';
import { PartialsModule } from 'src/app/modules/partials/partials.module';
import { WorkspaceMemberListComponent } from './components/members/workspace-member-list/workspace-member-list.component';
import { WorkspaceWorkListComponent } from './components/works/workspace-work-list/workspace-work-list.component';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { WorkspaceMemberAddComponent } from './components/members/workspace-member-add/workspace-member-add.component';
import { WorkspaceSprintComponent } from './components/sprints/workspace-sprint/workspace-sprint.component';
import { WorkspaceWorkCreateComponent } from './components/works/workspace-work-create/workspace-work-create.component';
import { BsDatepickerModule } from 'ngx-bootstrap/datepicker';
import { NgSelectModule } from '@ng-select/ng-select';
import { NgOptionHighlightModule } from '@ng-select/ng-option-highlight';
import { TooltipModule } from 'ngx-bootstrap/tooltip';
import { WorkspaceWorkDetailComponent } from './components/works/workspace-work-detail/workspace-work-detail.component';
import { BsDropdownModule } from 'ngx-bootstrap/dropdown';
import { WorkspaceWorkComponent } from './components/works/workspace-work/workspace-work.component';
import { NgbAccordionModule, NgbDropdownModule, NgbOffcanvasModule } from '@ng-bootstrap/ng-bootstrap';
import { WorkspaceSprintCreateComponent } from './components/sprints/workspace-sprint-create/workspace-sprint-create.component';
import { WorkspaceListComponent } from './components/workspaces/workspace-list/workspace-list.component';
import { WorkspaceCreateComponent } from './components/workspaces/workspace-create/workspace-create.component';
import { WorkspaceWorkFilterComponent } from './components/works/workspace-work-filter/workspace-work-filter.component';
import { WorkspaceTaskDetailComponent } from './components/tasks/workspace-task-detail/workspace-task-detail.component';
import { WorkspaceTaskAddComponent } from './components/tasks/workspace-task-add/workspace-task-add.component';
import { WorkspaceTaskListComponent } from './components/tasks/workspace-task-list/workspace-task-list.component';
import { WorkspaceTaskComponent } from './components/tasks/workspace-task/workspace-task.component';
import { WorkspaceNotificationComponent } from './components/notifications/workspace-notification/workspace-notification.component';
import { NotificationModule } from '../notification/notification.module';

@NgModule({
  declarations: [
    WorkspaceComponent,
    WorkspaceListComponent,
    WorkspaceCreateComponent,
    WorkspaceMemberListComponent,
    WorkspaceWorkListComponent,
    WorkspaceMemberAddComponent,
    WorkspaceSprintComponent,
    WorkspaceWorkCreateComponent,
    WorkspaceWorkDetailComponent,
    WorkspaceTaskDetailComponent,
    WorkspaceWorkComponent,
    WorkspaceTaskAddComponent,
    WorkspaceTaskListComponent,
    WorkspaceSprintCreateComponent,
    WorkspaceWorkFilterComponent,
    WorkspaceTaskComponent,
    WorkspaceNotificationComponent,
  ],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    WorkspaceRoutingModule,
    PartialsModule,
    HttpClientModule,
    BsDatepickerModule,
    NgSelectModule,
    NgOptionHighlightModule,
    TooltipModule,
    BsDropdownModule,
    NgbOffcanvasModule,
    NgbAccordionModule,
    NgbDropdownModule,
    NotificationModule,
  ],
})
export class WorkspaceModule {}
