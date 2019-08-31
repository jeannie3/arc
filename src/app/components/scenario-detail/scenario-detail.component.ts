import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router, ActivatedRoute } from '@angular/router';
import { ScenarioDetailDialogComponent } from '../scenario-detail-dialog/scenario-detail-dialog';

@Component({
  selector: 'app-scenario-detail',
  templateUrl: './scenario-detail.component.html',
  styleUrls: ['./scenario-detail.component.scss']
})
export class ScenarioDetailComponent implements OnInit {

  private scenarioId: number;

  constructor(public dialog: MatDialog, private router: Router, private route: ActivatedRoute) {
    this.openDialog();
  }

  openDialog(): void {
    this.route.params.subscribe(params => {
      this.scenarioId = +params.id;
    });
    const dialogRef = this.dialog.open(ScenarioDetailDialogComponent, {
      data: {
        id: this.scenarioId
      },
      width: '1000px',
      height: '600px'
    });
    dialogRef.afterClosed().subscribe(result => {
      this.router.navigate(['/']);
    });
  }

  ngOnInit() {
  }

}
