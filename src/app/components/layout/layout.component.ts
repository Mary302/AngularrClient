import { Component, OnInit } from '@angular/core';
import { ResizeEvent} from 'angular-resizable-element';



@Component({
  selector: 'app-layout',
  templateUrl: './layout.component.html',
  styleUrls: ['./layout.component.css']
})
export class LayoutComponent implements OnInit {
  public startRect;
  public style: Object = {};
  public validate: boolean;
  

  constructor() { 
    // this.validate = function(event: ResizeEvent): boolean {
      
    // const MIN_DIMENSIONS_PX: number = 50;
    // if (event.rectangle.width < MIN_DIMENSIONS_PX || event.rectangle.height < MIN_DIMENSIONS_PX) {
    //   return false;
    // }
  
    // if (this.startRect) {
    //   const widthDiff = event.rectangle.width - this.startRect.width;
    //   event.rectangle.height = this.startRect.height + widthDiff;
    //   event.rectangle.bottom = this.startRect.bottom + widthDiff;
    // }
  
    // return true;
    
  // }
  // .bind(this);
 
 }

  ngOnInit(): void {
  }

  // onResizeStart(event: ResizeEvent): void {
  //   this.startRect = event.rectangle;
  // }

  // onResizeEnd(event: ResizeEvent): void {
  //   this.style = {
  //     position: 'fixed',
  //     left: `${event.rectangle.left}px`,
  //     top: `${event.rectangle.top}px`,
  //     width: `${event.rectangle.width}px`,
  //     height: `${event.rectangle.height}px`
  //   };
  // }
  
}
