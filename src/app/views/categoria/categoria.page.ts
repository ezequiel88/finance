import { Component, OnInit } from '@angular/core';
import { CatDespesas, CatReceitas } from 'src/app/core/models/Categorias.models';
import { ApiService } from 'src/app/core/services/api.service';

@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.page.html',
  styleUrls: ['./categoria.page.scss'],
})
export class CategoriaPage implements OnInit {

  tipo: string = 'despesa'
  acao: string = 'view'

  tipoCategoria: string = 'despesa'
  descricao: string
  codCategoria: number

  constructor(public api: ApiService) { }

  ngOnInit() {
  }

  acaoSelect(): string {
    this.acao === 'view' ? this.acao = 'insert' : this.acao = 'view'
    if (this.acao === 'view'){
      this.descricao = null
      this.codCategoria = null
    }      
    return this.acao
  }

  deleteReceita(id: number) {
    this.api.deleteCatReceitas(id)
      .then(() => {
        console.log('Categoria excluída com Sucesso!')
      })
      .catch(() => {
        this.acao = 'view'
        console.log('Erro ao excluir Categoria!')
      })
  }

  deleteDesepesa(id: number) {
    this.api.deleteCatDespesas(id)
      .then(() => {
        console.log('Categoria excluída com Sucesso!')
      })
      .catch(() => {
        this.acao = 'view'
        console.log('Erro ao excluir Categoria!')
      })
  }

  edit(item: any) {
    this.tipo === 'receita' ? this.descricao = item.DescReceita : this.descricao = item.DescDespesa
    this.tipoCategoria === 'receita' ? this.codCategoria = item.CodReceita : this.codCategoria = item.CodDespesa
    this.acao = 'insert'
  }

  new() {
    
    this.api.addUpdateCategoria(this.codCategoria, this.descricao, this.tipoCategoria)
      .then(() => {
        this.acao = 'view'
        this.descricao = ''
        this.codCategoria = null
        console.log('Categoria atualizada com Sucesso!')
      })
      .catch(() => {
        this.acao = 'view'
        console.log('Erro ao atualizar Categoria!')
      })
  }

  changeType(event) {
    this.tipo = event.target.value
  }
}
