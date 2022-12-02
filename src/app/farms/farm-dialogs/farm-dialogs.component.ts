import { HttpErrorResponse } from '@angular/common/http';
import { Component, OnInit, OnDestroy, Input, Output, EventEmitter } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Farm } from 'src/app/models/farm.model';
import { FarmService } from 'src/app/services/farm.service';

@Component({
  selector: 'app-farm-dialogs',
  templateUrl: './farm-dialogs.component.html',
  styleUrls: ['./farm-dialogs.component.css']
})
export class FarmDialogsComponent implements OnInit {
  @Input() farmId = '';
  @Output() farmDeletedEvent = new EventEmitter<void>();

  constructor(private farmService: FarmService){}

  ngOnInit(): void {
    
  }

  onSubmit(form: NgForm){
    console.log(form);
  }

  deleteFarm(farmId: string){
    this.farmService.deleteFarm(farmId).subscribe({
      next: response => this.farmDeletedEvent.emit(),
      error: (error: HttpErrorResponse) => alert(error.message)
    })
    console.log("Farm deleted!");
  }

}
