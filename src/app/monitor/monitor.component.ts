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
  private UPDATE_INTERVAL = 500;
  public maxDataLength = 50;
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
      backgroundColor: 'rgba(0,255,0,0.28)'
    }
  ];

  lineChartLegend = true;
  lineChartPlugins = [];
  lineChartType = 'line';

  constructor(private service: MainService) {
  }

  ngOnInit(): void {
    this.intervalSubscription = interval(this.UPDATE_INTERVAL).subscribe(() => {
      this.getData();
    });
  }

  getData() {
    this.service.getMonitorData().subscribe((data) => {
      // console.log(data);

      const chartDataArray = this.lineChartData[0].data;
      this.lineChartLabels.push(data.time);
      chartDataArray.push(data.value);
      while (chartDataArray.length > this.maxDataLength) {
        chartDataArray.shift();
        this.lineChartLabels.shift();
      }

    });   // todo error
  }

  ngOnDestroy(): void {
    this.intervalSubscription.unsubscribe();
  }

}
