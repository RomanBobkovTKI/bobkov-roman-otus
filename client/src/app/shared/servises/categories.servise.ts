import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Category } from "../interface";
import { Observable } from "rxjs";

@Injectable({
    providedIn: 'root'
})

export class CategoriesServise {

    constructor(private http: HttpClient) {

    }

    fetch(): Observable<Category[]> {
        return this.http.get<Category[]>('/api/category')
    }
}