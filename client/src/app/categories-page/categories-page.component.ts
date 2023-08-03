import { Component } from '@angular/core';
import { CategoriesServise } from '../shared/servises/categories.servise';
import { Category } from '../shared/interface';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-categories-page',
  templateUrl: './categories-page.component.html',
  styleUrls: ['./categories-page.component.css']
})

export class CategoriesPageComponent {

  
  categories$!: Observable<Category[]>;

  constructor(private categoriesServise: CategoriesServise) {

  }

  ngOnInit() {
    this.categories$ = this.categoriesServise.fetch()
  }

}
