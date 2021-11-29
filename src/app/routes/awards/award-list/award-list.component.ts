import { Component, OnInit } from '@angular/core';
import { Validators, AbstractControl, FormGroup, FormBuilder } from '@angular/forms';
import { NotificationService } from '@core';
import { IndexService } from 'src/app/core/services/awards/index.service';
import { UsersService } from 'src/app/core/services/users.service';

@Component({
  selector: 'app-award-list',
  templateUrl: './award-list.component.html',
  styleUrls: ['./award-list.component.less'],
})
export class AwardListComponent implements OnInit {
  loading: boolean = true;
  awards: any[] = [];
  isVisible: boolean = false;

  //PAGINATION
  current_page: number = 0;
  total: number = 0;
  from: number = 0;
  to: number = 0;
  lastpage: number = 0;
  page: any[] = [];
  meta: any;
  nextPage: string = '';
  previousPage: string = '';

  userSelection: any[] = [];
  checked = false;
  indeterminate = false;
  listOfCurrentPageData: any[] = [];
  listOfData: any[] = [];
  setOfCheckedId = new Set<number>();

  constructor(fb: FormBuilder, private notify: NotificationService, private awardSrv: IndexService) {
    {
      this.awardForm = fb.group({
        category: [null, [Validators.required]],
      });
    }
  }

  get category(): AbstractControl {
    return this.awardForm.controls.category;
  }

  awardForm: FormGroup;
  ngOnInit(): void {
    this.loadAwards();
  }

  //TABLE DEFAULT FUNCTIONS
  updateCheckedSet(id: number, checked: boolean): void {
    if (checked) {
      this.setOfCheckedId.add(id);
    } else {
      this.setOfCheckedId.delete(id);
    }
  }

  onItemChecked(id: number, checked: boolean): void {
    this.updateCheckedSet(id, checked);
    this.refreshCheckedStatus();
  }

  onAllChecked(value: boolean): void {
    this.listOfCurrentPageData.forEach((item) => this.updateCheckedSet(item.id, value));
    this.refreshCheckedStatus();
  }

  onCurrentPageDataChange($event: any[]): void {
    this.listOfCurrentPageData = $event;
    this.refreshCheckedStatus();
  }

  refreshCheckedStatus(): void {
    this.checked = this.listOfCurrentPageData.every((item) => this.setOfCheckedId.has(item.id));
    this.indeterminate = this.listOfCurrentPageData.some((item) => this.setOfCheckedId.has(item.id)) && !this.checked;
  }

  handleModalCancel(): void {
    this.isVisible = false;
  }

  addAward() {
    this.isVisible = true;
    this.awardForm.reset();
  }

  loadAwards() {
    this.loading = true;
    this.awardSrv
      .awardData()
      .then((res) => {
        this.awards = res.data;
        this.loading = false;
      })
      .catch((err) => {
        this.loading = false;
        console.log(err);
      });
  }

  next(id: number): void {
    this.loading = true;
    let url = this.meta.path + '?page_size=10&page=' + id;
    this.awardSrv
      .next(url)
      .then((res) => {
        if (res.status == 'FAILED') {
          this.notify.error('', res.error);
          this.loading = false;
          return;
        }
        this.awards = res.data.users;
        this.current_page = res.data.pagination.current_page;
        this.lastpage = res.data.pagination.last_page;
        this.from = res.data.pagination.from;
        this.to = res.data.pagination.to;
        this.total = res.data.pagination.total;
        this.nextPage = res.links.next;
        this.loading = false;
      })
      .catch((err) => {
        this.loading = false;
        this.notify.error('', err);
        console.warn(err);
      });
  }
  createAward(): void {
    this.loading = true;
    this.category.markAsDirty();
    this.category.updateValueAndValidity();

    if (this.category.invalid) {
      this.loading = false;
      return;
    }
    let body = {
      category: this.category.value,
    };
    this.awardSrv
      .create(body)
      .then((res) => {
        if (res.status == 'FAILED') {
          this.notify.error('', res.error);
          this.loading = false;
          return;
        }
        this.notify.success('', res.message);
        this.loadAwards();
        this.loading = false;
        this.isVisible = false;
        this.awardForm.reset();
      })
      .catch((err) => {
        this.loading = false;
        console.warn(err);
      });
  }

  // editAward(): void {
  //   let arr = Array.from(this.setOfCheckedId);
  //   if (arr.length > 1) {
  //     this.notify.info('', 'You can only select one user to edit');
  //     return;
  //   }
  //   if (arr.length == 0) {
  //     this.notify.info('', 'Select one user to edit');
  //     return;
  //   }
  //   this.loading = true;
  //   this.userService
  //     .show(String(arr[0]))
  //     .then((res) => {
  //       this.q = res.data.users;
  //       /* this.q.role = res.data.users; */
  //       console.log(this.q);
  //       this.isAddorEdit = true;
  //       this.isVisible = true;
  //       this.loading = false;
  //     })
  //     .catch((err) => {
  //       this.loading = false;
  //       console.warn(err);
  //     });
  // }
  // updateAward(): void {
  //   this.loading = true;
  //   let arr = Array.from(this.setOfCheckedId);
  //   this.q.role_id = this.q.role;
  //   this.userService
  //     .update(this.q, String(arr[0]))
  //     .then((res) => {
  //       if (res.status == 'FAILED') {
  //         this.notify.error('', res.error);
  //         this.loading = false;
  //         return;
  //       }
  //       this.loadUsers();
  //       this.setOfCheckedId = new Set<number>();
  //       this.notify.success('', res.message);
  //       this.isVisible = false;
  //       this.loading = false;
  //     })
  //     .catch((err) => {
  //       this.loading = false;
  //       console.warn(err);
  //     });
  // }

  // deleteAward(): void {
  //   let arr = Array.from(this.setOfCheckedId);
  //   if (arr.length > 1) {
  //     this.notify.info('', 'You can only select one user to delete');
  //     return;
  //   }
  //   if (arr.length == 0) {
  //     this.notify.info('', 'Select one user to delete');
  //     return;
  //   }
  //   this.loading = true;
  //   this.userService
  //     .delete(String(arr[0]))
  //     .then((res) => {
  //       if (res.status == 'FAILED') {
  //         this.notify.error('', res.error);
  //         this.loading = false;
  //         return;
  //       }
  //       this.notify.success('', res.message);
  //       this.loadUsers();
  //       this.setOfCheckedId = new Set<number>();
  //       this.loading = false;
  //     })
  //     .catch((err) => {
  //       this.loading = false;
  //       console.warn(err);
  //     });
  // }
}
