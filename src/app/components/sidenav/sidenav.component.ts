import { Component, OnInit } from '@angular/core';
import { ApplicationService } from '../../services/application/application.service'

@Component({
  selector: 'app-sidenav',
  templateUrl: './sidenav.component.html',
  styleUrls: ['./sidenav.component.scss']
})
export class SidenavComponent implements OnInit {

  constructor(
    public apps: ApplicationService
  ) { }

  ngOnInit() {
  }

}
