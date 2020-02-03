import { Component, OnDestroy, OnInit } from '@angular/core';
import { MainService } from '../service/main.service';
import { ChartDataSets } from 'chart.js';
import { Color, Label } from 'ng2-charts';      // canvasjs.min.js is 130 K smaller
import { interval } from 'rxjs';

@Component({
  selector: 'app-monitor',
  templateUrl: './monitor.component.html',
  styleUrls: ['./monitor.component.css']
})
export class MonitorComponent implements OnInit, OnDestroy {
  private updateInterval = 250;
  private intervalSubscription;

  lineChartData: ChartDataSets[] = [
    {data: [], label: 'Voltage'}
  ];

  lineChartLabels: Label[] = [];

  lineChartOptions = {
    responsive: true
  };

  lineChartColors: Color[] = [
    {
      borderColor: 'black',
      backgroundColor: 'rgba(255,255,0,0.28)'
    }
  ];

  lineChartLegend = true;
  lineChartPlugins = [];
  lineChartType = 'line';

  constructor(private service: MainService) {
  }

  ngOnInit(): void {
    this.intervalSubscription = interval(this.updateInterval).subscribe(() => {
      this.getData();
    });
  }

  getData() {
    console.log('subscr');
    this.service.getData().subscribe((data) => {
      console.log(data);

      this.lineChartLabels.push(data.time);
      this.lineChartData[0].data.push(data.value);

    });   // todo error
  }

  ngOnDestroy(): void {
    this.intervalSubscription.unsubscribe();
  }

}
