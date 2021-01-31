import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-output-capture',
  templateUrl: './output-capture.component.html',
  styleUrls: ['./output-capture.component.css']
})
export class OutputCaptureComponent implements OnInit {

  output:String = "Hi world";

  constructor() { }

  getCapture() {

    console.log(" output ==",this.output);
  }

  ngOnInit(): void {
  }

}
