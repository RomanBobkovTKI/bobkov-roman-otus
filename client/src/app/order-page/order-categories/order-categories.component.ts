import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { Category } from 'src/app/shared/interface';
import { CategoriesServise } from 'src/app/shared/servises/categories.servise';

@Component({
  selector: 'app-order-categories',
  templateUrl: './order-categories.component.html',
  styleUrls: ['./order-categories.component.css']
})
export class OrderCategoriesComponent implements OnInit {

  categories$!: Observable<Category[]>

  constructor(private categoriesServise: CategoriesServise) {
    
  }

  ngOnInit(): void {
    this.categories$ = this.categoriesServise.fetch()
  }

}
