import { Component, OnDestroy, OnInit } from '@angular/core';
import { ChartType } from 'chart.js';
import { MultiDataSet, Label } from 'ng2-charts';
import { MainService } from '../service/main.service';
import { interval } from 'rxjs';

@Component({
  selector: 'app-controller',
  templateUrl: './controller.component.html',
  styleUrls: ['./controller.component.css']
})
export class ControllerComponent implements OnInit, OnDestroy {
  private UPDATE_INTERVAL = 1000;
  public isLedOn;
  private intervalSubscription;

  doughnutChartLabels: Label[] = ['BMW', 'Ford', 'Tesla'];
  doughnutChartData: MultiDataSet = [
    [55, 25, 20]
  ];
  doughnutChartType: ChartType = 'doughnut';

  constructor(private service: MainService) {
  }

  ngOnInit(): void {
    this.getData();   // speeding thigns up
    this.intervalSubscription = interval(this.UPDATE_INTERVAL).subscribe(() => {
      this.getData();
    });
  }

  // todo separate led status from other data
  getData() {
    this.service.getData().subscribe((data) => {// console.log(data);

      this.isLedOn = data.ledState;

    });   // todo error
  }


  toggleLedState() {
    this.service.setLedState(!this.isLedOn).subscribe((data) => {
      this.isLedOn = data.ledState;
    });   // todo error
  }

  ngOnDestroy(): void {
    this.intervalSubscription.unsubscribe();
  }
}
