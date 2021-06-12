import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { timeout } from 'rxjs/operators';
import { Movimentos } from '../models/Movimentos.models';
import { CatDespesas, CatReceitas } from '../models/Categorias.models';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  private url: string = environment.URL;
  reqTimeout: number = 5000;
  private headers: any = new HttpHeaders({ 'Content-Type': 'application/json' });

  public MovimentosList: Array<Movimentos> = [];

  public TotalReceitas: string = '0.00';
  public TotalDespesas: string = '0.00';

  public CatReceitas: Array<CatReceitas> = [];
  public CatDespesas: Array<CatDespesas> = [];


  constructor(private http: HttpClient) {

    this.getMovimentos();
    this.getCatReceitas();
    this.getCatDespesas();
  }

  getMovimentos() {
    let options: any = { "key": "list_movimentos" }
    this.http.post(this.url, JSON.stringify(options), this.headers)
      .pipe(timeout(this.reqTimeout))
      .subscribe((res: any) => {
        console.log(res);
        this.MovimentosList = res;
        this.setDashboard(res);
      }),
      (error) => {
        console.log(error);
      }
  }

  setDashboard(mov: Array<Movimentos>) {
    if(mov.length > 0){
    this.TotalReceitas = mov.map((p) => { if (p.CodReceita) { return parseFloat(p.Valor) } else { return parseFloat('0.00') } }).reduce((v, e) => v + e).toFixed(2);
    this.TotalDespesas = mov.map((p) => { if (p.CodDespesa) { return parseFloat(p.Valor) } else { return parseFloat('0.00') } }).reduce((v, e) => v + e).toFixed(2);      
    } else {
      this.TotalReceitas = '0.00'
      this.TotalDespesas = '0.00'
    }
  }

  getCatDespesas() {
    let options: any = { "key": "list_cat_despesas" }
    this.http.post(this.url, JSON.stringify(options), this.headers)
      .pipe(timeout(this.reqTimeout))
      .subscribe((res: any) => {
        console.log(res);
        this.CatDespesas = res;
      }),
      (error) => {
        console.log(error);
      }
  }

  getCatReceitas() {
    let options: any = { "key": "list_cat_receitas" }
    this.http.post(this.url, JSON.stringify(options), this.headers)
      .pipe(timeout(this.reqTimeout))
      .subscribe((res: any) => {
        console.log(res);
        this.CatReceitas = res;
      }),
      (error) => {
        console.log(error);
      }
  }

  addUpdateMovimento(cod, desc: string, valor, cat, tipo) {
    return new Promise<any>((resolve, reject) => {
      let options: any = {
        "key": "insert_update_movimentos",
        "movimento": {
          "CodMovimento": cod ? cod : null,
          "DescMovimento": desc.toUpperCase().trim(),
          "Valor": valor,
          "CodDespesa": cat === 'despesa' ? tipo : null,
          "CodReceita": cat === 'receita' ? tipo : null
        }
      }
      this.http.post(this.url, JSON.stringify(options), this.headers)
        .pipe(timeout(this.reqTimeout))
        .subscribe((res: any) => {
          console.log(res);
          this.MovimentosList = res.dados;
          this.setDashboard(res.dados);
          resolve(true);
        }),
        (error) => {
          console.log(error);
          reject(false)
        }
    })
    
  }

  addUpdateCategoria(cod, desc: string, cat) {
    return new Promise<any>((resolve, reject) => {
      let options: any = {
        "key": cat === 'despesa' ? 'insert_update_cat_despesas' : 'insert_update_cat_receitas',
        "categoria": {
          "DescDespesa": cat === 'despesa' ? desc.toUpperCase().trim() : null,
          "DescReceita": cat === 'receita' ? desc.toUpperCase().trim() : null,
          "CodDespesa": cod ? cod : null,
          "CodReceita": cod ? cod : null
        }
      }
      console.log(options)
      this.http.post(this.url, JSON.stringify(options), this.headers)
        .pipe(timeout(this.reqTimeout))
        .subscribe((res: any) => {
          console.log(res);
          res.categoria === 'D' ? this.CatDespesas = res.dados : this.CatReceitas = res.dados;
          resolve(true);
        }),
        (error) => {
          console.log(error);
          reject(false)
        }
    })
  }

  deleteMovimento(cod) {
    return new Promise<any>((resolve, reject) => {
      let options: any = {
        "key": "delete_movimentos",
        "CodMovimento": cod
      }
      this.http.post(this.url, JSON.stringify(options), this.headers)
        .pipe(timeout(this.reqTimeout))
        .subscribe((res: any) => {
          console.log(res);
          this.MovimentosList = res.dados;
          this.setDashboard(res.dados);
          resolve(true);
        }),
        (error) => {
          console.log(error);
          reject(false)
        }
    })
  }

  deleteCatReceitas(cod) {
    return new Promise<any>((resolve, reject) => {
      let options: any = {
        "key":"delete_cat_receitas",
        "CodReceita": cod
      }
      this.http.post(this.url, JSON.stringify(options), this.headers)
        .pipe(timeout(this.reqTimeout))
        .subscribe((res: any) => {
          console.log(res);
          this.CatReceitas = res.dados;
          resolve(true);
        }),
        (error) => {
          console.log(error);
          reject(false)
        }
    })
  }

  deleteCatDespesas(cod) {
    return new Promise<any>((resolve, reject) => {
      let options: any = {
        "key":"delete_cat_despesas",
        "CodDespesa": cod
      }
      this.http.post(this.url, JSON.stringify(options), this.headers)
        .pipe(timeout(this.reqTimeout))
        .subscribe((res: any) => {
          console.log(res);
          this.CatDespesas = res.dados;
          resolve(true);
        }),
        (error) => {
          console.log(error);
          reject(false)
        }
    })
  }
  
}
