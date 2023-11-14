import { Component } from '@angular/core';
import { Category } from 'src/app/interfaces/category';
import { Product } from 'src/app/interfaces/product';
import { CategoryService} from 'src/app/services/category-service.service';
import { PaymentPopupComponent } from '../global/payment-popup/payment-popup.component';
import { MatDialog } from '@angular/material/dialog';
import { ProductService } from 'src/app/services/product-service.service';
import { BuyProduct } from 'src/app/interfaces/buy-product';
import { ErrorComponent } from '../global/error/error.component';

@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss']
})
export class CategoriesComponent {
  categories: Category[] = [];
  products: Product[] = [];
  quantity: number = 1;

  constructor(private categoryService: CategoryService, private dialog: MatDialog, private productService: ProductService) { }

  ngOnInit(): void {
    this.categoryService.getAllCategories().subscribe((categories) => this.categories = categories);
    this.productService.getAllProducts().subscribe((products) => this.products = products);
  }

  showProductsByCategory(categoryId: number) {
    this.categoryService.getProductsByCategory(categoryId).subscribe((products) => this.products = products);
  }

  buyProduct(productId: number, sellerId: number) {
    
    let buyProduct:BuyProduct = {
      product_id: productId,
      seller_id: sellerId,
      buyer_id: Number(localStorage.getItem('userId')),
      quantity_bought: this.quantity,
      quantity_sold: 0
    }

    this.productService.buyProduct(buyProduct).subscribe( {
      next: () => {},
      error: (err) => {
        console.log(err);
        this.dialog.open(ErrorComponent);
      },
      complete: () => { this.dialog.open(PaymentPopupComponent)}
    });
  }

  sortProductsByPriceLowestToHighest() {
    this.products.sort((a, b) => a.price - b.price);
  }

  sortProductsByPriceHighestToLowest() {
    this.products.sort((a, b) => b.price - a.price);
  }

  showAllProducts() {
    this.productService.getAllProducts().subscribe((products) => this.products = products);
  }
}
