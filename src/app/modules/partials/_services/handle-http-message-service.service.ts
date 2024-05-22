import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class HandleHttpMessageServiceService {
  constructor(public toastService: ToastrService) {}

  showSuccess(message: string, title?: string) {
    message = message || 'Thao tác thành công!';
    this.toastService.success(message, title, { timeOut: 2000 });
  }

  showError(message: string, title?: string) {
    message = message || 'Thao tác thất bại!';
    this.toastService.error(message, title), { timeOut: 2000 };
  }
}
