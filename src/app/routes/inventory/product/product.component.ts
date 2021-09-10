import { Component, OnInit, ViewChild } from '@angular/core';
import { DateFormatService, NotificationService } from '@core';
import { NzModalService } from 'ng-zorro-antd/modal';
import { InventoryService } from 'src/app/core/services/inventroy/inventory.service';
import { DomSanitizer, SafeUrl } from '@angular/platform-browser';

@Component({
  selector: 'app-product',
  templateUrl: './product.component.html',
  styles: [],
})
export class ProductComponent implements OnInit {
  isVisible = false;
  isviewmodalVisible = false;
  loading = false;
  batchSelection: any[] = [];
  productSelection: any[] = [];
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
  productData: any[] = [];
  query: {
    product_id: string;
  } = {
    product_id: '',
  };
  createProduct: {
    id: string;
    sku: string;
    title: string;
    description: string;
    video: string;
    weight: string;
    manufacturer: string;
    image: any;
  } = {
    id: '',
    sku: '',
    title: '',
    description: '',
    video: '',
    weight: '',
    manufacturer: '',
    image: '',
  };
  products = [];
  productImage: any;
  constructor(
    private modalSrv: NzModalService,
    private notify: NotificationService,
    private batchSrv: InventoryService,
    private dateFormat: DateFormatService,
    private sanitizer: DomSanitizer,
  ) {}

  ngOnInit(): void {
    this.loading = true;
    this.loadProduct();
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

  centerDevices(data: any): void {}

  loadProduct() {
    this.loading = true;
    this.batchSrv
      .getProduct()
      .then((res) => {
        if (res.status == 'FAILED') {
          this.loading = false;
          this.error = res.error;
        }
        this.productData = res.data.products;
        this.loading = false;
      })
      .catch((err) => {
        this.loading = false;
        this.notify.error('', err);
      });
  }

  // CREATE Product
  add(): void {
    this.productImage = null;
    this.isAddorEdit = false;
    this.createProduct = {
      id: '',
      sku: '',
      title: '',
      description: '',
      video: '',
      weight: '',
      manufacturer: '',
      image: '',
    };
    this.isVisible = true;
  }

  addProduct(): void {
    if (
      !this.createProduct.sku ||
      !this.createProduct.title ||
      !this.createProduct.description ||
      !this.createProduct.weight ||
      !this.createProduct.manufacturer ||
      !this.createProduct.image
    ) {
      this.notify.error('', 'Input All Fields');
      return;
    }
    const formData = new FormData();
    formData.append('id', this.createProduct.id);
    formData.append('sku', this.createProduct.sku);
    formData.append('title', this.createProduct.title);
    formData.append('description', this.createProduct.description);
    formData.append('video', this.createProduct.video);
    formData.append('weight', this.createProduct.weight);
    formData.append('manufacturer', this.createProduct.manufacturer);
    formData.append('image', this.productImage);
    this.loading = true;
    this.batchSrv
      .createProduct(formData)
      .then((res) => {
        if (res.error) {
          this.notify.error('', res.error);
          this.loading = false;
          return;
        }
        this.notify.success('', res.message);
        this.loading = false;
        this.handleModalCancel();
        this.loadProduct();
        this.setOfCheckedId = new Set<number>();
      })
      .catch((err) => {
        this.loading = false;
        this.notify.error('', err);
      });
  }

  // VIEW PRODUCT
  viewProduct() {
    let arr = Array.from(this.setOfCheckedId);
    if (arr.length > 1) {
      this.notify.info('', 'You can only select one product to view');
      return;
    }
    if (arr.length == 0) {
      this.notify.info('', 'Select one product to view');
      return;
    }
    this.btnviewloading = true;
    this.batchSrv
      .showProduct(String(arr[0]))
      .then((res) => {
        if (res.error) {
          this.notify.error('', res.error);
          this.btnviewloading = false;
          return;
        }
        this.btnviewloading = false;
        this.isviewmodalVisible = true;
        this.createProduct = res.data;
      })
      .catch((err) => {
        this.btnviewloading = false;
        this.notify.error('', err);
      });
  }

  // EDIT PRODUCT
  editProduct() {
    this.productImage = null;
    let arr = Array.from(this.setOfCheckedId);
    if (arr.length > 1) {
      this.notify.info('', 'You can only select one product to edit');
      return;
    }
    if (arr.length == 0) {
      this.notify.info('', 'Select one product to edit');
      return;
    }
    this.btneditloading = true;
    this.batchSrv
      .showProduct(String(arr[0]))
      .then((res) => {
        if (res.error) {
          this.notify.error('', res.error);
          this.btneditloading = false;
          return;
        }
        this.isAddorEdit = true;
        this.btneditloading = false;
        this.isVisible = true;
        this.createProduct = res.data;
      })
      .catch((err) => {
        this.btneditloading = false;
        this.notify.error('', err);
      });
  }

  // UPDATE PRODUCT
  updateProduct(): void {
    if (
      !this.createProduct.sku ||
      !this.createProduct.title ||
      !this.createProduct.description ||
      !this.createProduct.video ||
      !this.createProduct.weight ||
      !this.createProduct.manufacturer ||
      !this.createProduct.image
    ) {
      this.notify.error('', 'Input All Fields');
      return;
    }
    this.loading = true;
    const arr = Array.from(this.setOfCheckedId);

    const formData = new FormData();
    formData.append('id', this.createProduct.id);
    formData.append('sku', this.createProduct.sku);
    formData.append('title', this.createProduct.title);
    formData.append('description', this.createProduct.description);
    formData.append('video', this.createProduct.video);
    formData.append('weight', this.createProduct.weight);
    formData.append('manufacturer', this.createProduct.manufacturer);
    formData.append('image', this.productImage);
    formData.append('_method', 'put');
    this.batchSrv
      .updateProduct(formData, String(arr[0]))
      .then((res) => {
        if (res.error) {
          this.notify.error('', res.error);
          this.loading = false;
          return;
        }
        this.loading = false;
        this.notify.success('', res.message);
        this.handleModalCancel();
        this.loadProduct();
        this.setOfCheckedId = new Set<number>();
      })
      .catch((err) => {
        this.loading = false;
        this.notify.error('', err);
      });
  }

  // DELETE PRODUCT
  deleteProduct() {
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
      .deleteProduct(id)
      .then((res) => {
        if (res.error) {
          this.notify.error('', res.error);
          return;
        }
        this.notify.success('', res.message);
        this.loadProduct();
        this.loading = false;
        this.setOfCheckedId = new Set<number>();
      })
      .catch((err) => {
        this.notify.error('', err);
      });
  }

  processProductImage($event: any) {
    this.productImage = $event.target.files[0];
  }
}
