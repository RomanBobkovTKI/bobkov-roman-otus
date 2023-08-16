import { Component, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { AuthService } from '../../servises/auth.servise';
import { Router } from '@angular/router';
import { MaterialService } from '../../classes/material.service';

@Component({
  selector: 'app-site-layout',
  templateUrl: './site-layout.component.html',
  styleUrls: ['./site-layout.component.css']
})
export class SiteLayoutComponent {

  @ViewChild('floating') floatingRef: ElementRef | undefined

  constructor(private auth: AuthService,
              private router: Router) {
  }

  links = [
    {url: '/overview', name: 'Обзор'},
    {url: '/history', name: 'История'},
    {url: '/order', name: 'Добавить заказ'},
    {url: '/categories', name: 'Ассортимент'}
  ]

  logout(event: Event) {
    event.preventDefault()
    this.auth.logout()
    this.router.navigate(['/login'])
  }

  ngAfterViewInit() {
    MaterialService.initiaLizeFloatingButton(this.floatingRef)
  }

}
