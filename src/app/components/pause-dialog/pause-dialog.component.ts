import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { ScenarioService } from '../../services/scenario.service';



@Component({
  selector: 'app-pause-dialog',
  templateUrl: './pause-dialog.component.html',
  styleUrls: ['./pause-dialog.component.scss']
})
export class PauseDialogComponent implements OnInit {

constructor(private router: Router, public dialogRef: MatDialogRef<PauseDialogComponent>, private scenarioService: ScenarioService,@Inject(MAT_DIALOG_DATA) public data) { }

restart(): void {
    this.dialogRef.close();
    this.scenarioService.getRoles('1').subscribe( roles => {
      roles.forEach(role => {
        if(this.data.roleId == role.id){
            this.router.navigate([this.data.roleId + '/scene/' + role.first_scene_id]);
        }
      });
    });
}

exit(): void {
    this.dialogRef.close();
    this.router.navigate(['/role']);
}

close(): void {
    this.dialogRef.close();
}

    

ngOnInit() {
}

}
