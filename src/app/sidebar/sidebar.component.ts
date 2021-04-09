import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {

  accounts = [{
    id: '01',
    name: 'Paris Saint Germain',
    tag: 'PSG_Inside'
  },
  {
    id: '02',
    name: 'FC Barcelona',
    tag: 'FCBarcelona'
  },
  {
    id: '03',
    name: 'Lionel Messi',
    tag: 'LeoMessi'
  },{
    id:'606afee0577495b23ca5838c',
    name: 'Jeremy',
    tag: 'jeremy'
  }]
  

  constructor() { }

  ngOnInit(): void {
  }

}
