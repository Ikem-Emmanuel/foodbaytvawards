import { Injectable } from '@angular/core';

@Injectable({
    providedIn: 'root'
  })
  export class DateFormatService {
  
    constructor() { }

     formatDate(date: string) {
        let d: any;
        let month: any;
        let day: any;
        let year: any;
        d = new Date(date);
        month = "" + (d.getMonth() + 1);
        day = "" + d.getDate();
        year = d.getFullYear();

        if (month.length < 2) month = "0" + month;
        if (day.length < 2) day = "0" + day;

        return [year, month, day].join("-");
    }


}
