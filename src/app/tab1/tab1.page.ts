import { Component, OnInit, ViewChild, ElementRef, Injectable } from '@angular/core';
import { TraineeService } from '../trainee.service';
import * as XLSX from 'xlsx';
import * as FileSaver from 'file-saver';

@Component({
  selector: 'app-tab1',
  templateUrl: 'tab1.page.html',
  styleUrls: ['tab1.page.scss']
})
export class Tab1Page {

  /**
   * stores each user data object separately
   * @type {any}
   */
  collection: any;

  /**
   * decorator for referencing template details
   * @type {TABLE}
   */
  @ViewChild('TABLE', { static: false }) TABLE: ElementRef;

  /**
   * @constructor
   * @param {TraineeService} trainee - The trainee service.
   */
  constructor(private trainee: TraineeService) {
  }
  /**
   * On each run, invokes to get data from server to this.collection object
  */
  ngOnInit(): void {
    this.trainee.getList().subscribe((result) => {
      console.warn(result);
      this.collection = result;
    });
  }
  /**
   * exports data to the excell format
   * @param {void}
   */
  ExportTOExcel() {
    this.exportAsExcelFile(this.collection, 'sample');
  }

  EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
  EXCEL_EXTENSION = '.xlsx';

  public exportAsExcelFile(json: any[], excelFileName: string): void {
    const worksheet: XLSX.WorkSheet = XLSX.utils.json_to_sheet(json);
    const workbook: XLSX.WorkBook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
    const excelBuffer: any = XLSX.write(workbook, { bookType: 'xlsx', type: 'array' });
    this.saveAsExcelFile(excelBuffer, excelFileName);
  }
  private saveAsExcelFile(buffer: any, fileName: string): void {
    const data: Blob = new Blob([buffer], { type: this.EXCEL_TYPE });
    FileSaver.saveAs(data, fileName + '_export_' + new Date().getTime() + this.EXCEL_EXTENSION);
  }

  expandOrCollapseRow(listIndex: number): void {
    const dummyObj = this.collection[listIndex];

    // reset (collapses all objects in the array)
    this.collection = this.collection.map(dummyObject => ({
      ...dummyObject,
      expanded: false
    }));

    // expands only the dummyObject clicked
    this.collection[listIndex] = {
      ...dummyObj,
      expanded: !dummyObj.expanded
    }
  }


}
