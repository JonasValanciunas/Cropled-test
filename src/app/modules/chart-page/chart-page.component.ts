import { Component, OnDestroy, OnInit } from '@angular/core';
import { Chart } from 'angular-highcharts';
import * as moment from 'moment';
import { MOCK_DATA } from './chart-page.mock';
import { formatTime, parseTime } from '../../shared/helpers/datetime.helper';
import { Series } from 'highcharts';

@Component({
  selector: 'app-chart',
  templateUrl: './chart-page.component.html'
})
export class ChartPageComponent implements OnInit, OnDestroy {
  chart = new Chart();
  data = MOCK_DATA;
  moment = moment();
  activeColor = 0;

  changeColor(value: number) {
    this.activeColor = value;
  }

  onAddPoint(series: Series[], x: number, y: number): void {
    series[this.activeColor]?.addPoint([x, y]);
  }

  ngOnInit(): void {
    const addPointHandler = this.onAddPoint.bind(this);

    this.chart = new Chart({
      chart: {
        type: 'scatter',
        width: 900,
        height: 500,
          margin: [50, 0, 100, 100],
        events: {
          click(e: any) {
            console.log("ethis", this);
            const x = Math.round(e.xAxis[0].value);
            const y = Math.round(e.yAxis[0].value);
            addPointHandler(this.series, x, y);
          }
        }
      },
      title: {
        text: ''
      },
      credits: {
        enabled: false,
      },
      xAxis: {
        title: {
          text: 'Time',
          align: 'low',
          style: {
            color: '#000',
            fontSize: '14px',
            fontWeight: '700'
          }
        },
        lineWidth: 4,
        lineColor: '#000',
        min: 0,
        max: 24 * 3600,
        tickInterval: 3 * 3600,
        showFirstLabel: false,
        showLastLabel: true,
        crosshair: true,
        labels: {
          formatter: ({ value }) => {
            return formatTime(Number(value));
          },
          style: {
            color: '#b0a399',
            fontSize: '14px',
            lineWidth: 3,
          },
          enabled: true
        },
        gridLineColor: '#b2b2b2',
        gridLineDashStyle: 'ShortDash',
        gridLineWidth: 2,
        tickColor: '#808080',
        tickLength: 10,
        tickWidth: 3,

      },
      yAxis: {
        title: {
          text: 'Intensity',
          align: 'low',
          style: {
            color: '#000',
            fontSize: '14px',
            fontWeight: '700'
          }
        },
        lineWidth: 4,
        lineColor: '#000',
        min: 0,
        max: 100,
        tickInterval: 10,
        showFirstLabel: false,
        showLastLabel: true,
        crosshair: true,
        labels: {
          style: {
            color: '#b0a399',
            fontSize: '14px',
            lineWidth: 3
          },
          enabled: true
        },
        gridLineColor: '#b2b2b2',
        gridLineDashStyle: 'ShortDash',
        gridLineWidth: 2,
        tickColor: '#808080',
        tickLength: 10,
        tickWidth: 3
      },
      plotOptions: {
        series: {
          marker: {
            enabled: true,
          }
        }
      },
      series: this.data.map((datum, index) => ({
        type: 'line',
        name: datum.name,
        data: datum.data.map(({time, value}) => ({
          x: parseTime(time),
          y: value
        })),
        color: datum.color,
      })),
      legend: {
        enabled: false,
      },
    });
  }

  ngOnDestroy(): void {
  }
}
