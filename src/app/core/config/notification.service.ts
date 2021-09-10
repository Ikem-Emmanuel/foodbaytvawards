import { Injectable } from '@angular/core';
import { NzNotificationPlacement, NzNotificationService } from 'ng-zorro-antd/notification';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

  constructor(private notifyService: NzNotificationService) { }

  error(title: string, content: string): void{
      this.notifyService.error(title, content, { nzPlacement: 'topRight' })
  }

  success(title: string, content: string): void{
    this.notifyService.success(title, content, { nzPlacement: 'topRight' })
  }

  info(title: string, content: string): void{
    this.notifyService.info(title, content, { nzPlacement: 'topRight' })
  }
  
}
