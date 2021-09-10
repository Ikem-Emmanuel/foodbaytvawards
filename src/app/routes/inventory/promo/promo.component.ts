import { Component, OnInit, ViewChild } from '@angular/core';
import { DateFormatService, NotificationService } from '@core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { InventoryService } from 'src/app/core/services/inventroy/inventory.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-promo',
  templateUrl: './promo.component.html',
  styleUrls: ['./promo.component.less'],
})
export class PromoComponent implements OnInit {
  isVisible = false;
  isviewmodalVisible = false;
  loading = false;
  batchSelection: any[] = [];
  promoSelection: any[] = [];
  error = '';
  btnaddloading: boolean = false;
  btneditloading: boolean = false;
  btndeleteloading: boolean = false;
  btnviewloading: boolean = false;
  // deviceStatuses: Device[] = [];

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
  promoData: any[] = [];
  query: {
    promo_id: string;
  } = {
    promo_id: '',
  };
  promo_status = [
    { key: 'INACTIVE', value: false },
    { key: 'ACTIVE', value: true },
  ];
  createpromo: {
    name: string;
    description: string;
    ativeStatus: boolean;
    win_message: string;
  } = {
    name: '',
    description: '',
    ativeStatus: false,
    win_message: '',
  };
  promos = [];
  promoImage: any;
  constructor(
    private modalSrv: NzModalService,
    private notify: NotificationService,
    private batchSrv: InventoryService,
    private dateFormat: DateFormatService,
    private sanitizer: DomSanitizer,
  ) {}

  ngOnInit(): void {
    this.loading = true;
    this.loadPromo();
  }

  // onChangeManufactured(data: any) {
  //   this.q.manufactured_date = this.dateFormat.formatDate(data);
  // }
  // onChangeExpiry(data: any) {
  //   this.q.expiry_date = this.dateFormat.formatDate(data);
  // }

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
    this.isImportVisible = false;
  }
  handleviewModalCancel(): void {
    this.isviewmodalVisible = false;
  }

  // checkPrinted(): void {
  //   this.loadLot();
  // }
  // checkUsed(): void {
  //   this.loadLot();
  // }

  centerDevices(data: any): void {}

  loadPromo() {
    this.loading = true;
    this.batchSrv
      .getPromo()
      .then((res) => {
        if (res.status == 'FAILED') {
          this.loading = false;
          this.error = res.error;
        }
        this.promoData = res.data.data;
        this.loading = false;
      })
      .catch((err) => {
        this.loading = false;
        this.notify.error('', err);
      });
  }

  // CREATE promo
  add(): void {
    this.promoImage = null;
    this.createpromo = {
      name: '',
      description: '',
      ativeStatus: false,
      win_message: '',
    };
    this.isVisible = true;
  }

  addPromo(): void {
    if (!this.createpromo.name || !this.createpromo.description || !this.createpromo.ativeStatus || !this.createpromo.win_message) {
      this.notify.error('', 'Input All Fields');
      return;
    }
    const body = {
      name: this.createpromo.name,
      description: this.createpromo.description,
      active: this.createpromo.ativeStatus,
      win_message: this.createpromo.win_message,
    };
    this.loading = true;
    this.batchSrv
      .createPromo(body)
      .then((res) => {
        if (res.error) {
          this.notify.error('', res.error);
          this.loading = false;
          return;
        }
        this.notify.success('', res.message);
        this.loading = false;
        this.handleModalCancel();
        // this.createpromo = {
        //   id: '',
        //   sku: '',
        //   title: '',
        //   description: '',
        //   video: '',
        //   weight: '',
        //   manufacturer: '',
        //   image: '',
        // };
        this.loadPromo();
        this.setOfCheckedId = new Set<number>();
      })
      .catch((err) => {
        this.loading = false;
        this.notify.error('', err);
      });
  }

  // EDIT promo
  editPromo() {
    this.promoImage = null;
    let arr = Array.from(this.setOfCheckedId);
    if (arr.length > 1) {
      this.notify.info('', 'You can only select one promo to edit');
      return;
    }
    if (arr.length == 0) {
      this.notify.info('', 'Select one promo to edit');
      return;
    }
    this.btneditloading = true;
    this.batchSrv
      .showPromo(String(arr[0]))
      .then((res) => {
        if (res.error) {
          this.notify.error('', res.error);
          this.btneditloading = false;
          return;
        }
        this.isAddorEdit = true;
        this.btneditloading = false;
        this.isVisible = true;
        this.createpromo = res.data;
        this.createpromo.ativeStatus = res.data.active;
      })
      .catch((err) => {
        this.btneditloading = false;
        this.notify.error('', err);
      });
  }

  // UPDATE promo
  updatePromo(): void {
    if (
      !this.createpromo.name ||
      !this.createpromo.description ||
      this.createpromo.ativeStatus == null ||
      undefined ||
      !this.createpromo.win_message
    ) {
      this.notify.error('', 'Input All Fields');
      return;
    }
    this.loading = true;
    const arr = Array.from(this.setOfCheckedId);

    const body = {
      name: this.createpromo.name,
      description: this.createpromo.description,
      active: this.createpromo.ativeStatus,
      win_message: this.createpromo.win_message,
    };
    this.batchSrv
      .updatePromo(body, String(arr[0]))
      .then((res) => {
        if (res.error) {
          this.notify.error('', res.error);
          this.loading = false;
          return;
        }
        this.loading = false;
        this.notify.success('', res.message);
        this.handleModalCancel();
        this.loadPromo();
        this.setOfCheckedId = new Set<number>();
      })
      .catch((err) => {
        this.loading = false;
        this.notify.error('', err);
      });
  }

  // DELETE promo
  deletePromo() {
    let arr = Array.from(this.setOfCheckedId);
    if (arr.length == 0) {
      this.notify.info('', 'Select at least one device to Delete');
      return;
    }
    arr.forEach((e) => {
      this.deleteMethod(String(e));
    });
  }

  deleteMethod(id: string) {
    this.batchSrv
      .deletePromo(id)
      .then((res) => {
        if (res.error) {
          this.notify.error('', res.error);
          return;
        }
        this.notify.success('', res.message);
        this.loadPromo();
        this.setOfCheckedId = new Set<number>();
      })
      .catch((err) => {
        this.notify.error('', err);
      });
  }

  processpromoImage($event: any) {
    this.promoImage = $event.target.files[0];
  }
}
