import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-two-options-dialog',
  templateUrl: './two-options-dialog.component.html',
  styleUrls: ['./two-options-dialog.component.scss']
})
export class TwoOptionsDialogComponent implements OnInit {

  constructor(
    public dialogRef: MatDialogRef<TwoOptionsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data) {}

  ngOnInit() {
  }

}
