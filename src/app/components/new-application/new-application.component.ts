import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { ClrWizard } from "@clr/angular";
import { Injectable } from '@angular/core'

@Component({
  selector: 'app-new-application',
  templateUrl: './new-application.component.html',
  styleUrls: ['./new-application.component.scss']
})

export class NewApplicationComponent implements OnInit {

  constructor(
    // private wiz: AppWizard
  ) { }
  @Input() creatingApplication: boolean
  @Output() creatingApplicationNew = new EventEmitter<boolean>()

  ngOnInit() {
  }

  blank(input: string) {
    return input.length <= 0
  }

   toggle() {
    this.creatingApplication = !this.creatingApplication
    console.log('creatingApplication', this.creatingApplication)
    this.creatingApplicationNew.emit(this.creatingApplication)
  }

  closeWizard () {
    this.creatingApplication = false
    this.creatingApplicationNew.emit(false)
  }
}