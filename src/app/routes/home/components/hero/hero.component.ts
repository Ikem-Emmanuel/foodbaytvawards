import { Component, OnInit } from '@angular/core';
import { DateFormatService, NotificationService } from '@core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { NominationService } from 'src/app/core/services/nomination/nomination.service';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.less'],
})
export class HeroComponent implements OnInit {
  isVisible = false;
  loading = false;
  error: {} = {};
  errorStatus = false;
  errorResult: {} = {};
  errorTable: any[] = [];
  awardCategories = [{ key: 'Best Resturant', value: 'BestR' }];

  q: {
    name: string;
    email: string;
    location: string;
    business_name: string;
    business_email: string;
    award_Category: string;
  } = {
    name: '',
    email: '',
    location: '',
    business_name: '',
    business_email: '',
    award_Category: '',
  };

  location = [
    { key: 'lagos', value: 'Lagos' },
    { key: 'oyo', value: 'Oyo' },
  ];
  constructor(
    private dateFormat: DateFormatService,
    private nominationService: NominationService,
    private modalSrv: NzModalService,
    private notify: NotificationService,
  ) {}

  nominationModal(): void {
    this.isVisible = true;
  }

  modalClose(): void {
    this.isVisible = false;
  }

  handleCancel(): void {
    this.isVisible = false;
    this.errorTable = [];
  }

  fields(): void {}

  checkValidation(value: any) {
    // console.log(value);
    // console.log(this.q.name);
    // if (value == '') {
    //   this.formValidation();
    // }
  }

  formValidation() {
    if ((this.errorTable = [])) {
      let dataSet = [
        { key: 'name', value: this.q.name },
        { key: 'email', value: this.q.email },
        { key: 'location', value: this.q.location },
        { key: 'business name', value: this.q.business_name },
        { key: 'business email', value: this.q.business_email },
        { key: 'award category', value: this.q.award_Category },
      ];
      let errorMsg: any[] = [];
      let validationError: {};
      dataSet.forEach((i, j) => {
        let errors = (i.value = '') ? `` : `Please input a valid ${i.key}`;
        let errorKey = { key: i.key, value: errors };
        errorMsg.push(errorKey);
        validationError = errorMsg[j];
        this.errorTable.push(validationError);
      });

      if (this.errorTable.length >= 1) {
        this.errorStatus = true;
      }
      return;
    }

    // return;
  }

  nomiateBusiness() {
    this.formValidation();
    console.log('here');
    // console.log(validationError);
    // let ErrorData = errorMsg.values();
    // let validationError = '';
    // for (let error of ErrorData) {
    //   validationError = error;
    // }
    // console.log(validationError);
    // if (!this.q.name || !this.q.email || !this.q.location || !this.q.business_name || !this.q.business_email || !this.q.award_Category) {
    //   this.notify.error('', 'Input All Fields');
    //   return;
    // }
    // this.loading = true;
    // console.log(this.q);
    // this.nominationService
    //   .nominate(this.q)
    //   .then((res) => {
    //     if (res.error) {
    //       this.notify.error('', res.error);
    //       this.loading = false;
    //       return;
    //     }
    //     this.notify.success('', res.message);
    //     this.loading = false;
    //     this.modalClose();
    //   })
    //   .catch((err) => {
    //     this.loading = false;
    //     this.notify.error('', err);
    //     console.log(err);
    //   });
  }

  ngOnInit(): void {}
}
