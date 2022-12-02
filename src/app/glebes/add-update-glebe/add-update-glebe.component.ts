import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Glebe } from 'src/app/models/glebe.model';
import { GlebeService } from 'src/app/services/glebe.service';

@Component({
  selector: 'app-add-update-glebe',
  templateUrl: './add-update-glebe.component.html',
  styleUrls: ['./add-update-glebe.component.css']
})
export class AddUpdateGlebeComponent implements OnInit {
  @Input() farmId = '';
  @Output() glebeEvent = new EventEmitter<void>();
  @Input() glebeIdEdit = '';

  glebe: Glebe = {
    id:'',
    name:'',
    area:0,
    productions:[],
    productivity:0
  }

  constructor(private glebeService: GlebeService) { }

  ngOnInit(): void {
  }

  onSubmit(form: NgForm){
    console.log(form);
  }

  onAddGlebe(addGlebeForm: NgForm): void {
    addGlebeForm.value['productions'] = [];
    addGlebeForm.value['productivity'] = 0;
    this.glebeService.addGlebe(this.farmId, addGlebeForm.value).subscribe(
      (response: Glebe) => {
        this.glebeEvent.emit();
        addGlebeForm.reset();
        document.getElementById("add-glebe-btn")?.click();
      }
    )
  }

  onUpdateGlebe(editGlebeForm: NgForm){
    const promise = new Promise<void>((resolve, reject) => {
      this.glebeService.getGlebeById(this.glebeIdEdit).subscribe({
        next: (response: Glebe) => {
          this.glebe = response,
          resolve()
        },
        error: (error: HttpErrorResponse) => reject(error.message)
      })
    })

    promise.then(() => {
      
      editGlebeForm.value['id'] = this.glebe.id;
      editGlebeForm.value['productivity'] = this.glebe.productivity;
      editGlebeForm.value['productions'] = this.glebe.productions;
      
      this.glebeService.updateGlebe(this.farmId, this.glebeIdEdit, editGlebeForm.value).subscribe({
        next: (response: Glebe) => {
          this.glebeEvent.emit(),
          editGlebeForm.reset(),
          document.getElementById("close-edit-glebe-btn")?.click()
        },
        error: (error: HttpErrorResponse) => alert(error.message)
      })
    })

  }

}
