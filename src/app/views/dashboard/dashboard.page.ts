import { Component, ViewChild } from '@angular/core';
import { ApiService } from 'src/app/core/services/api.service';
import { Chart, registerables } from 'chart.js';
Chart.register(...registerables);

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.page.html',
  styleUrls: ['./dashboard.page.scss'],
})
export class DashboardPage {

  @ViewChild('barChart') barChart;
  bars: any;
  colorArray: any;

  constructor(public mov: ApiService) { }

  ionViewDidEnter() {
    this.createBarChart();
  }

  createBarChart() {
    this.bars = new Chart(this.barChart.nativeElement, {
      type: 'pie',
      data: {
        labels: ['Receitas', 'Despesas'],
        datasets: [{
          data: [parseFloat(this.mov.TotalReceitas), parseFloat(this.mov.TotalDespesas)],
          backgroundColor: ['#19a019', '#eb445a']
        }]
      }
    });

  }

}
