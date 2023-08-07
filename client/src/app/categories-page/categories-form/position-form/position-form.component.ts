import { AfterViewInit, Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { response } from 'express';
import { MaterialInstance, MaterialService } from 'src/app/shared/classes/material.service';
import { Position } from 'src/app/shared/interface';
import { PositionServise } from 'src/app/shared/servises/position.servise';

@Component({
  selector: 'app-position-form',
  templateUrl: './position-form.component.html',
  styleUrls: ['./position-form.component.css']
})
export class PositionFormComponent implements OnInit, OnDestroy, AfterViewInit{

  @Input('categoryId') 
    categoryId!: string
  @ViewChild('modal')
    modalRef!: ElementRef
  
  positions: Position[] = []
  loading = false
  modal!: MaterialInstance
  form!: FormGroup
  positionId?: string = ''

  
  constructor(private positionServise: PositionServise) {

  }

  ngOnInit(){
    this.form = new FormGroup({
      name: new FormControl(null, Validators.required),
      cost: new FormControl(null, [Validators.required, Validators.min(1)])
    })

    this.loading = true
    this.positionServise.fetch(this.categoryId).subscribe(
       positions => {
        this.positions = positions
        this.loading = false 
       }
    )
  }

  ngOnDestroy() {
    this.modal.destroy?.()
  }

  ngAfterViewInit() {
    this.modal = MaterialService.initModal(this.modalRef)
  }

  onSelectPosition(position: Position) {
    this.positionId = position._id
    this.form.patchValue({
      name: position.name,
      cost: position.cost
    })
    this.modal.open?.()
    MaterialService.updateTextImputs()
  }

  onAddPosition() { 
    this.positionId = 'isNew'
    this.form.reset({
      name: null,
      cost: 1
    })
    this.modal.open?.()
    MaterialService.updateTextImputs()
  }

  onCancel() {
    this.modal.close?.()
  }

  onSubmit() {
    this.form.disable()

    const position: Position = {
      name: this.form.value.name,
      cost: this.form.value.cost,
      category: this.categoryId
    }

    if (this.positionId !== 'isNew') {
      position._id = this.positionId 
      this.positionServise.update(position).subscribe(
        position => {
          const idx = this.positions.findIndex(p => p._id === position._id)
          this.positions[idx] = position
          MaterialService.toast('Позиция сохранены.') 
        },
        error => {
          this.form.enable()
          MaterialService.toast(error.error.Error)
        },
        () => {
          this.modal.close?.()
          this.form.reset({name: '', cost: '1'})
          this.form.enable()
        })
    } else {
      this.positionServise.create(position).subscribe(
        position => {
          MaterialService.toast('Позиция создана.')
          this.positions.push(position)
        },
        error => {
          this.form.enable()
          MaterialService.toast(error.error.Error)
        },
        () => {
          this.modal.close?.()
          this.form.reset({name: '', cost: '1'})
          this.form.enable()
        }
      )
    }
  }

  onDeletePosition(event: Event,  position: Position) {
    event.stopPropagation()
    const decision = window.confirm(`Удалить позицию "${position.name}"?`)

    if (decision) {
      this.positionServise.delete(position).subscribe(
        response => {
          const idx = this.positions.findIndex(p => p._id === position._id)
          this.positions.splice(idx, 1)
          MaterialService.toast('Позиция удалена.')
        },
        error => {
          MaterialService.toast(error.error.Error)
        }
      )
    }
  }

}
