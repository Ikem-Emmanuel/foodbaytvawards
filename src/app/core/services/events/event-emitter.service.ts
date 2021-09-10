import { Injectable } from "@angular/core";
import { Observable, Subject } from "rxjs";

@Injectable({
  providedIn: "root",
})
export class EventEmitterService {
  private reloadVerification = new Subject<any>();
  reloadData(reload: string) {
    this.reloadVerification.next({ text: reload });
  }

  reloadverificationTable(): Observable<any> {
    return this.reloadVerification.asObservable();
  }

  constructor() {}
}
