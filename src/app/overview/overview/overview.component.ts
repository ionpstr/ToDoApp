import { Component } from '@angular/core';
import { ChartServiceService } from '../chart-service.service';

@Component({
  selector: 'app-overview',
  templateUrl: './overview.component.html',
  styleUrls: ['./overview.component.less'],
})
export class OverviewComponent {
  single: any;
  multi: any;
  singleTime: any;
  constructor(private chart: ChartServiceService) {
    this.single = this.chart.getPieGridData();
    this.multi = this.chart.getBarHorData();
    this.singleTime = this.chart.getTimeData();
  }

  view: [number, number] = [300, 300];
  viewBar: [number, number] = [380, 150];
  colorScheme: any = { domain: ['#5AA454', '#E44D25'] };
  colorSchemeBar: any = { domain: ['#7aa3e5', '#aae3f5'] };
  colorSchemeTime: any = { domain: ['#1491ff', '#ff6a14'] };
  showXAxis: boolean = true;
  showYAxis: boolean = true;
  gradient: boolean = true;
  showLegend: boolean = true;
  showXAxisLabel: boolean = true;
  showYAxisLabel: boolean = true;
  xAxisLabel: string = 'Proportion of done tasks';
  cardColor: string = '#23283';
}
