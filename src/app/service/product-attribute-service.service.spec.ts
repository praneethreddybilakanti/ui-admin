import { TestBed } from '@angular/core/testing';

import { ProductAttributeServiceService } from './product-attribute-service.service';

describe('ProductAttributeServiceService', () => {
  let service: ProductAttributeServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ProductAttributeServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
