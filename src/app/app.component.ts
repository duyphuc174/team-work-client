import { Component, OnInit } from '@angular/core';
import { initFlowbite } from 'flowbite';
import { CommonService } from './modules/partials/_services/common.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'team-work-client';

  constructor(private commonService: CommonService) {}

  ngOnInit(): void {
    this.loadData();
    initFlowbite();
  }

  loadData() {
    this.commonService.getImportants().subscribe((res) => {});
  }
}
