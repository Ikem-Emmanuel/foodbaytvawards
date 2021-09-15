import { Component, OnInit } from '@angular/core';
import { DateFormatService, NotificationService } from '@core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { IndexService } from 'src/app/core/services/awards/index.service';
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
  awardCategories = [];
  successMsg = '';
  isSuccessful = false;

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
    { key: 'abia', value: 'Abia - Umuahia' },
    { key: 'adamawa', value: 'Adamawa - Yola' },
    { key: 'akwa ibom', value: 'Akwa Ibom - Uyo' },
    { key: 'Anambra', value: 'Anambra - Awka' },
    { key: 'bauchi', value: 'Bauchi - Bauchi' },
    { key: 'bayelsa', value: 'Bayelsa - Yenagoa' },
    { key: 'benue', value: 'Benue - Makurdi' },
    { key: 'borno', value: 'Borno -Borno' },
    { key: 'cross river', value: 'Cross River - Calabar' },
    { key: 'delta', value: 'Delta - Asaba' },
    { key: 'ebonyi', value: 'Ebonyi - Abakaliki' },
    { key: 'edo', value: 'Edo - Benin City' },
    { key: 'ekiti', value: 'Ekiti - Ado Ekiti	' },
    { key: 'enugu', value: 'Enugu - Enugu' },
    { key: 'gombe', value: 'Gombe - Gombe' },
    { key: 'imo', value: 'Imo - Owerri' },
    { key: 'jigawa', value: 'Jigawa - Dutse' },
    { key: 'kaduna', value: 'Kaduna - Kaduna' },
    { key: 'kano', value: 'Kano - Kano' },
    { key: 'kastina', value: 'Kastina - Kastina' },
    { key: 'kebbi', value: 'Kebbi - Birnin Kebbi' },
    { key: 'kogi', value: 'Kogi - Lokoja' },
    { key: 'kwara', value: 'Kwara - Ilorin' },
    { key: 'lagos', value: 'Lagos - Ikeja' },
    { key: 'nasarawa', value: 'Nasarawa - Lafia' },
    { key: 'niger', value: 'Niger - Mina' },
    { key: 'ogun', value: 'Ogun - Abeokuta' },
    { key: 'ondo', value: 'Ondo - Akure' },
    { key: 'osun', value: 'Osun Oshogbo' },
    { key: 'oyo', value: 'Oyo Ibadan' },
    { key: 'plateau', value: 'Plateau - Jos' },
    { key: 'rivers', value: 'River - Port Harcourt' },
    { key: 'sokoto', value: 'Sokoto - Sokoto' },
    { key: 'taraba', value: 'Taraba - Jalingo' },
    { key: 'yobe', value: 'Yobe - Damaturu' },
    { key: 'zamfara', value: 'Zamfara - Gusau' },
  ];
  constructor(
    private dateFormat: DateFormatService,
    private modalSrv: NzModalService,
    private notify: NotificationService,
    private awardService: IndexService,
    private nominationService: NominationService,
  ) {}

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

  // MODAL ACTIONS

  nominationModal(): void {
    this.isVisible = true;
  }

  modalClose(): void {
    this.isVisible = false;
    this.isSuccessful = true;
    setTimeout(() => {
      this.isSuccessful = false;
    }, 2000);
    this.q = {
      name: '',
      email: '',
      location: '',
      business_name: '',
      business_email: '',
      award_Category: '',
    };
    this.errorTable = [];
    return;
  }

  handleCancel(): void {
    this.isVisible = false;
    this.errorTable = [];
  }

  checkValidation(value: any) {
    // console.log(value);
    // console.log(this.q.name);
    // if (value == '') {
    //   this.formValidation();
    // }
  }

  formValidation() {
    console.log('You will fine');
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
    this.loading = true;
    let body = {
      nominees_name: this.q.name,
      email: this.q.email,
      nominees_location: this.q.location,
      business_name: this.q.business_name,
      business_email: this.q.business_email,
      award_confirmation_date: new Date().toISOString().substring(0, 10),
      award_id: this.q.award_Category,
    };
    this.nominationService
      .nominate(body)
      .then((res) => {
        if (res.error) {
          this.notify.error('', res.error);
          this.loading = false;
          return;
        }
        // this.notify.success('', res.message);
        this.successMsg = res.message;

        this.loading = false;
        this.modalClose();
      })
      .catch((err) => {
        this.loading = false;
        this.notify.error('', err);
        console.log(err);
      });
  }

  ngOnInit(): void {
    this.loadawardCategories();
  }
}
