import { Component, OnInit } from '@angular/core';
import { NotificationService } from '@core';
import { IndexService } from 'src/app/core/services/awards/index.service';
import { BizService } from 'src/app/core/services/business/biz.service';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'app-vote-page',
  templateUrl: './vote-page.component.html',
  styleUrls: ['./vote-page.component.less'],
})
export class VotePageComponent implements OnInit {
  awardCategories: [] = [];
  loading: boolean = false;
  candidates: any[] = [];
  businessList: any[] = [];
  filteredbusinessList: any[] = [];
  awardName: string = '';
  initLoading = false;
  loadingMore = false;
  emptyResult = false;
  voting = false;
  count = 1;
  data: any[] = [];
  list: Array<{ loading: boolean; name: any }> = [];
  votemodal = false;
  businessAwardID: number = 0;
  businessName: string = '';
  nominatedAward: string = '';

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
  constructor(private awardService: IndexService, private bizSrv: BizService, private notify: NotificationService, fb: FormBuilder) {
    this.votersForm = fb.group({
      email: [null, [Validators.required, Validators.email]],
    });
  }

  get email(): AbstractControl {
    return this.votersForm.controls.email;
  }

  votersForm: FormGroup;

  modalClose(): void {
    this.votemodal = false;
    return;
  }

  //GET AWARDS CATEGORIES

  loadawardCategories() {
    this.awardService
      .list()
      .then((res: any) => {
        this.awardCategories = res.data;
        this.loading = false;
      })
      .catch((err: any) => {
        console.warn('error: ', err);
        this.loading = false;
      });
  }

  // SHORTLISTED BUSINESSES

  shortlistedBiz() {
    this.loading = true;
    this.bizSrv
      .approvedBusinesslist()
      .then((res) => {
        if (res.error) {
          this.loading = false;
          return;
        }
        this.meta = res.data.path;
        this.current_page = res.data.current_page;
        this.lastpage = res.data.last_page;
        this.from = res.data.from;
        this.to = res.data.to;
        this.total = res.data.total;
        this.nextPage = res.data.links.next_page;
        this.businessList = res.data.data;
        this.candidates = this.businessList;
        this.loading = false;
      })
      .catch((err) => {
        this.loading = false;
        this.notify.error('', err);
      });
  }

  //FILTER BUSINESS BASED ON AWARDS

  filter(x: string) {
    this.emptyResult = false;
    this.loading = true;
    if (x == 'All') {
      this.shortlistedBiz();
      this.loading = false;
      return;
    }
    this.filteredbusinessList = this.businessList.filter((item: any) => item.award_id == x);
    if (this.filteredbusinessList.length == 0) {
      this.emptyResult = true;
    }
    this.candidates = this.filteredbusinessList;
    this.loading = false;
  }

  next(id: number): void {
    this.loading = true;
    let url = this.meta + '?page_size=10&page=' + id;
    console.log(url);
    this.bizSrv
      .nextLogs(url)
      .then((res) => {
        if (res.error) {
          this.notify.error('', res.error);
          this.loading = false;
          return;
        }
        this.meta = res.data.path;
        this.current_page = res.data.current_page;
        this.lastpage = res.data.last_page;
        this.from = res.data.from;
        this.to = res.data.to;
        this.total = res.data.total;
        this.nextPage = res.data.links.next;
        this.businessList = res.data.data;
        this.loading = false;
      })
      .catch((err) => {
        this.loading = false;
        this.notify.error('', err);
        console.log(err);
      });
  }

  voteBizmodal(businessname: string, award: string, id: number) {
    this.votemodal = true;
    this.businessAwardID = id;
    this.businessName = businessname;
    this.nominatedAward = award;
  }

  voteBusiness() {
    this.voting = true;
    this.email.markAsDirty();
    this.email.updateValueAndValidity();

    console.log(this.email.value, this.businessAwardID);
    // let body = { email: this.email, id: this.businessAwardID };
    // this.bizSrv
    //   .voteBiz(body)
    //   .then((res) => {
    //     if (res.status == 'FAILED') {
    //       this.voting = false;
    //       this.votemodal = false;
    //       this.notify.error('', res.error);
    //     }
    //     this.notify.error('', res.message);
    //     this.voting = false;
    //     this.votemodal = false;
    //   })
    //   .catch((err) => {
    //     this.loading = false;
    //     this.notify.error('', err);
    //   });
  }

  ngOnInit(): void {
    this.loadawardCategories();
    this.shortlistedBiz();
  }
}
