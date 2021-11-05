import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { ProductPanelComponent } from './product-panel.component';
import { NgbDate, NgbDateAdapter, NgbModule } from '@ng-bootstrap/ng-bootstrap';
import { NgbDateStruct } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule } from '@angular/forms';

	function stringToDate(_date: any, _format: string, _delimiter: string) {
		const formatLowerCase = _format.toLowerCase();
		const formatItems = formatLowerCase.split(_delimiter);
		const dateItems = _date.split(_delimiter);
		const monthIndex = formatItems.indexOf('mm');
		const dayIndex = formatItems.indexOf('dd');
		const yearIndex = formatItems.indexOf('yyyy');
		let month = parseInt(dateItems[monthIndex], 10);
		month -= 1;
		const formatedDate = new Date(dateItems[yearIndex], month, dateItems[dayIndex]);
		return formatedDate;
	}

describe('ProductPanelComponent', () => {
  let component: ProductPanelComponent;
  let fixture: ComponentFixture<ProductPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProductPanelComponent ],
      imports: [RouterTestingModule, HttpClientTestingModule, NgbModule, FormsModule],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ProductPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    // Definir variables necesarias para el funcionamiento de la página.
    const trackingNo = 'CL-hl5vye51qn';
    component.clientNick = 'Corn';
    component.trackingNumber = trackingNo;
    component.getProducts(trackingNo);
    const date = new Date();
    const ngbDate = { day: date.getUTCDay(), month: date.getUTCMonth(), year: date.getUTCFullYear()};
    component.datePickerOut = ngbDate;
  });

  it('agregar producto sin nombre', () => {
    component.insertProduct();
    expect(component.isSuccess).toBe(false);
  });

  it('agregar producto con precio vacío', () => {
    // eslint-disable-next-line no-underscore-dangle
    component.newProduct.name_ = 'producto prueba 1';
    component.newProduct.price = null;
    expect(component.isSuccess).toBe(false);
  });

  it('agregar producto con precio negativo', () => {
    // eslint-disable-next-line no-underscore-dangle
    component.newProduct.name_ = 'producto prueba 2';
    component.newProduct.price = -1;
    expect(component.isSuccess).toBe(false);
  });

  it('agregar producto sin enlace', () => {
    // eslint-disable-next-line no-underscore-dangle
    component.newProduct.name_ = 'producto prueba 3';
    component.newProduct.price = 3;
    component.newProduct.quantity = 1;
    component.newProduct.hyperlink = '';

    component.insertProduct();
    expect(component.hasError).toBe(false);
  });

  it('agregar producto con enlace', () => {
    // eslint-disable-next-line no-underscore-dangle
    component.newProduct.name_ = 'producto prueba 4';
    component.newProduct.price = 3;
    component.newProduct.quantity = 1;
    component.newProduct.hyperlink = 'https://www.google.com';

    component.insertProduct();
    expect(component.hasError).toBe(false);
  });
});
