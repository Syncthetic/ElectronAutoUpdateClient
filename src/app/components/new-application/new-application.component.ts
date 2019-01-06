import { Component, OnInit, Input, ViewChild } from '@angular/core';
import { ClrWizard } from "@clr/angular";
import { ApplicationService, Application } from '../../services/application/application.service'

@Component({
  selector: 'app-new-application',
  templateUrl: './new-application.component.html',
  styleUrls: ['./new-application.component.scss']
})

export class NewApplicationComponent implements OnInit {
  constructor(
    private apps: ApplicationService
  ) { }

  @ViewChild("wizard") wizard: ClrWizard
  public _open: boolean = false;
  public creatingApplication: boolean = false
  public model: Application = {
    name: '',
    version: '',
    download: '',
    additionalInfo: {}
  }

  ngOnInit() {
  }

  open() {
    this._open = !this._open
  }

  updateModel(property: string, val: string): void {
    this.model[property] = val
  }

  updateAdditionalInfo(property: string, val: string): void {
    console.log('Should set ' + property + ' to ' + val, this.model)
    this.model.additionalInfo[property] = val
  }

  removeAdditionalInfo(property: string, val: string): void {
    delete this.model.additionalInfo[property]
  }

  additionalPropertiesExist (): boolean {
    return Object.keys(this.model.additionalInfo).length > 0
  }

  blank(input: string) {
    return input.length <= 0
  }

  createApplication(name: string, version: string, download: string) {
    const app = this.model
    console.log('Should create app', app)
    this.apps.createApplication(app)
    this.wizard.reset()
  }

  resetWizard () {
    this.wizard.reset()
  }
}