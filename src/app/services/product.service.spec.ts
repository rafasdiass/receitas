import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';

import { ProductService } from './product.service';

describe('ProductService', () => {
  let service: ProductService;
  let httpMock: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [ProductService]
    });

    service = TestBed.get(ProductService);
    httpMock = TestBed.get(HttpTestingController);
  });

  afterEach(() => {
    httpMock.verify();
  });

  it('should store the product ID after creation', () => {
    const mockProductResponse = { id: '123', name: 'Test', description: 'Test Description' };

    service.createProduct(mockProductResponse).subscribe(response => {
      service.setCreatedProductId(response.id);
      expect(service.getCreatedProductId()).toEqual('123');
    });

    const req = httpMock.expectOne(`http://localhost:3333/produto`);
    expect(req.request.method).toBe('POST');
    req.flush(mockProductResponse);
  });
});
