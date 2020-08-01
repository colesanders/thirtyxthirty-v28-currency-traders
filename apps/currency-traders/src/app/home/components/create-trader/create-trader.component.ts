import { Component, OnInit, Inject} from '@angular/core';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import { CurrencyTrader } from '@thirty/api-interfaces';

@Component({
  selector: 'thirty-create-trader',
  templateUrl: './create-trader.component.html',
  styleUrls: ['./create-trader.component.scss']
})
export class CreateTraderComponent implements OnInit {
  constructor(
    public dialogRef: MatDialogRef<CreateTraderComponent>
  ) {}

  ngOnInit(): void {
  }

  save(currencyTrader){
    this.dialogRef.close(currencyTrader);
  }

  cancel(){
    this.dialogRef.close();
  }
}