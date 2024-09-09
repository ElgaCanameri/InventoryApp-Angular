import { Component, ChangeDetectorRef, OnInit, ViewChild } from '@angular/core';
import { BaseChartDirective } from 'ng2-charts';
import { ChartConfiguration} from 'chart.js';
import { Stock } from '../models/stocks.model';
import { StocksService } from '../_services/stock.service';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';  // Optional for pagination
import { MatTableDataSource,MatTableModule } from '@angular/material/table';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-stock',
  standalone: true,
  imports: [CommonModule, BaseChartDirective, MatTableModule, MatPaginatorModule],
  templateUrl: './stock.component.html',
  styleUrl: './stock.component.css'
})
export class StockComponent implements OnInit{
  title = 'stocks-charts';

  purchaseDataSource = new MatTableDataSource<Stock>([]);
  saleDataSource = new MatTableDataSource<Stock>([]);

  public barChartLegend = true;
  public barChartPlugins = [];

  @ViewChild(BaseChartDirective) chart?: BaseChartDirective;
  @ViewChild('purchasesPaginator') purchasesPaginator!: MatPaginator;
  @ViewChild('salesPaginator') salesPaginator!: MatPaginator;
  displayedColumns: string[] = ['productName', 'quantity', 'movementDate'];



  public barChartData: ChartConfiguration<'bar'>['data'] = {
    labels: [],
    datasets: [
      { 
        data: [], 
        label: 'Levizjet e stokut',
        backgroundColor: [],
        borderColor: [],
        borderWidth: 1
      }
    ]
  };
  
  public barChartOptions: ChartConfiguration<'bar'>['options'] = {
    responsive: true,
    scales: {
      x: {
        title: {
          display: true,
          text: 'Data'
        }
      },
      y: {
        title: {
          display: true,
          text: 'Sasia'
        }
      }
    },
    plugins: {
      tooltip: this.tooltipCallbacks() // Use custom tooltip callbacks
    }
  };

  public productNames: string[] = [];

  constructor(private stocksService: StocksService, private cdr: ChangeDetectorRef) {}

  ngOnInit(): void {
      this.stocksService.getAllStockMovements().subscribe((data: Stock[]) => {
      this.purchaseDataSource.data = data.filter(item => item.movementType === 'Purchase');
      this.saleDataSource.data = data.filter(item => item.movementType === 'Sale');
      this.purchaseDataSource.paginator = this.purchasesPaginator;
      this.saleDataSource.paginator = this.salesPaginator;

      this.barChartData.labels = data.map(item => new Date(item.movementDate).toLocaleDateString());
      this.barChartData.datasets[0].data = data.map(item => item.quantity);
      this.productNames = data.map(item => item.productName);

      this.barChartData.datasets[0].backgroundColor = data.map(item => 
        item.movementType === 'Purchase' ? '#88c0d4' : '#ff6384'
      );
      // '#36a2eb'
      this.barChartData.datasets[0].borderColor = data.map(item => 
        item.movementType === 'Purchase' ? '#88c0d4' : '#ff6384'
      );

      this.cdr.detectChanges(); // Manually trigger change detection
      if (this.chart) {
        this.chart.update(); // Explicitly update the chart
      }
    });
  }

  public tooltipCallbacks() {
    return {
      callbacks: {
        label: (tooltipItem: any) => {
          const index = tooltipItem.dataIndex;
          const labels = this.barChartData.labels || [];
          const data = this.barChartData.datasets[0]?.data || [];
          const productNames = this.productNames || [];

          const date = labels[index] || 'Unknown Date';
          const quantity = data[index] || 0;
          const product = productNames[index] || 'Unknown Product';

          return `Data: ${date} | Sasia: ${quantity} | Artikulli: ${product}`;
        }
      }
    };
  }
}