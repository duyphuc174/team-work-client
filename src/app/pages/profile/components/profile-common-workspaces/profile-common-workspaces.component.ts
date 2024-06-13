import { Component, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { WorkspaceModel } from 'src/app/pages/workspace/_models/workspace.model';
import { Tab, initMDB } from 'mdb-ui-kit';

@Component({
  selector: 'app-profile-common-workspaces',
  templateUrl: './profile-common-workspaces.component.html',
  styleUrls: ['./profile-common-workspaces.component.scss'],
})
export class ProfileCommonWorkspacesComponent implements OnInit {
  @Input() workspaces: WorkspaceModel[] = [];

  constructor(private router: Router) {}

  goToWorkspace(workspaceId: number) {
    this.router.navigate([`/workspaces/${workspaceId}`]);
  }

  ngOnInit(): void {
    initMDB({ Tab });
  }
}
