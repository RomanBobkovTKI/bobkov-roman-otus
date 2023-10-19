import { Component, ElementRef, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { of, switchMap } from 'rxjs';
import { MaterialService } from 'src/app/shared/classes/material.service';
import { Category } from 'src/app/shared/interface';
import { CategoriesServise } from 'src/app/shared/servises/categories.servise';


@Component({
  selector: 'app-categories-form',
  templateUrl: './categories-form.component.html',
  styleUrls: ['./categories-form.component.css']
})
export class CategoriesFormComponent {

  @ViewChild('input') inputRef!: ElementRef;
  isNew = true
  image?: File
  imagePreview: any
  category?: Category
  form: FormGroup = new FormGroup({
    name: new FormControl(null, Validators.required)
  });

  constructor(private route: ActivatedRoute,
              private categoriesServise: CategoriesServise,
              private router: Router) {

  }

  ngOnInit() {

    this.form.disable()
    
    this.route.params.pipe(
      switchMap((params: Params) => {
        if( params['id']) {
          this.isNew = false
          return this.categoriesServise.getById(params['id'])
        }
        
        return of(null)
      })
    ).subscribe(
      (category) => {
        if (category) {
          this.category = category
          this.form.patchValue({
            name: category.name
          })
          this.imagePreview = category.imageSrc
          MaterialService.updateTextImputs()
        }

        this.form.enable()
      },
      error => MaterialService.toast(error.error.Error))

  }

  triggerClick() {
    this.inputRef.nativeElement.click()
  }

  onFileUpload(event: any) {
    const file = event.target.files[0]
    this.image = file

    const reader = new FileReader()

    reader.onload = () => {
      this.imagePreview = reader.result
    }

    reader.readAsDataURL(file)
  }

  onSubmit() {
    let obs$
    this.form.disable()

    if (this.isNew) {
      obs$ = this.categoriesServise.create(this.form.value.name, this.image)
    } else {
      obs$ = this.categoriesServise.update(this.category?._id, this.form.value.name, this.image)
    }

    obs$.subscribe(
      category => {
        this.category = category
        MaterialService.toast('Изменения сохранены')
        this.form.enable()
      },
      error => {
        MaterialService.toast(error.error.Error)
        this.form.enable()
      }
    )
  }

  deleteCategory() {
    const decision = window.confirm(`Вы уверены что хотите удалить категорию ${this.category?.name}?`)

    if (decision) {
      this.categoriesServise.delete(this.category?._id)
        .subscribe(
          response => MaterialService.toast(response.message),
          error => MaterialService.toast(error.error.Error),
          () => this.router.navigate(['/categories'])
        )
    }
  }

}
