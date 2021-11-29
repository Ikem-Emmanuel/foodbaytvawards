import { Component, OnInit } from '@angular/core';
import { _HttpClient } from '@delon/theme';
var CanvasJS = require('src/assets/js/canvas.min.js');
declare var $: any;
import { DateFormatService, NotificationService } from '@core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
})
export class DashboardComponent implements OnInit {
  loading = false;
  error = '';
  batchData: any[] = [];
  colorArray = [
    '#0862B1',
    '#f44336',
    '#008f9a',
    '#B71C54',
    '#008f9a',
    '#F0F4C3',
    '#0385FF',
    '#304FFE',
    '#2BB497',
    '#D8939A',
    '#00B8D4',
    '#9C27B0',
    '#4A148C',
  ];

  constructor(private dateFormat: DateFormatService, private notify: NotificationService) {
    // this.onDateChangeChart(this.qChart.range);
  }
  ngOnInit(): void {
    // throw new Error('Method not implemented.');
  }

  ngAfterViewInit(): void {
    //this.build();
  }
  // loadbatchData(): void {
  //   this.loading = true;
  //   this.batchSrv
  //     .getBatch()
  //     .then((res) => {
  //       if (res.status == 'FAILED') {
  //         this.loading = false;
  //         this.error = res.error;
  //       }
  //       this.batchData = res.data.batches;
  //       let sample: any = {
  //         column: [],
  //         line: [],
  //         area1: [],
  //         area2: [],
  //       };
  //       this.batchData.forEach((e: any) => {
  //         sample.column.push({ label: e?.product?.title, y: e?.scanned_items });
  //         sample.line.push({ x: e?.product?._title, y: e?.size });
  //         sample.area1.push({ x: e?.product?._title, y: e?.items_with_promo });
  //         sample.area2.push({ x: e?.product?._title, y: e?.items_redeemed });
  //       });
  //       this.build(sample);

  //       this.loading = false;
  //     })
  //     .catch((err) => {
  //       this.loading = false;
  //       this.notify.error('', err);
  //     });
  // }

  // build(sample: any) {
  //   CanvasJS.addColorSet('rekodTheme', this.colorArray);
  //   console.log(sample);
  //   var chart = new CanvasJS.Chart('batchChart', {
  //     colorSet: 'rekodTheme',
  //     animationEnabled: false,
  //     theme: 'light2',
  //     title: {
  //       text: 'Product Overview',
  //     },
  //     axisX: {
  //       //valueFormatString: 'MMM',
  //     },
  //     axisY: {
  //       //prefix: '$',
  //       // labelFormatter: addSymbols
  //     },
  //     toolTip: {
  //       shared: true,
  //     },
  //     legend: {
  //       cursor: 'pointer',
  //       // itemclick: toggleDataSeries
  //     },
  //     data: [
  //       {
  //         type: 'column',
  //         name: 'Products',
  //         showInLegend: true,
  //         toolTipContent: '<b>Total Scan Products: {y}</b>',
  //         yValueFormatString: '#,##0',
  //         dataPoints: sample?.column,
  //       },
  //       {
  //         type: 'line',
  //         name: 'Products',
  //         toolTipContent: '<b>Product Name: {label} <br>Product Size: {y}</b>',
  //         yValueFormatString: '#,##0',
  //         dataPoints: sample?.line,
  //       },
  //       {
  //         type: 'area',
  //         name: 'Products',
  //         markerBorderColor: 'white',
  //         markerBorderThickness: 2,
  //         toolTipContent: '<b>Total Promo on Products: {y}</b>',
  //         yValueFormatString: '#,##0',
  //         dataPoints: sample?.area1,
  //       },
  //       {
  //         type: 'area',
  //         name: 'Products',
  //         markerBorderColor: 'brown',
  //         markerBorderThickness: 2,
  //         toolTipContent: '<b>Total Scanned Products with Promo: {y}</b>',
  //         yValueFormatString: '#,##0',
  //         dataPoints: sample?.area2,
  //       },
  //     ],
  //   });
  //   chart.render();
  // }
  // ngOnInit(): void {
  //   this.loadbatchData();
  // }
}
