import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-path-card',
  templateUrl: './path-card.component.html',
  styleUrls: ['./path-card.component.scss']
})
export class PathCardComponent implements OnInit {

  @Input() path: any;

  constructor() { }

  ngOnInit(): void {
  }

}
