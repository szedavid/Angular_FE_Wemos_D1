import { Component, OnDestroy, OnInit } from '@angular/core';
import { MainService } from '../service/main.service';
import { ChartDataSets } from 'chart.js';
import { Color, Label } from 'ng2-charts';      // canvasjs.min.js is 130 K smaller
import { interval } from 'rxjs';

class VoltageLevel {
  constructor(public value: number, public chartColor: string) {
  }
}

@Component({
  selector: 'app-monitor',
  templateUrl: './monitor.component.html',
  styleUrls: ['./monitor.component.css']
})
export class MonitorComponent implements OnInit, OnDestroy {

  // voltage levels for chart coloring
  static voltageLevels: VoltageLevel[] = [
    new VoltageLevel(1, 'rgba(0,0,255,0.28)'),
    new VoltageLevel(2, 'rgba(0,255,0,0.28)'),
    new VoltageLevel(3, 'rgba(255,0,0,0.28)')
  ];

  private UPDATE_INTERVAL = 500;
  public maxDataLength = 50;
  private intervalSubscription;

  private prevVoltageLevel: VoltageLevel = MonitorComponent.voltageLevels[1];

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
      backgroundColor: this.prevVoltageLevel.chartColor
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

      this.checkVoltageLevel(data.value);

    });   // todo error
  }

  checkVoltageLevel(lastValue: number) {
    let newVoltageLevel: VoltageLevel;
    if (lastValue <= MonitorComponent.voltageLevels[0].value) {
      newVoltageLevel = MonitorComponent.voltageLevels[0];
    } else if (lastValue > MonitorComponent.voltageLevels[0].value && lastValue < MonitorComponent.voltageLevels[2].value) {
      newVoltageLevel = MonitorComponent.voltageLevels[1];
    } else if (lastValue >= MonitorComponent.voltageLevels[2].value) {
      newVoltageLevel = MonitorComponent.voltageLevels[2];
    }

    if (newVoltageLevel !== this.prevVoltageLevel) {
      this.prevVoltageLevel = newVoltageLevel;
      this.lineChartColors[0].backgroundColor = newVoltageLevel.chartColor;
      // todo audio
    }
  }

  ngOnDestroy(): void {
    this.intervalSubscription.unsubscribe();
  }
}


