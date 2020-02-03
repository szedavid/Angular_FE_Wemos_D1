import { Component, OnDestroy, OnInit } from '@angular/core';
import { MainService } from '../service/main.service';
// import * as CanvasJS from './canvasjs.min';
import { ChartDataSets, ChartOptions } from 'chart.js';
import { Color, Label } from 'ng2-charts';
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
    { data: [85, 72, 78, 75, 77, 75], label: 'Crude oil prices' },
  ];

  lineChartLabels: Label[] = ['January', 'February', 'March', 'April', 'May', 'June'];

  lineChartOptions = {
    responsive: true,
  };

  lineChartColors: Color[] = [
    {
      borderColor: 'black',
      backgroundColor: 'rgba(255,255,0,0.28)',
    },
  ];

  lineChartLegend = true;
  lineChartPlugins = [];
  lineChartType = 'line';

  // private chart;
  // private dps = [];
  // private dataLength = 50; // number of dataPoints visible at any point

  constructor(private service: MainService) {
  }

  ngOnInit(): void {
    // this.chart = new CanvasJS.Chart('chartContainer', {
    //   exportEnabled: true,
    //   title: {
    //     text: 'Dynamic Spline Chart'
    //   },
    //   axisY: {
    //     includeZero: false
    //   },
    //   data: [{
    //     type: 'spline',
    //     markerSize: 0,
    //     dataPoints: this.dps
    //   }]
    // });

    this.intervalSubscription = interval(this.updateInterval).subscribe(() => {
      this.getData();
    });
  }

  getData() {
    console.log('subscr');
    this.service.getData().subscribe((data) => {
      console.log(data);

      // this.dps.push({
      //   x: data.time,
      //   y: data.value
      // });
      //
      // if (this.dps.length > this.dataLength) {
      //   this.dps.shift();
      // }
      //
      // this.chart.render();
    });   // todo error
  }

  ngOnDestroy(): void {
    this.intervalSubscription.unsubscribe();
  }

}
