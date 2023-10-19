import { Injectable } from "@angular/core";
import { OrderPosition, Position } from "../shared/interface";

@Injectable( )
export class OrderServise {

    public list: OrderPosition[] = []
    public price: any = 0

    add(position: Position) {
        const orderPosition: OrderPosition = Object.assign({}, {
            name: position.name,
            cost: position.cost,
            quantity: position.quantity,
            _id: position._id
        })

        const candidate = this.list.find(p => p._id === position._id)
            
        if (candidate?.quantity && orderPosition?.quantity) {
            candidate.quantity += orderPosition.quantity
        } else {
            this.list.push(orderPosition)
        }

        this.computePrice()
    }

    remove(orderPosition: OrderPosition) {
        const idx = this.list.findIndex(p => p._id === orderPosition._id)
        this.list.splice(idx, 1)
        this.computePrice()
    }

    clear() {
        this.list = []
        this.price = 0
    }

    public computePrice() {    
        this.price = this.list.reduce((total, item) => {
            return total += (item.quantity || 0) * (item.cost || 0)
        }, 0)
    }

}