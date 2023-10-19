import { AfterViewInit, Component, ElementRef, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { MaterialInstance, MaterialService } from '../shared/classes/material.service';
import { OrderServise} from './order.servise';
import { Order, OrderPosition } from '../shared/interface';
import { OrdersServise } from '../shared/servises/order.service';

@Component({
  selector: 'app-order-page',
  templateUrl: './order-page.component.html',
  styleUrls: ['./order-page.component.css'],
  providers: [OrderServise]
})
export class OrderPageComponent implements OnInit, OnDestroy, AfterViewInit{

  @ViewChild('modal') 
    modalRef!: ElementRef

  isRoot!: boolean
  modal!: MaterialInstance
  panding: boolean = false

  constructor(private router: Router,
              public order: OrderServise,
              private ordersService: OrdersServise) {

  }

  ngOnInit(): void {
    this.isRoot = this.router.url === '/order'
    this.router.events.subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.isRoot = this.router.url === '/order'
      }
    })
  }

  ngAfterViewInit(): void {
    this.modal = MaterialService.initModal(this.modalRef)
  }

  ngOnDestroy(): void {
    this.modal.destroy?.()
  }

  open() {
    this.modal.open?.()
  }

  cancel() {
    this.modal.close?.()
  }

  submit() {
    this.panding = true

    const order: Order = {
      list: this.order.list.map(item => {
        delete item._id
        return item
      })
    }

    this.ordersService.create(order).subscribe(
      order => {
        MaterialService.toast(`Заказ №${order.order} создан.`)
        this.order.clear()
      },
      error => {
        MaterialService.toast(error.error.Error)
      },
      () => {
        this.modal.close?.()
        this.panding = false
      }
    )
  }

  removePosition(orderPosition: OrderPosition) {
    this.order.remove(orderPosition)
  }

}
