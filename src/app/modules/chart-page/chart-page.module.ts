import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { ChartModule } from 'angular-highcharts';

import { ChartPageComponent } from './chart-page.component';

@NgModule({
  declarations: [
    ChartPageComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    ChartModule
  ],
  providers: [],
  exports: [
    ChartPageComponent
  ]
})
export class ChartPageModule {
}
