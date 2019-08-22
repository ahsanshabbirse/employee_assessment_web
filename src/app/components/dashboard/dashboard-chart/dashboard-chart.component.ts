import { Component, OnInit } from '@angular/core';
import { ChartOptions, ChartType, ChartDataSets } from 'chart.js';
import { Label } from 'ng2-charts';

@Component({
  selector: 'app-dashboard-chart',
  templateUrl: './dashboard-chart.component.html',
  styleUrls: ['./dashboard-chart.component.css']
})
export class DashboardChartComponent implements OnInit {
  public barChartOptions: ChartOptions = {
    responsive: true,
    // We use these empty structures as placeholders for dynamic theming.
    scales: { xAxes: [{}], yAxes: [{}] },
    plugins: {
      datalabels: {
        anchor: 'end',
        align: 'end',
      }
    }
  };
  public barChartLabels: Label[] = ['2012', '2013', '2014', '2015', '2016', '2017', '2018'];
  public barChartType: ChartType = 'line';
  public barChartLegend = true;

  public barChartData: ChartDataSets[] = [
    { data: [65, 59, 80, 81, 56, 55, 40], label: 'New Development' },
    { data: [28, 48, 40, 19, 86, 27, 50], label: 'New Technology Adoption' },
    { data: [28, 48, 40, 19, 86, 27, 80], label: 'Employee Training Session' },
    { data: [28, 48, 40, 19, 86, 27, 30], label: 'Bug resolving' },
    { data: [28, 48, 40, 19, 86, 27, 60], label: 'Software Support' }
  ];


  constructor() { }

  ngOnInit() {
  }

       // events
  public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }
}
