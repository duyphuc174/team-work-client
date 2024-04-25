import { Component, OnInit } from '@angular/core';
import { initFlowbite } from 'flowbite';
import { AuthService } from './modules/auth/_services/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'team-work-client';

  constructor() {
    // this.authService.getUserByToken().subscribe((res) => {
    //   console.log(res);
    // });
  }

  ngOnInit(): void {
    initFlowbite();
  }
}
