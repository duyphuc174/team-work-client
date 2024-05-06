import { Component, OnInit } from '@angular/core';
import { WorkspaceService } from '../../_services/workspace.service';
import { ActivatedRoute } from '@angular/router';
import { BehaviorSubject, Observable } from 'rxjs';
import { SprintModel } from '../../_models/workspace.model';

@Component({
  selector: 'app-workspace-work-list',
  templateUrl: './workspace-work-list.component.html',
  styleUrls: ['./workspace-work-list.component.scss'],
})
export class WorkspaceWorkListComponent implements OnInit {
  sprintsSubject: BehaviorSubject<SprintModel[]> = new BehaviorSubject<SprintModel[]>([]);
  sprints$: Observable<SprintModel[]> = this.sprintsSubject.asObservable();

  constructor(private workspaceService: WorkspaceService, private activedRoute: ActivatedRoute) {
    // this.activedRoute.params.subscribe((params: any) => {
    //   const workspaceId = +params.id;
    //   if (workspaceId) {
    //     this.workspaceService.getWorkspaceById(workspaceId).subscribe((workspace) => {
    //       this.loadData();
    //     });
    //   }
    // });
    this.workspaceService.currentWorkspace$.subscribe((workspace) => {
      if (workspace) {
        this.loadData();
      }
    });
  }

  ngOnInit(): void {}

  loadData() {
    this.workspaceService.getSprints().subscribe((sprints) => {
      if (sprints) {
        this.sprintsSubject.next(sprints);
      }
    });
  }
}
