import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';

@Component({
  selector: 'app-pause-dialog',
  templateUrl: './pause-dialog.component.html',
  styleUrls: ['./pause-dialog.component.scss']
})
export class PauseDialogComponent implements OnInit {

  constructor(private router: Router,
              public dialogRef: MatDialogRef<PauseDialogComponent>,
              @Inject(MAT_DIALOG_DATA) public data) { }


  ngOnInit() {}
}
