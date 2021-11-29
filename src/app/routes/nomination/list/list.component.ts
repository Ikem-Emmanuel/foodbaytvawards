import { ShortlistingComponent } from './../../admin/shortlisting/shortlisting.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { DateFormatService, NotificationService } from '@core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { BizService } from 'src/app/core/services/business/biz.service';
import { NominationService } from 'src/app/core/services/nomination/nomination.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styles: [],
})
export class ListComponent implements OnInit {
  isVisible = false;
  loading = false;
  btneditloading = false;
  businessSelection: any[] = [];
  nominatedBusiness: any[] = [];
  bizAwards: any[] = [];
  error = '';
  expandSet = new Set<number>();

  checked = false;
  indeterminate = false;
  listOfCurrentPageData: any[] = [];
  listOfData: any[] = [];
  setOfCheckedId = new Set<number>();
  isAddorEdit: boolean = false;

  isImportVisible = false;

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
  status: any;
  records: any[] = [];
  ops: string = 'select';
  batchData: any[] = [];
  products: any[] = [];
  nominations: any[] = [];
  lotURL: string = '';

  constructor(
    private modalSrv: NzModalService,
    private bizSrv: BizService,
    private notify: NotificationService,
    private nominationService: NominationService,
    private dateFormat: DateFormatService,
  ) {}

  ngOnInit(): void {
    this.loading = true;
    this.loadNominations();
  }

  //TABLE DEFAULT FUNCTIONS
  updateCheckedSet(id: number, checked: boolean): void {
    if (checked) {
      this.setOfCheckedId.add(id);
    } else {
      this.setOfCheckedId.delete(id);
    }
  }

  onExpandChange(id: number, checked: boolean): void {
    if (checked) {
      this.getbusinessIntems(id);
      this.expandSet.add(id);
    } else {
      this.expandSet.delete(id);
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
    this.isImportVisible = false;
  }

  shortlistBusiness(id: any): void {
    this.loading = true;
    let body = {
      email: id,
    };
    this.bizSrv
      .shortlist(body)
      .then((res) => {
        if (res.status == 'FAILED') {
          this.loading = false;
          this.notify.error('', res.message);
          return;
        }
        this.notify.success('', res.message);
        this.loadNominations();
        this.loading = false;
      })
      .catch((err) => {
        this.loading = false;
        this.notify.error('', err);
      });
  }

  getbusinessIntems(id: number) {
    this.loading = true;
    let url = id;
    this.bizSrv
      .awardlist(url)
      .then((res) => {
        if (res.status == 'FAILED') {
          this.loading = false;
          this.error = res.error;
        }
        this.bizAwards = res.data;
        this.loading = false;
      })
      .catch((err) => {
        this.loading = false;
        this.notify.error('', err);
      });
  }

  loadNominations() {
    this.loading = true;
    this.lotURL = '';

    this.nominationService
      .list()
      .then((res) => {
        if (res.status == 'FAILED') {
          this.loading = false;
          this.notify.error('', res.error);
          return;
        }
        const businessData = res.data;
        let nominated = businessData.filter((item: any) => item.shortlisted == '0');
        this.nominatedBusiness = nominated;
        this.loading = false;
      })
      .catch((err) => {
        this.loading = false;
        this.notify.error('', err);
      });
  }

  // add(): void {
  //   this.isAddorEdit = false;
  //   this.q = {
  //     lot_id: '',
  //     product_id: '',
  //     manufactured_date: '',
  //     expiry_date: '',
  //     from: 0,
  //     to: 0,
  //     size: 0,
  //   };
  //   this.loadBatch();
  //   this.isVisible = true;
  // }
  // addBatch(): void {
  //   if (
  //     !this.q.lot_id ||
  //     !this.q.product_id ||
  //     !this.q.manufactured_date ||
  //     !this.q.expiry_date ||
  //     !this.q.from ||
  //     !this.q.to ||
  //     !this.q.size
  //   ) {
  //     this.notify.error('', 'Input All Fields');
  //     return;
  //   }
  //   this.loading = true;
  //   this.batchSrv
  //     .createBatch(this.q)
  //     .then((res) => {
  //       if (res.status == 'FAILED') {
  //         this.notify.error('', res.message);
  //         this.loading = false;
  //         this.isVisible = true;
  //         return;
  //       }
  //       this.notify.success('', res.message);
  //       this.loading = false;
  //       this.loadBatch();

  //       // this.handleModalCancel();
  //       this.isVisible = false;
  //       this.setOfCheckedId = new Set<number>();
  //     })
  //     .catch((err) => {
  //       this.loading = false;
  //       this.notify.error('', err);
  //       this.isVisible = true;
  //     });
  // }

  // batchPromo() {
  //   let arr = Array.from(this.setOfCheckedId);
  //   if (arr.length > 1) {
  //     this.notify.info('', 'You can only select one promo to edit');
  //     return;
  //   }
  //   if (arr.length == 0) {
  //     this.notify.info('', 'Select one promo to edit');
  //     return;
  //   }
  //   this.isPromovisible = true;
  // }
  // addbatchPromo() {
  //   let arr = Array.from(this.setOfCheckedId);
  //   if (!this.promo.size || !this.promo.promo_id) {
  //     this.notify.error('', 'Input All Fields');
  //     return;
  //   }
  //   const body = { promo_type_id: this.promo.promo_id, size: this.promo.size };
  //   this.btnbatchPromoloading = true;
  //   this.batchSrv
  //     .batchPromo(body, String(arr[0]))
  //     .then((res) => {
  //       if (res.error) {
  //         this.notify.error('', res.error);
  //         this.btnbatchPromoloading = false;
  //         return;
  //       }
  //       this.notify.success('', res.message);
  //       this.btnbatchPromoloading = false;
  //       this.loadBatch();
  //       this.isPromovisible = false;
  //       this.promo = {
  //         size: 0,
  //         promo_id: '',
  //       };
  //     })
  //     .catch((err) => {
  //       this.btnbatchPromoloading = false;
  //       this.notify.error('', err);
  //     });
  // }

  // // EDIT promo
  // editBatch() {
  //   let arr = Array.from(this.setOfCheckedId);
  //   if (arr.length > 1) {
  //     this.notify.info('', 'You can only select one promo to edit');
  //     return;
  //   }
  //   if (arr.length == 0) {
  //     this.notify.info('', 'Select one promo to edit');
  //     return;
  //   }
  //   this.btneditloading = true;
  //   this.batchSrv
  //     .showBatch(String(arr[0]))
  //     .then((res) => {
  //       if (res.error) {
  //         this.notify.error('', res.error);
  //         this.btneditloading = false;
  //         return;
  //       }
  //       this.isAddorEdit = true;
  //       this.isVisible = true;
  //       this.batchData = res.data;
  //     })
  //     .catch((err) => {
  //       this.btneditloading = false;
  //       this.notify.error('', err);
  //     });
  // }

  // // UPDATE promo
  // updatePromo(): void {
  //   if (!this.q.product_id || !this.q.manufactured_date || !this.q.expiry_date || !this.q.from || !this.q.to) {
  //     this.notify.error('', 'Input All Fields');
  //     return;
  //   }
  //   this.loading = true;
  //   const arr = Array.from(this.setOfCheckedId);
  //   this.batchSrv
  //     .updatePromo(this.q, String(arr[0]))
  //     .then((res) => {
  //       if (res.error) {
  //         this.notify.error('', res.error);
  //         this.loading = false;
  //         return;
  //       }
  //       this.loading = false;
  //       this.notify.success('', res.message);
  //       this.handleModalCancel();
  //       this.loadBatch();
  //       this.setOfCheckedId = new Set<number>();
  //     })
  //     .catch((err) => {
  //       this.loading = false;
  //       this.notify.error('', err);
  //     });
  // }

  // // DELETE PRODUCT
  // deleteBatch() {
  //   let arr = Array.from(this.setOfCheckedId);
  //   if (arr.length == 0) {
  //     this.notify.info('', 'Select at least one device to Delete');
  //     return;
  //   }
  //   arr.forEach((e) => {
  //     this.deleteMethod(String(e));
  //   });
  // }

  // deleteMethod(id: string) {
  //   this.loading = true;
  //   this.batchSrv
  //     .deleteBatch(id)
  //     .then((res) => {
  //       if (res.error) {
  //         this.notify.error('', res.error);
  //         return;
  //       }
  //       this.notify.success('', res.message);
  //       this.loadBatch();
  //       this.loading = false;
  //       this.setOfCheckedId = new Set<number>();
  //     })
  //     .catch((err) => {
  //       this.notify.error('', err);
  //     });
  // }
}
