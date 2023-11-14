import { Component } from '@angular/core';
import { SoldProduct } from 'src/app/interfaces/sold-product';
import { ProductService } from 'src/app/services/product-service.service';

@Component({
  selector: 'app-history',
  templateUrl: './history.component.html',
  styleUrls: ['./history.component.scss']
})
export class HistoryComponent {
  soldProducts: SoldProduct[] = [];

  constructor(private productService: ProductService) { }

  ngOnInit(): void {
    this.productService.getSoldProductsByUserId().subscribe((soldProducts) => this.soldProducts = soldProducts);
  }
}
