import { Component, OnInit } from '@angular/core';
import { DateFormatService, NotificationService } from '@core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { IndexService } from 'src/app/core/services/awards/index.service';
import { BizService } from 'src/app/core/services/business/biz.service';
import { NominationService } from 'src/app/core/services/nomination/nomination.service';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LocationService } from 'src/app/core/services/location/location.service';

@Component({
  selector: 'app-hero',
  templateUrl: './hero.component.html',
  styleUrls: ['./hero.component.less'],
})
export class HeroComponent implements OnInit {
  isVisible = false;
  isActive = false;
  loading = false;
  error: {} = {};
  errorStatus = false;
  errorResult: {} = {};
  errorTable: any[] = [];
  awardCategories = [];
  businessList = [];
  successMsg = '';
  isSuccessful = false;
  showFilename = false;
  fileName = '';
  businessVideo: any;
  locations: any[] = [];
  constructor(
    private dateFormat: DateFormatService,
    private bizSrv: BizService,
    private locationSrv: LocationService,
    private notify: NotificationService,
    fb: FormBuilder,
    private awardService: IndexService,
    private nominationService: NominationService,
  ) {
    this.nominationForm = fb.group({
      nomineeName: [null, [Validators.required]],
      nomineeEmail: [null, [Validators.required, Validators.email]],
      nomineeLocation: [null, [Validators.required]],
      bizName: [null, [Validators.required]],
      bizEmail: [null, [Validators.required, Validators.email]],
      award: [null, [Validators.required]],
    });
    this.bizForm = fb.group({
      name: [null, [Validators.required]],
      business_id: [null, [Validators.required]],
      email: [null, [Validators.required, Validators.email]],
      location: [null, [Validators.required]],
      video: [null, [Validators.required]],
    });
  }

  // NOMINATION
  get nomineeName(): AbstractControl {
    return this.nominationForm.controls.nomineeName;
  }
  get nomineeEmail(): AbstractControl {
    return this.nominationForm.controls.nomineeEmail;
  }
  get nomineeLocation(): AbstractControl {
    return this.nominationForm.controls.nomineeLocation;
  }
  get bizName(): AbstractControl {
    return this.nominationForm.controls.bizName;
  }
  get bizEmail(): AbstractControl {
    return this.nominationForm.controls.bizEmail;
  }
  get award(): AbstractControl {
    return this.nominationForm.controls.award;
  }

  // VIDEO UPLOAD
  get name(): AbstractControl {
    return this.bizForm.controls.name;
  }
  get business_id(): AbstractControl {
    return this.bizForm.controls.business_id;
  }
  get email(): AbstractControl {
    return this.bizForm.controls.email;
  }
  get location(): AbstractControl {
    return this.bizForm.controls.location;
  }
  get video(): AbstractControl {
    return this.bizForm.controls.video;
  }

  bizForm: FormGroup;
  nominationForm: FormGroup;
  type = 0;

  // MODAL ACTIONS

  nominationModal(): void {
    this.loadawardCategories();
    this.loadLocations();
    this.isVisible = true;
  }

  uploadvideoModal(): void {
    this.loadawardCategories();
    this.loadLocations();
    this.shortlistedBiz();
    this.isActive = true;
  }

  videoUploadModalCancel(): void {
    this.isActive = false;
    this.bizForm.reset();
  }

  modalClose(): void {
    this.isVisible = false;
    this.isActive = false;
    this.bizForm.reset();
    this.nominationForm.reset();
    return;
  }

  handleCancel(): void {
    this.isVisible = false;
    this.errorTable = [];
  }

  readFile($event: any) {
    this.businessVideo = $event.srcElement.files[0];
    let fileDataName = $event.target.files[0];
    this.fileName = fileDataName.name;
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
    this.bizSrv
      .shortlisted()
      .then((res) => {
        if (res.error) {
          this.loading = false;
          console.log(res.errorrr);
          return;
        }
        this.businessList = res.data;
      })
      .catch((err) => {
        this.loading = false;
        this.notify.error('', err);
      });
  }

  // LOCATIONS

  loadLocations() {
    this.locationSrv
      .list()
      .then((res) => {
        if (res.error) {
          this.loading = false;
          console.log(res.errorrr);
          return;
        }
        this.locations = res.data;
      })
      .catch((err) => {
        this.loading = false;
        this.notify.error('', err);
      });
  }

  // UPLOAD VIDEOS

  bizUpload() {
    this.business_id.markAsDirty();
    this.name.markAsDirty();
    this.email.markAsDirty();
    this.location.markAsDirty();
    this.video.markAsDirty();

    this.business_id.updateValueAndValidity();
    this.name.updateValueAndValidity();
    this.email.updateValueAndValidity();
    this.location.updateValueAndValidity();
    this.video.updateValueAndValidity();

    const formData = new FormData();
    formData.append('business_id', this.business_id.value);
    formData.append('owners_name', this.name.value);
    formData.append('owners_location', this.location.value);
    formData.append('email', this.email.value);
    formData.append('video', this.businessVideo);
    this.loading = true;
    this.bizSrv
      .upload(formData)
      .then((res) => {
        if (res.status == 'FAILED') {
          this.notify.error('', res.error);
          this.loading = false;
          return;
        }
        // this.notify.success('', res.message);
        this.notify.success('', res.message);
        this.loading = false;
        // this.modalClose();
      })
      .catch((err) => {
        this.loading = false;
        this.notify.error('', err);
        console.log(err);
      });
  }

  // NOMINATE BUSINESS

  nomiateBusiness() {
    this.loading = true;
    this.nomineeName.markAsDirty();
    this.nomineeEmail.markAsDirty();
    this.nomineeLocation.markAsDirty();
    this.bizName.markAsDirty();
    this.bizEmail.markAsDirty();
    this.award.markAsDirty();

    this.nomineeName.updateValueAndValidity();
    this.nomineeEmail.updateValueAndValidity();
    this.nomineeLocation.updateValueAndValidity();
    this.bizName.updateValueAndValidity();
    this.bizEmail.updateValueAndValidity();
    this.award.updateValueAndValidity();
    let body = {
      nominees_name: this.nomineeName.value,
      email: this.nomineeEmail.value,
      location_id: this.nomineeLocation.value,
      business_name: this.bizName.value,
      business_email: this.bizEmail.value,
      award_confirmation_date: new Date().toISOString().substring(0, 10),
      award_id: this.award.value,
    };
    this.nominationService
      .nominate(body)
      .then((res) => {
        if (res.status == 'Failed') {
          this.notify.error('', res.message);
          this.loading = false;
          return;
        }
        this.notify.success('', res.message);
        this.loading = false;
        this.modalClose();
      })
      .catch((err) => {
        this.loading = false;
        console.error(err);
      });
  }

  ngOnInit(): void {
    // this.loadawardCategories();
    // this.loadLocations();
    // this.shortlistedBiz();
  }
}
