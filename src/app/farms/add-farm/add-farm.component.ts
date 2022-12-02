import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Router } from '@angular/router';
import { Farm } from 'src/app/models/farm.model';
import { FarmService } from 'src/app/services/farm.service';

@Component({
  selector: 'app-add-farm',
  templateUrl: './add-farm.component.html',
  styleUrls: ['./add-farm.component.css']
})
export class AddFarmComponent implements OnInit {
  @Input() farmIdEdit = '';
  @Output() farmEvent = new EventEmitter<void>();
  @Output() farmEditEvent = new EventEmitter<void>();

  farm: Farm = {
    id:'',
    name:'',
    glebes:[],
    productivity:0
  };

  constructor(private farmService: FarmService,
    private router: Router) { }

  ngOnInit(): void {
  }

  onSubmit(form: NgForm){
    console.log(form);
  }

  onAddFarm(addForm: NgForm): void {
    addForm.value['glebes'] = [];
    addForm.value['productivity'] = 0;
    this.farmService.addFarm(addForm.value).subscribe(
      (response: Farm) => {
        console.log(addForm.value);
        this.farmEvent.emit();
        addForm.reset();
        document.getElementById("add-farm-btn")?.click();
      }
    )
  }

  onUpdateFarm(editForm: NgForm): void {
    const promise = new Promise<void>((resolve, reject) => {

      this.farmService.getFarmById(this.farmIdEdit).subscribe({
        next: (response: Farm) => {
          this.farm = response,
          resolve()
        },
        error: (error: HttpErrorResponse) => reject(error.message)
      })

    });
    
    promise.then(() => {
      
      editForm.value['id'] = this.farmIdEdit;
      editForm.value['glebes'] = this.farm.glebes;
      editForm.value['productivity'] = this.farm.productivity;
      
      this.farmService.updateFarm(editForm.value).subscribe({
        next: (response: Farm) => {
          this.farmEvent.emit(),
          editForm.reset(),
          document.getElementById("close-edit-farm-btn")?.click()
        },
        error: (error: HttpErrorResponse) => alert(error.message)
      })
      
    })
  }

}
