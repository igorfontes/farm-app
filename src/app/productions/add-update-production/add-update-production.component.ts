import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Production } from 'src/app/models/production.model';
import { ProductionService } from 'src/app/services/production.service';

@Component({
  selector: 'app-add-update-production',
  templateUrl: './add-update-production.component.html',
  styleUrls: ['./add-update-production.component.css']
})
export class AddUpdateProductionComponent implements OnInit {
  @Input() productionId = '';
  @Input() glebeId = '';
  @Output() productionEvent = new EventEmitter<void>();

  production: Production = {
    id: '',
    production: 0
  }

  constructor(private productionService: ProductionService) { }

  ngOnInit(): void {
  }

  onAddProduction(addProductionForm: NgForm){
    this.productionService.addProduction(this.glebeId, addProductionForm.value).subscribe(
      (response: Production) => {
        console.log(addProductionForm.value);
        this.productionEvent.emit();
        addProductionForm.reset();
        document.getElementById("close-add-production-btn")?.click();
      }
    )
  }

  onUpdateProduction(editProductionForm: NgForm){
    editProductionForm.value['id'] = this.productionId;
    this.productionService.updateProduction(this.glebeId, this.productionId, editProductionForm.value)
    .subscribe({
      next: (response: Production) => {
        this.production = response,
        this.productionEvent.emit();
        editProductionForm.reset();
        document.getElementById("close-edit-btn")?.click();
      },
      error: (error: HttpErrorResponse) => alert(error.message)
    })
  }

}
