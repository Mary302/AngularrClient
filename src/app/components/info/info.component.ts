import { Component, OnInit } from '@angular/core';
import { UsersService} from '../../services/users.service'

@Component({
  selector: 'app-info',
  templateUrl: './info.component.html',
  styleUrls: ['./info.component.css']
})
export class InfoComponent implements OnInit {

  constructor(
    public usersService :UsersService,
  ) { }

  ngOnInit(): void {
  }

}
