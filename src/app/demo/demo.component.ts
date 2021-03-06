import { Component, OnInit, ViewChild } from '@angular/core';
import { Validators, FormBuilder } from '@angular/forms';
import { NgBrazilValidators, MASKS } from 'ng-brazil';

export const DATA = {
  cpf: '156.631.881-50',
  cnpj: '40.841.253/0001-02',
  cep: '30.000-000',
  telefone: '(31) 9999-9998',
  inscricaoestadual: {
    'ma': '12.104.376-2',
    'pi': '19.301.656-7',
    'ce': '06.000001-5',
    'mg': '00181926300-48',
    'sp': '114.814.878.119'
  },
  currency: '1.000,10',
  time: '06:33'
}

export const DATARAW = {
  cpf: '15663188150',
  cnpj: '40841253000102',
  cep: '30000000',
  rg: 'MG10123456',
  telefone: '3199999998',
  inscricaoestadual: {
    'ma': '121043762',
    'pi': '193016567',
    'ce': '060000015',
    'mg': '0018192630048',
    'sp': '114814878119'
  },
  currency: '123321,22',
  time: '0633'
}


export const DATAERROR = {
  cpf: '15663188151',
  cnpj: '40841253000101',
  cep: '3000000',
  rg: 'MG1012345',
  telefone: '319999999',
  inscricaoestadual: {
    'ma': '12104376',
    'pi': '19301656',
    'ce': '06000001',
    'mg': '001819263004',
    'sp': '11481487811'
  },
  currency: 'R$1000.10',
  time: '0633'
}

@Component({
  selector: 'app-demo',
  templateUrl: './demo.component.html',
  styleUrls: ['./demo.component.css']
})
export class DemoComponent implements OnInit {
  public MASKS = MASKS;
  public DATARAW = DATARAW;
  estado = 'mg';
  estados = ['mg', 'sp'];
  public formFields;
  public formData: any = {};
  public formDataValidate: any = {};
  public form;
  public data = DATA;
  objectKeys = Object.keys;

  constructor(public fb: FormBuilder) {
    console.log(this.MASKS, MASKS)
  }

  ngOnInit() {
    this.init();
  }

  init() {
    // TODO: Taking examples from here https://github.com/gammasoft/ie/blob/master/testes/testes.js

    this.formFields = {
      estado: [''],
      cpf: ['', [<any>Validators.required, <any>NgBrazilValidators.cpf]],
      cnpj: ['', [<any>Validators.required, <any>NgBrazilValidators.cnpj]],
      rg: ['', [<any>Validators.required, <any>NgBrazilValidators.rg]],
      inscricaoestadual: ['', [<any>Validators.required, <any>NgBrazilValidators.inscricaoestadual(this.estado)]],
      telefone: ['', [<any>Validators.required, <any>NgBrazilValidators.telefone]],
      cep: ['', [<any>Validators.required, <any>NgBrazilValidators.cep]],
      currency: ['', [<any>Validators.required, <any>NgBrazilValidators.currency]],
      time: ['', [<any>Validators.required, <any>NgBrazilValidators.time]]
    };
    this.form = this.fb.group(this.formFields);

  }

  submit() {
    this.formData = this.form.value;
    console.log(this.form.valid);
    console.log(this.form.errors);
    for (const c in this.form.controls) {
      if (!c) {
        continue;
      }
      const control = this.form.controls[c];
      console.log(c, control.errors)
      this.formDataValidate[c] = control.errors;
    }
  }
}
