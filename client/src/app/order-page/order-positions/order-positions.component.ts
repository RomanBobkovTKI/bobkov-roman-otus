import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { Observable, map, switchMap } from 'rxjs';
import { Position } from 'src/app/shared/interface';
import { PositionServise } from 'src/app/shared/servises/position.servise';
import { OrderServise } from '../order.servise';
import { MaterialService } from 'src/app/shared/classes/material.service';

@Component({
  selector: 'app-order-positions',
  templateUrl: './order-positions.component.html',
  styleUrls: ['./order-positions.component.css']
})
export class OrderPositionsComponent implements OnInit{

  position$!: Observable<Position[]>
  
  constructor(private http: HttpClient,
              private route: ActivatedRoute,
              private positionService: PositionServise,
              private orderServise: OrderServise) {

  }

  ngOnInit(): void {
    this.position$ = this.route.params
      .pipe(
        switchMap(
          (params: Params) => {
            return this.positionService.fetch(params['id'])
          }
        )
      ),
      map(
        (position: Position[]) => {
          return position.map(position => {
            position.quantity = 1
            return position
          })
        }
      )
  }

  addToOrder(position: Position) {
    MaterialService.toast(`Позиция добавлена.`)
    this.orderServise.add(position)
  }
}
