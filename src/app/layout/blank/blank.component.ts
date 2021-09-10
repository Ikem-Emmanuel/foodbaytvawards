import { Component } from '@angular/core';

@Component({
  selector: 'layout-blank',
  template: `<router-outlet></router-outlet> `,
  // tslint:disable-next-line: no-host-metadata-property
  host: {
    '[class.alain-blank]': 'false',
  },
})
export class LayoutBlankComponent {}
