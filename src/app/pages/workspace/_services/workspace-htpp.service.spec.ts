import { TestBed } from '@angular/core/testing';

import { WorkspaceHtppService } from './workspace-htpp.service';

describe('WorkspaceHtppService', () => {
  let service: WorkspaceHtppService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(WorkspaceHtppService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
