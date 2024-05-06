import { Component, OnInit } from '@angular/core';
import { CommonService } from './modules/partials/_services/common.service';
import { NgSelectConfig } from '@ng-select/ng-select';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'team-work-client';

  constructor(private commonService: CommonService, private config: NgSelectConfig) {
    this.config.notFoundText = 'Custom not found';
    this.config.appendTo = 'body';
    // set the bindValue to global config when you use the same
    // bindValue in most of the place.
    // You can also override bindValue for the specified template
    // by defining `bindValue` as property
    // Eg : <ng-select bindValue="some-new-value"></ng-select>
    this.config.bindValue = 'value';
  }

  ngOnInit(): void {
    this.loadData();
  }

  loadData() {
    this.commonService.getImportants().subscribe((res) => {});
  }
}
