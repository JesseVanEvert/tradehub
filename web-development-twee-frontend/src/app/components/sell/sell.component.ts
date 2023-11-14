import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Category } from 'src/app/interfaces/category';
import { SellProduct } from 'src/app/interfaces/sell-product';
import { CategoryService } from 'src/app/services/category-service.service';
import { ProductService } from 'src/app/services/product-service.service';
import { SellPopupComponent } from '../global/sell-popup/sell-popup.component';
import { ErrorComponent } from '../global/error/error.component';
import { Router } from '@angular/router';
import { CategoryPopupComponent } from '../global/category-popup/category-popup.component';

@Component({
  selector: 'app-sell',
  templateUrl: './sell.component.html',
  styleUrls: ['./sell.component.scss']
})
export class SellComponent {
  categories: Category[] = [];
  product: SellProduct = {} as SellProduct;
  newCategory: Category = {} as Category; 

  constructor(private categoryService: CategoryService, private productService: ProductService, private dialog: MatDialog) { }

  ngOnInit(): void {
    this.categoryService.getAllCategories().subscribe((categories) => this.categories = categories);
  }

  storeProduct() {
    this.product.user_id = Number(localStorage.getItem('userId'));
    console.log(this.product.category_id);
    this.productService.storeProduct(this.product).subscribe( {
      next: () => {},
      error: (err) => {
        this.dialog.open(ErrorComponent);
        console.log(err);
      },
      complete: () => { this.dialog.open(SellPopupComponent)}
    });
  }

  storeCategory() {

    this.categoryService.storeCategory(this.newCategory).subscribe({
      next: () => {},
      error: (err) => this.dialog.open(ErrorComponent),
      complete: () => { 
        this.categoryService.getAllCategories().subscribe((categories) => this.categories = categories); 
        this.dialog.open(CategoryPopupComponent)
      }
    });
  }

  updateCategoryId(event: any) {
    this.product.category_id = event.target.value;
  }
}
