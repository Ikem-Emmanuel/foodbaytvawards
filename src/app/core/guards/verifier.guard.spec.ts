import { TestBed } from "@angular/core/testing";

import { VerifierGuard } from "./verifier.guard";

describe("VerifierGuard", () => {
  let guard: VerifierGuard;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    guard = TestBed.inject(VerifierGuard);
  });

  it("should be created", () => {
    expect(guard).toBeTruthy();
  });
});
