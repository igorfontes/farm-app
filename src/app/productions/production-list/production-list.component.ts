import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Glebe } from 'src/app/models/glebe.model';
import { GlebeService } from 'src/app/services/glebe.service';
import { ProductionService } from 'src/app/services/production.service';

@Component({
  selector: 'app-production-list',
  templateUrl: './production-list.component.html',
  styleUrls: ['./production-list.component.css']
})
export class ProductionListComponent implements OnInit {
  glebe: Glebe = {
    id: '',
    name: '',
    area: 0,
    productions: [],
    productivity: 0
  }
  farmId = '';
  productionIdEdit = '';
  productionIdDeletion = '';

  constructor(private glebeService: GlebeService,
              private productionService: ProductionService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.glebe.id = this.route.snapshot.params['glebeId'];
    this.farmId = this.route.snapshot.params['farmId'];
    this.getProductionsFromGlebe(this.glebe.id);
  }

  getProductionsFromGlebe(glebeId: string) {
    this.glebeService.getGlebeById(glebeId).subscribe({
      next: (response: Glebe) => this.glebe = response,
      error: (error: HttpErrorResponse) => alert(error.message)
    })
  }

  setProductionIdEdit(id: string){
    this.productionIdEdit = id;
  }

  setProductionIdDeletion(id: string){
    this.productionIdDeletion = id;
  }

}
