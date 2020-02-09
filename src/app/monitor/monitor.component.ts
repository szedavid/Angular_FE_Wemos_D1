import { Component, OnDestroy, OnInit } from '@angular/core';
import { MainService } from '../service/main.service';
import { ChartDataSets, ChartType } from 'chart.js';
import { Color, Label } from 'ng2-charts';      // canvasjs.min.js is 130 K smaller
import { interval } from 'rxjs';
import { SpeechService } from '../service/speech.service';

class VoltageLevel {
  constructor(public value: number, public text: string, public chartColor: string) {
  }
}

const UPDATE_INTERVAL = 1000;   // timing of data refresh

// voltage levels for chart coloring
const voltageLevels: VoltageLevel[] = [
  new VoltageLevel(1, 'low', 'rgba(0,0,255,0.28)'),
  new VoltageLevel(2, 'normal', 'rgba(0,255,0,0.28)'),
  new VoltageLevel(3, 'high', 'rgba(255,0,0,0.28)')
];

@Component({
  selector: 'app-monitor',
  templateUrl: './monitor.component.html',
  styleUrls: ['./monitor.component.css']
})
export class MonitorComponent implements OnInit, OnDestroy {

  public maxDataLength = 50;
  private intervalSubscription;

  private prevVoltageLevel: VoltageLevel = voltageLevels[1];

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
  lineChartType = 'line' as ChartType;

  constructor(private mainService: MainService,
              public speechService: SpeechService) {
  }

  ngOnInit(): void {
    this.speechService.cancel();    // mute previous page
    // this.speechService.speak('Here you can see the potentiometer values.');

    this.getData();   // speeding thigns up
    this.intervalSubscription = interval(UPDATE_INTERVAL).subscribe(() => {
      this.getData();
    });
  }

  getData() {
    this.mainService.getMonitorData().subscribe((data) => {
      // console.log(data);
      this.mainService.setLastRequestFailed(false);

      const chartDataArray = this.lineChartData[0].data;
      this.lineChartLabels.push(data.time);
      chartDataArray.push(data.value);
      while (chartDataArray.length > this.maxDataLength) {
        chartDataArray.shift();
        this.lineChartLabels.shift();
      }

      this.checkVoltageLevel(data.value);

    }, error => this.mainService.setLastRequestFailed(true));
  }

  checkVoltageLevel(lastValue: number) {
    const SPEAK_START = 'Voltage level is ';

    let newVoltageLevel: VoltageLevel;
    if (lastValue <= voltageLevels[0].value) {
      newVoltageLevel = voltageLevels[0];
    } else if (lastValue > voltageLevels[0].value && lastValue < voltageLevels[2].value) {
      newVoltageLevel = voltageLevels[1];
    } else if (lastValue >= voltageLevels[2].value) {
      newVoltageLevel = voltageLevels[2];
    }

    if (newVoltageLevel !== this.prevVoltageLevel) {
      this.prevVoltageLevel = newVoltageLevel;
      this.lineChartColors[0].backgroundColor = newVoltageLevel.chartColor;
      this.speechService.speak(`${SPEAK_START} ${newVoltageLevel.text}.`);
    }
  }

  ngOnDestroy(): void {
    this.intervalSubscription.unsubscribe();
  }
}


