import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Farm } from 'src/app/models/farm.model';
import { FarmService } from 'src/app/services/farm.service';

@Component({
  selector: 'app-farm-list',
  templateUrl: './farm-list.component.html',
  styleUrls: ['./farm-list.component.css']
})
export class FarmListComponent implements OnInit {
  currentFarmId = '';
  currentFarmIdEdit = '';
  farms: Farm[] = [];

  constructor(private farmService: FarmService,
              private router: Router) { }

  ngOnInit(): void {
    this.getFarms();
  }

  public getFarms(): Farm[] {
    this.farmService.getFarms().subscribe({
      next: (response: Farm[]) => this.farms = response,
      error: (error: HttpErrorResponse) => alert(error.message)
    })
    return this.farms;
  }

  public setFarmId(farmId: string){
    this.currentFarmIdEdit = farmId;
  }

  public loadFarmData(farmId: string){
    this.currentFarmIdEdit = farmId;
    this.farmService.updateProductivity(farmId).subscribe({
      next: () => console.log("Farm productivity loaded!"),
      error: (error: HttpErrorResponse) => alert(error.message)
    })
  }

  public setFarmIdDeletion(currentFarmId: string){
    this.currentFarmId = currentFarmId;
  }
  
}
