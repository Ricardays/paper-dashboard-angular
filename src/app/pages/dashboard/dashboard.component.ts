import { Component, OnInit } from '@angular/core';
import Chart from 'chart.js';
import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Router} from "@angular/router";
import {catchError, Observable, take} from "rxjs";
import {environment} from "../../../environments/environment";


@Component({
    selector: 'dashboard-cmp',
    moduleId: module.id,
    templateUrl: 'dashboard.component.html'
})

export class DashboardComponent implements OnInit{

  public canvas : any;
  public ctx;
  public chartColor;
  public chartEmail;

  protected headers: HttpHeaders;
  env = environment;

  pendingAppointments = 0;
  activeMedics = 0;
  createdPatients = 0;
  cancelledAppointments = 0;

  constructor(protected httpClient: HttpClient,
              private router: Router,) { }

    ngOnInit(){

      this.load();

      this.chartColor = "#FFFFFF";

    }

  load(): void {
    this.httpClient.get(this.env.urlApi + '/appointment/dashboard/pending', {headers: this.headers})
      .pipe(
        take(1),
        catchError(err => this.handleErr(err))
      ).subscribe(
      (resp) => {
        this.pendingAppointments = resp;
      }
    );

    this.httpClient.get(this.env.urlApi + '/medic/dashboard/active', {headers: this.headers})
      .pipe(
        take(1),
        catchError(err => this.handleErr(err))
      ).subscribe(
      (resp) => {
        this.activeMedics = resp;
      }
    );

    this.httpClient.get(this.env.urlApi + '/patient/dashboard/created', {headers: this.headers})
      .pipe(
        take(1),
        catchError(err => this.handleErr(err))
      ).subscribe(
      (resp) => {
        this.createdPatients = resp;
      }
    );

    this.httpClient.get(this.env.urlApi + '/appointment/dashboard/cancelled', {headers: this.headers})
      .pipe(
        take(1),
        catchError(err => this.handleErr(err))
      ).subscribe(
      (resp) => {
        this.cancelledAppointments = resp;
      }
    )

    this.httpClient.get(this.env.urlApi + '/appointment/dashboard/graph', {headers: this.headers})
      .pipe(
        take(1),
        catchError(err => this.handleErr(err))
      ).subscribe(
      (resp) => {
        let graphData = [
          resp.Pendiente?resp.Pendiente:0 ,
          resp.Confirmado?resp.Confirmado:0 ,
          resp.Completado?resp.Completado:0 ,
          resp.Cancelado?resp.Cancelado:0
        ]

        this.canvas = document.getElementById("chartEmail");
        this.ctx = this.canvas.getContext("2d");
        this.chartEmail = new Chart(this.ctx, {
          type: 'pie',
          data: {
            labels: [1, 2, 3],
            datasets: [{
              label: "Emails",
              pointRadius: 0,
              pointHoverRadius: 0,
              backgroundColor: [
                '#e3e3e3',
                '#4acccd',
                '#fcc468',
                '#ef8157'
              ],
              borderWidth: 0,
              data: graphData
            }]
          },

          options: {

            legend: {
              display: false
            },

            pieceLabel: {
              render: 'percentage',
              fontColor: ['white'],
              precision: 2
            },

            tooltips: {
              enabled: false
            },

            scales: {
              yAxes: [{

                ticks: {
                  display: false
                },
                gridLines: {
                  drawBorder: false,
                  zeroLineColor: "transparent",
                  color: 'rgba(255,255,255,0.05)'
                }

              }],

              xAxes: [{
                barPercentage: 1.6,
                gridLines: {
                  drawBorder: false,
                  color: 'rgba(255,255,255,0.1)',
                  zeroLineColor: "transparent"
                },
                ticks: {
                  display: false,
                }
              }]
            },
          }
        });

        this.httpClient.get(this.env.urlApi + '/appointment/dashboard/linegraph', {headers: this.headers})
          .pipe(
            take(1),
            catchError(err => this.handleErr(err))
          ).subscribe(
          (resp) => {
            console.log(resp)
            let graphActual = [
              resp.actual?.JANUARY? resp.actual?.JANUARY : 0,
              resp.actual?.FEBRUARY? resp.actual?.FEBRUARY : 0,
              resp.actual?.MARCH? resp.actual?.MARCH : 0,
              resp.actual?.APRIL? resp.actual?.APRIL : 0,
              resp.actual?.MAY? resp.actual?.MAY : 0,
              resp.actual?.JUNE? resp.actual?.JUNE : 0,
              resp.actual?.JULY? resp.actual?.JULY : 0,
              resp.actual?.AUGUST? resp.actual?.AUGUST : 0,
              resp.actual?.SEPTEMBER? resp.actual?.SEPTEMBER : 0,
              resp.actual?.OCTOBER? resp.actual?.OCTOBER : 0,
              resp.actual?.NOVEMBER? resp.actual?.NOVEMBER : 0,
              resp.actual?.DECEMBER? resp.actual?.DECEMBER : 0,
            ];

            let graphPast = [
              resp.past?.JANUARY? resp.past?.JANUARY : 0,
              resp.past?.FEBRUARY? resp.past?.FEBRUARY : 0,
              resp.past?.MARCH? resp.past?.MARCH : 0,
              resp.past?.APRIL? resp.past?.APRIL : 0,
              resp.past?.MAY? resp.past?.MAY : 0,
              resp.past?.JUNE? resp.past?.JUNE : 0,
              resp.past?.JULY? resp.past?.JULY : 0,
              resp.past?.AUGUST? resp.past?.AUGUST : 0,
              resp.past?.SEPTEMBER? resp.past?.SEPTEMBER : 0,
              resp.past?.OCTOBER? resp.past?.OCTOBER : 0,
              resp.past?.NOVEMBER? resp.past?.NOVEMBER : 0,
              resp.past?.DECEMBER? resp.past?.DECEMBER : 0,
            ];

            var speedCanvas = document.getElementById("speedChart");

            var dataFirst = {
              data: graphActual,
              fill: false,
              borderColor: '#fbc658',
              backgroundColor: 'transparent',
              pointBorderColor: '#fbc658',
              pointRadius: 4,
              pointHoverRadius: 4,
              pointBorderWidth: 8,
            };

            var dataSecond = {
              data: graphPast,
              fill: false,
              borderColor: '#51CACF',
              backgroundColor: 'transparent',
              pointBorderColor: '#51CACF',
              pointRadius: 4,
              pointHoverRadius: 4,
              pointBorderWidth: 8
            };

            var speedData = {
              labels: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
              datasets: [dataFirst, dataSecond]
            };

            var chartOptions = {
              legend: {
                display: false,
                position: 'top'
              }
            };

            var lineChart = new Chart(speedCanvas, {
              type: 'line',
              hover: false,
              data: speedData,
              options: chartOptions
            });
          });
      }
    )
  }

  protected handleErr(err): Observable<any> {
    console.error('API Error:', err);
    throw err;
  }
}
