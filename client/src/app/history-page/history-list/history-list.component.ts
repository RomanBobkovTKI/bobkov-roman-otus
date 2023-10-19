import { AfterViewInit, Component, ElementRef, Input, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { MaterialInstance, MaterialService } from 'src/app/shared/classes/material.service';
import { Order } from 'src/app/shared/interface';

@Component({
  selector: 'app-history-list',
  templateUrl: './history-list.component.html',
  styleUrls: ['./history-list.component.css']
})
export class HistoryListComponent implements OnInit, OnDestroy, AfterViewInit{
  @Input() 
    orders?: Order[]

  @ViewChild('modal')
    modalRef!: ElementRef

  modal?: MaterialInstance
  selectedOrder?: Order

  computePrice(order: Order): number {
    return order.list.reduce((total, item) => {
      return total += (item.quantity || 0) * (item.cost || 0)
  }, 0)
  }

  selectOrder(order: Order) {
    this.selectedOrder = order
    this.modal?.open?.()
  }

  ngOnInit(): void {
  }

  ngAfterViewInit(): void {
    this.modal = MaterialService.initModal(this.modalRef)
  }

  ngOnDestroy(): void {
    this.modal?.destroy?.()
  }

  closeModal() {
    this.modal?.close?.()
  }

}
