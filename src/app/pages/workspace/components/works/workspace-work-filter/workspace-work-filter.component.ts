import { Component, EventEmitter, Output } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';

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

  sortBySelected: any;
  sortTypeSelected: any;
  params: any = {};

  constructor(private router: Router, private activeRoute: ActivatedRoute) {
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
    console.log(this.params);

    this.onFilterChange.emit(this.params);
  }

  clearFilter() {
    this.sortBySelected = null;
    this.sortTypeSelected = null;
    this.params = {};
    this.onFilterChange.emit(this.params);
  }
}
