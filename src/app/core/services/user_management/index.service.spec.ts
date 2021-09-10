import { TestBed } from "@angular/core/testing";

import { UserManagementPasswordService } from "./index.service";

describe("UserManagementPasswordService", () => {
  let service: UserManagementPasswordService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(UserManagementPasswordService);
  });

  it("should be created", () => {
    expect(service).toBeTruthy();
  });
});
