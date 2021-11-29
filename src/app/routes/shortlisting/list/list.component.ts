import { Component, OnInit, ViewChild } from '@angular/core';
import { DateFormatService, NotificationService } from '@core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { IndexService } from 'src/app/core/services/awards/index.service';
import endOfMonth from 'date-fns/endOfMonth';
import { NominationService } from 'src/app/core/services/nomination/nomination.service';
import { BizService } from 'src/app/core/services/business/biz.service';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.less'],
})
export class ListComponent implements OnInit {
  isVisible = false;
  isPromovisible = false;
  loading = false;
  btnbatchPromoloading = false;
  btneditloading = false;
  businessSelection: any[] = [];
  promoData: any[] = [];
  bizAwards: any[] = [];
  error = '';
  shortlistedTable: any[] = [];
  awardCategories: any[] = [];
  expandSet = new Set<number>();
  videoLink = '';
  businessInfo = { email: '', name: '', videoPath: '' };
  businessStatus = { approved: 'Approved', declined: 'Disqualify' };
  videoAvailable = false;

  checked = false;
  indeterminate = false;
  listOfCurrentPageData: any[] = [];
  listOfData: any[] = [];
  setOfCheckedId = new Set<number>();
  isAddorEdit: boolean = false;

  isImportVisible = false;
  ranges = { Today: [new Date(), new Date()], 'This Month': [new Date(), endOfMonth(new Date())] };

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
  q: {
    award_id: string;
    range: string;
    location: string;
  } = {
    award_id: '',
    range: '',
    location: '',
  };

  query: {
    date_from: string;
    date_to: string;
    range: string;
  } = {
    range: '',
    date_from: '',
    date_to: '',
  };
  constructor(
    private modalSrv: NzModalService,
    private notify: NotificationService,
    private bizSrv: BizService,
    private awardService: IndexService,
    private nominationService: NominationService,
    private dateFormat: DateFormatService,
  ) {}

  ngOnInit(): void {
    this.loading = true;
    this.loadshortlistedBusiness();
    this.loadawardCategories();
    // this.loadPromo();
  }

  // onChangeManufactured(data: any) {
  //   this.q.start_date = this.dateFormat.formatDate(data);
  // }
  // onChangeExpiry(data: any) {
  //   this.q.end_date = this.dateFormat.formatDate(data);
  // }

  onChange(event: any): void {
    console.log(event);
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
    this.businessInfo.email = '';
    this.businessInfo.name = '';
    this.businessInfo.videoPath = '';
  }

  viewVideo(email: string, bizName: string, path: string) {
    this.isVisible = true;
    this.businessInfo.email = email;
    this.businessInfo.name = bizName;
    if (path == null) {
      this.videoAvailable = false;
      return;
    }
    this.businessInfo.videoPath = path;
    this.videoAvailable = true;
  }

  onDateChange(result: any) {
    this.query.date_from = result[0] ? this.dateFormat.formatDate(result[0]) : '';
    this.query.date_to = result[1] ? this.dateFormat.formatDate(result[1]) : '';
  }

  loadawardCategories() {
    this.awardService
      .list()
      .then((res: any) => {
        this.awardCategories = res.data;
        this.loading = false;
      })
      .catch((err: any) => {
        this.notify.error('error', err);
        this.loading = false;
      });
  }

  approvalStatus(data: string) {
    this.loading = true;
    let body = {
      email: this.businessInfo.email,
      status: data,
    };
    console.log(body);
    this.bizSrv
      .approveBizForVoting(body)
      .then((res) => {
        if (res.status == 'error') {
          this.loading = false;
          this.notify.error('', res.message);
          return;
        }
        this.notify.success('', res.message);
        this.loading = false;
        this.handleModalCancel();
        this.loadshortlistedBusiness();
      })
      .catch((err: any) => {
        this.notify.error('error', err);
        this.loading = false;
      });
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
        this.loadshortlistedBusiness();
        this.loading = false;
      })
      .catch((err) => {
        this.loading = false;
        this.notify.error('', err);
      });
  }

  filter(): void {
    // this.loading = true;
    // let body = {
    //   search: this.query.search,
    //   date_from: this.query.date_from,
    //   date_to: this.query.date_to,
    //   center: this.query.center,
    //   status: this.query.status == 'All' && this.query.last_log_status != 'All' ? '' : this.query.status,
    //   last_log_status: this.query.last_log_status,
    //   timezone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    // };
    // this.deviceService
    //   .index(body)
    //   .then((res) => {
    //     this.deviceStatuses = res.data?.sort((a: any, b: any) => b.created_date - a.created_date);
    //     this.meta = res.meta;
    //     this.current_page = res.meta.current_page;
    //     this.lastpage = res.meta.last_page;
    //     this.from = res.meta.from;
    //     this.to = res.meta.to;
    //     this.total = res.meta.total;
    //     this.nextPage = res.links.next;
    //     this.loading = false;
    //     this.setOfCheckedId = new Set<number>();
    //   })
    //   .catch((err) => {
    //     this.loading = false;
    //     console.log(err);
    //   });
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

        // this.lotData.forEach((e) => {
        //   if (e.id == res.data.data[0].lot_id) {
        //     e.data = res.data.data;
        //     this.lotItems = e.data;
        //   }
        // });
        // this.meta_log = res.data?.path;
        // this.current_page_log = res.data.current_page;
        // this.lastpage_log = res.data.last_page;
        // this.from_log = res.data.from;
        // this.to_log = res.data.to;
        // this.total_log = res.data.total;
        // this.nextPage_log = res.data.next;
        // this.loading = false;
      })
      .catch((err) => {
        this.loading = false;
        this.notify.error('', err);
      });
  }

  loadshortlistedBusiness() {
    this.loading = true;

    this.bizSrv
      .allshortlistedBiz()
      .then((res) => {
        if (res.status == 'FAILED') {
          this.loading = false;
          this.error = res.error;
          return;
        }
        const result = res.data;
        this.shortlistedTable = result.filter((item: any) => item.canPublish == 0);
        this.loading = false;
      })
      .catch((err) => {
        this.loading = false;
        this.notify.error('', err);
      });
  }
}
