import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Movimentos } from 'src/app/core/models/Movimentos.models';
import { ApiService } from 'src/app/core/services/api.service';

@Component({
  selector: 'app-lancamento',
  templateUrl: './lancamento.page.html',
  styleUrls: ['./lancamento.page.scss'],
})
export class LancamentoPage implements OnInit {

  categoria: string = 'despesa';
  acao: string = 'view'

  mov: Movimentos = new Movimentos();

  constructor(public api: ApiService, private router: Router) { }

  ngOnInit() {
  }

  acaoSelect(): string {
    this.acao === 'view' ? this.acao = 'insert' : this.acao = 'view'
    if (this.acao === 'view')
      this.mov = new Movimentos()

    return this.acao
  }


  delete(cod: number) {
    this.api.deleteMovimento(cod)
      .then(() => {
        this.acao = 'view'
        console.log('Movimento excluído com Sucesso!')
      })
      .catch(() => {
        this.acao = 'view'
        console.log('Erro ao salvar Movimento!')
      })
  }

  edit(item: Movimentos) {
    if (item.CodReceita) {
      this.categoria = 'receita'
    } else if (item.CodDespesa) {
      this.categoria = 'despesa'
    }
    this.mov = item;
    this.acao = 'insert'
  }

  getDescricao(i): string {
    if (i.CodReceita) {
      let index = this.api.CatReceitas.findIndex(a => a.CodReceita === i.CodReceita)
      if (index > -1) {
        return this.api.CatReceitas[index].DescReceita
      }
    } else if (i.CodDespesa) {
      let index = this.api.CatDespesas.findIndex(a => a.CodDespesa === i.CodDespesa)
      if (index > -1) {
        return this.api.CatDespesas[index].DescDespesa
      }
    }
  }

  add() {
    let CodCategoria = this.categoria === 'receita' ? this.mov.CodReceita : this.mov.CodDespesa
    this.api.addUpdateMovimento(this.mov.CodMovimento, this.mov.DescMovimento, this.mov.Valor, this.categoria, CodCategoria)
      .then(() => {
        this.mov = new Movimentos()
        this.acao = 'view'
        console.log('Movimento atualizado com Sucesso!')
        this.router.navigate(['dashboard'])
      })
      .catch(() => {
        this.acao = 'view'
        console.log('Erro ao salvar Movimento!')
      })
  }
}
