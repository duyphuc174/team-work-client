import { Component, OnChanges, OnInit, SimpleChanges, ViewChild } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { NgbDropdown } from '@ng-bootstrap/ng-bootstrap';
import { Dropdown, Collapse, initMDB } from 'mdb-ui-kit';
import { BsModalService } from 'ngx-bootstrap/modal';
import { BehaviorSubject, filter } from 'rxjs';
import { WorkspaceModel } from 'src/app/pages/workspace/_models/workspace.model';
import { MemberService } from 'src/app/pages/workspace/_services/member.service';
import { WorkspaceService } from 'src/app/pages/workspace/_services/workspace.service';
import { WorkspaceCreateComponent } from 'src/app/pages/workspace/components/workspaces/workspace-create/workspace-create.component';

const LOCALSTORAGE_HISTORY_WORKSPACE_IDS = 'history-workspace-ids';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss'],
})
export class HeaderComponent implements OnInit, OnChanges {
  @ViewChild(NgbDropdown) dropdown!: NgbDropdown;
  historyWorkspaceIds: number[];
  workspacesSubject = new BehaviorSubject<WorkspaceModel[]>([]);
  workspaces$ = this.workspacesSubject.asObservable();
  likeWorkspacesSubject = new BehaviorSubject<WorkspaceModel[]>([]);
  likeWorkspaces$ = this.likeWorkspacesSubject.asObservable();
  constructor(
    private router: Router,
    private bsModalService: BsModalService,
    private memberService: MemberService,
    private workspaceService: WorkspaceService,
  ) {
    // const url = this.router.url;
    // console.log(url);

    // const urlSegments = url.split('/');
    // const workspaceIndex = urlSegments.indexOf('workspaces');
    // let id;
    // if (workspaceIndex !== -1 && urlSegments.length > workspaceIndex + 1) {
    //   id = +urlSegments[workspaceIndex + 1];
    // }
    // if (url.includes(`workspaces/${id}`)) {
    //   console.log(id);
    // }
    this.router.events.pipe(filter((event) => event instanceof NavigationEnd)).subscribe((event: NavigationEnd) => {
      const url = event.urlAfterRedirects;
      if (url.includes(`workspaces`)) {
        const urlSegments = url.split('/');
        const workspaceIndex = urlSegments.indexOf('workspaces');
        let id;
        if (workspaceIndex !== -1 && urlSegments.length > workspaceIndex + 1) {
          id = +urlSegments[workspaceIndex + 1];
        }
        if (url.includes(`workspaces/${id}`)) {
          this.markAccessWorkspace(id);
        }
      }
    });
  }

  ngOnInit(): void {
    initMDB({ Dropdown, Collapse });
    this.loadData();
  }

  goToWorkspace(id: number) {
    this.router.navigate([`/workspaces/${id}`]);
    this.dropdown.close();
  }

  loadData() {
    this.workspaceService.getWorkspaces().subscribe((res: WorkspaceModel[]) => {
      const workspaces = res;
      const listWorkspace = workspaces
        .filter((w) => w.myInfo?.accessTime)
        .sort((a, b) => b.myInfo.accessTime.getTime() - a.myInfo.accessTime.getTime());
      this.workspacesSubject.next(listWorkspace);
      const likeWorkspaces = res.filter((w) => w.myInfo?.like);
      this.likeWorkspacesSubject.next(likeWorkspaces);
    });
  }

  markAccessWorkspace(id: number) {
    this.memberService.updateWorkspaceAccess(id, { accessTime: new Date() }).subscribe((res) => {
      if (res.success) {
        this.loadData();
      }
    });
  }

  likeWorkspace(workspace: WorkspaceModel) {
    this.memberService.updateWorkspaceAccess(workspace.id, { like: !workspace.myInfo.like }).subscribe((res) => {
      if (res.success) {
        this.loadData();
      }
    });
  }

  openWorkspaceCreateModal() {
    let initialState = {};
    const bsModalRef = this.bsModalService.show(WorkspaceCreateComponent, { initialState });
    bsModalRef.content.onClose$.subscribe((res) => {
      if (res) {
        this.router.navigate([`/workspaces/${res.id}`]);
      }
    });
  }

  ngOnChanges(changes: SimpleChanges): void {}
}
