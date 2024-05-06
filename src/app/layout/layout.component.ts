import { Component, HostBinding, OnInit } from '@angular/core';

@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.scss'],
})
export class LayoutComponent implements OnInit {
  @HostBinding('class') class = 'd-content';
  ngOnInit(): void {}
}
