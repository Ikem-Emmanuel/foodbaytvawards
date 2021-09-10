import { Component, OnInit, ViewChild } from '@angular/core';
import { DateFormatService, NotificationService } from '@core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { InventoryService } from 'src/app/core/services/inventroy/inventory.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';
@Component({
  selector: 'app-lot',
  templateUrl: './lot.component.html',
  styleUrls: ['./lot.component.less'],
})
export class LotComponent implements OnInit {
  isVisible = false;
  isaddeditmodalVisible = false;
  loading = false;
  batchSelection: any[] = [];
  lotSelection: any[] = [];
  error = '';
  expandSet = new Set<number>();

  // deviceStatuses: Device[] = [];

  checked = false;
  indeterminate = false;
  listOfCurrentPageData: any[] = [];
  listOfData: any[] = [];
  setOfCheckedId = new Set<number>();
  isAddorEdit: boolean = false;
  isPrintedorExport: boolean = false;

  isImportVisible = false;

  status: any;
  records: any[] = [];
  @ViewChild('csvReader') csvReader: any;
  ops: string = 'select';
  batchData: any[] = [];
  lotData: any[] = [];
  lotItems: any[] = [];
  query: {
    product_title: string;
    product_id: string;
  } = {
    product_title: 'Angostura Bitters',
    product_id: '',
  };
  createLot: {
    title: string;
    amount: number;
  } = {
    title: '',
    amount: 0,
  };
  range: {
    from: number;
    to: number;
  } = {
    from: 0,
    to: 0,
  };
  lotStatus: {
    key: string;
    value: boolean;
  } = {
    key: '',
    value: false,
  };
  lotstatusList = [
    { key: 'ALL', value: true },
    { key: 'Printed', value: true },
    { key: 'notPrinted', value: true },
  ];
  lotURL = '';
  printedLot: boolean = false;
  products = [];
  lot = [];
  lotDocument: string = '';

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

  current_page_log: number = 0;
  total_log: number = 0;
  from_log: number = 0;
  to_log: number = 0;
  lastpage_log: number = 0;
  page_log: any[] = [];
  meta_log: any;
  nextPage_log: string = '';

  constructor(
    private modalSrv: NzModalService,
    private notify: NotificationService,
    private batchSrv: InventoryService,
    private dateFormat: DateFormatService,
    private sanitizer: DomSanitizer,
  ) {}

  ngOnInit(): void {
    this.loading = true;
    this.loadLot();
  }

  // onChangeManufactured(data: any) {
  //   this.q.manufactured_date = this.dateFormat.formatDate(data);
  // }
  // onChangeExpiry(data: any) {
  //   this.q.expiry_date = this.dateFormat.formatDate(data);
  // }

  onExpandChange(id: number, checked: boolean): void {
    if (checked) {
      this.getlotItem(id);
      this.expandSet.add(id);
    } else {
      this.expandSet.delete(id);
    }
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
    this.isImportVisible = false;
  }
  handleaddeditModalCancel(): void {
    this.isaddeditmodalVisible = false;
  }

  checkPrinted(): void {
    this.loadLot();
  }
  checkUsed(): void {
    this.loadLot();
  }

  centerDevices(data: any): void {}

  getlotItem(id: number) {
    this.loading = true;
    let url = `?lot_id=${id}`;
    this.batchSrv
      .getlotItem(url)
      .then((res) => {
        if (res.status == 'FAILED') {
          this.loading = false;
          this.error = res.error;
        }
        this.lotData.forEach((e) => {
          if (e.id == res.data.data[0].lot_id) {
            e.data = res.data.data;
            this.lotItems = e.data;
          }
        });
        this.meta_log = res.data?.path;
        this.current_page_log = res.data.current_page;
        this.lastpage_log = res.data.last_page;
        this.from_log = res.data.from;
        this.to_log = res.data.to;
        this.total_log = res.data.total;
        this.nextPage_log = res.data.next;
        this.loading = false;
      })
      .catch((err) => {
        this.loading = false;
        this.notify.error('', err);
      });
  }

  next_log(id: number, lot_id: string): void {
    this.loading = true;
    let url = this.meta_log;
    const params = {
      page: id,
      lot_id,
    };
    this.batchSrv
      .nextClientLogs(url, params)
      .then((res) => {
        if (res.error) {
          this.notify.error('', res.error);
          this.loading = false;
          return;
        }
        this.lotData.forEach((e) => {
          if (e.id == res.data.data[0].lot_id) {
            e.data = res.data.data;
            this.lotItems = e.data;
            console.log(this.lotItems);
          }
        });
        this.meta_log = res.data?.path;
        this.current_page_log = res.data.current_page;
        this.lastpage_log = res.data.last_page;
        this.from_log = res.data.from;
        this.to_log = res.data.to;
        this.total_log = res.data.total;
        this.nextPage_log = res.data.next_page_url;
        this.loading = false;
      })
      .catch((err) => {
        this.loading = false;
        this.notify.error('', err);
        console.warn(err);
      });
  }

  next(id: number): void {
    this.loading = true;
    let url = this.meta;
    const body = {
      page: id,
    };
    console.log(url);
    this.batchSrv
      .nextLogs(url, body)
      .then((res) => {
        if (res.error) {
          this.notify.error('', res.error);
          this.loading = false;
          return;
        }
        this.lotData = res.data.data;
        this.meta = res.data?.path;
        this.current_page = res.data.current_page;
        this.lastpage = res.data.last_page;
        this.from = res.data.from;
        this.to = res.data.to;
        this.total = res.data.total;
        this.nextPage = res.data.next_page_url;
        this.loading = false;
      })
      .catch((err) => {
        this.loading = false;
        this.notify.error('', err);
        console.warn(err);
      });
  }

  loadLot() {
    this.loading = true;
    if (this.printedLot) {
      this.lotURL = `?printed=${this.printedLot}`;
    } else {
      this.lotURL = '';
    }

    this.batchSrv
      .getLot(this.lotURL)
      .then((res) => {
        if (res.status == 'FAILED') {
          this.loading = false;
          this.error = res.error;
        }
        this.lotData = res.data.data;
        this.meta = res.data?.path;
        this.current_page = res.data.current_page;
        this.lastpage = res.data.last_page;
        this.from = res.data.from;
        this.to = res.data.to;
        this.total = res.data.total;
        this.nextPage = res.data.next;
        this.loading = false;
      })
      .catch((err) => {
        this.loading = false;
        this.notify.error('', err);
      });
  }

  // CREATE LOT
  add(): void {
    this.isAddorEdit = true;
    this.createLot = {
      title: '',
      amount: 0,
    };
    this.isaddeditmodalVisible = true;
  }

  addLot(): void {
    if (this.createLot.amount < 49) {
      this.notify.error('', 'Lot amount should be greater than 50');
      return;
    }
    this.loading = true;
    this.batchSrv
      .createLot(this.createLot)
      .then((res) => {
        if (res.error) {
          this.notify.error('', res.error);
          this.loading = false;
          return;
        }
        this.notify.success('', res.message);
        this.loading = false;
        this.handleModalCancel();
        this.createLot = {
          title: '',
          amount: 0,
        };
        this.isaddeditmodalVisible = false;
        this.loadLot();
        this.setOfCheckedId = new Set<number>();
      })
      .catch((err) => {
        this.loading = false;
        this.notify.error('', err);
      });
  }

  // EDIT LOT
  editBatch(): void {}

  //MARK PRINTED
  markPrinted() {
    this.loading = true;
    let arr = Array.from(this.setOfCheckedId);
    if (arr.length > 1) {
      this.notify.info('', 'You can only select one product to view');
      return;
    }
    if (arr.length == 0) {
      this.notify.info('', 'Select one product to view');
      return;
    }
    this.batchSrv
      .printedLot(arr)
      .then((res) => {
        if (res.status == 'FAILED') {
          this.loading = false;
          this.error = res.error;
        }
        this.notify.success('', res.message);
        this.loading = false;
        this.range = {
          from: 0,
          to: 0,
        };
        this.handleModalCancel();
        this.range = {
          from: 0,
          to: 0,
        };
        this.loadLot();
        this.setOfCheckedId = new Set<number>();
      })
      .catch((err) => {
        this.loading = false;
        this.notify.error('', err);
      });
  }

  //EXPORT LOT
  // initiateExportModal(): void {
  //   this.isPrintedorExport = true;
  //   this.range = {
  //     from: 0,
  //     to: 0,
  //   };
  //   this.isVisible = true;
  // }
  // initiatelotExport()
  // {
  //   let arr = Array.from(this.setOfCheckedId);
  //   if (arr.length > 1) {
  //     this.notify.info('', 'You can only select one product to view');
  //     return;
  //   }
  //   if (arr.length == 0) {
  //     this.notify.info('', 'Select one product to view');
  //     return;
  //   }
  // }
  exportLot() {
    let arr = Array.from(this.setOfCheckedId);
    if (arr.length > 1) {
      this.notify.info('', 'You can only select one product to view');
      return;
    }
    if (arr.length == 0) {
      this.notify.info('', 'Select one product to view');
      return;
    }
    this.loading = true;
    this.batchSrv
      .exportLot(arr)
      .then((res) => {
        this.lotDocument = URL.createObjectURL(res);
        window.open(this.lotDocument);
        this.loading = false;
      })
      .catch((err) => {
        this.loading = false;
        this.notify.error('', err);
      });
  }

  // DELETE PRODUCT
  deleteLot() {
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
    this.loading = true;
    this.batchSrv
      .deleteLot(id)
      .then((res) => {
        if (res.error) {
          this.notify.error('', res.error);
          return;
        }
        this.notify.success('', res.message);

        this.loading = false;
        this.loadLot();
        this.setOfCheckedId = new Set<number>();
      })
      .catch((err) => {
        this.notify.error('', err);
        this.loading = false;
      });
  }
}
