import { Component, EventEmitter, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MemberService } from '../../../_services/member.service';
import { MemberModel } from '../../../_models/workspace.model';
import { WorkspaceService } from '../../../_services/workspace.service';
import { AuthService } from 'src/app/modules/auth/_services/auth.service';
import { UserModel } from 'src/app/modules/auth/_models/user.model';

@Component({
  selector: 'app-workspace-work-filter',
  templateUrl: './workspace-work-filter.component.html',
  styleUrls: ['./workspace-work-filter.component.scss'],
})
export class WorkspaceWorkFilterComponent {
  @Output() onFilterChange: EventEmitter<any> = new EventEmitter();
  listSortBy = [
    {
      value: 'title',
      label: 'Tên công việc',
    },
    {
      value: 'importantId',
      label: 'Độ quan trọng',
    },
    {
      value: 'startDate',
      label: 'Ngày bắt đầu',
    },
    {
      value: 'endDate',
      label: 'Ngày kết thúc',
    },
  ];

  listSortType = [
    {
      value: 'asc',
      label: 'Tăng dần',
    },
    {
      value: 'desc',
      label: 'Giảm dần',
    },
  ];
  members: UserModel[] = [];
  sortBySelected: any;
  sortTypeSelected: any;
  assigneeIdSelected: any;

  params: any = {};

  constructor(
    private router: Router,
    private activeRoute: ActivatedRoute,
    private memberService: MemberService,
    private workspaceService: WorkspaceService,
    private authService: AuthService,
  ) {
    this.memberService
      .getMembersByWorkspaceId(this.workspaceService.currentWorksapceSubject.value.id)
      .subscribe((members) => {
        this.members = members.map((member) => {
          if (member.user.id === this.authService.currentUserValue.id) {
            const u = member.user;
            u.fullName = u.fullName + '(tôi)';
            return u;
          } else {
            const u = member.user;
            u.fullName = u.fullName + '(' + u.email + ')';
            return u;
          }
        });
        this.members.unshift({ id: -1, fullName: 'Mọi người' } as UserModel);
        // Tìm người dùng hiện tại trong danh sách
        const currentUserIndex = this.members.findIndex((user) => user.id === authService.currentUserValue.id);

        // Nếu người dùng hiện tại được tìm thấy, di chuyển nó lên đầu danh sách
        if (currentUserIndex > -1) {
          const [currentUser] = this.members.splice(currentUserIndex, 1);
          this.members.unshift(currentUser);
        }
      });
    this.filterChange();
  }

  filterChange() {
    if (!this.sortBySelected) {
      delete this.params.sortBy;
    } else {
      this.params.sortBy = this.sortBySelected;
    }

    if (!this.sortTypeSelected) {
      delete this.params.sortType;
    } else {
      this.params.sortType = this.sortTypeSelected;
    }

    if (!this.assigneeIdSelected) {
      delete this.params.assigneeId;
    } else {
      this.params.assigneeId = this.assigneeIdSelected;
      delete this.params.isPublic;

      if (this.assigneeIdSelected === -1) {
        delete this.params.assigneeId;
        this.params.isPublic = true;
      }
    }

    this.onFilterChange.emit(this.params);
  }

  clearFilter() {
    this.sortBySelected = null;
    this.sortTypeSelected = null;
    this.params = {};
    this.onFilterChange.emit(this.params);
  }
}
