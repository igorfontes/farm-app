import { HttpErrorResponse } from '@angular/common/http';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ProductionService } from 'src/app/services/production.service';

@Component({
  selector: 'app-production-dialogs',
  templateUrl: './production-dialogs.component.html',
  styleUrls: ['./production-dialogs.component.css']
})
export class ProductionDialogsComponent implements OnInit {
  glebeId = '';
  @Input() productionId = '';
  @Output() productionDeletedEvent = new EventEmitter<void>();

  constructor(private productionService: ProductionService,
    private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.glebeId = this.route.snapshot.params['glebeId'];
  }

  onDeleteProduction(id: string){
    this.productionService.deleteProduction(this.glebeId, id).subscribe({
      next: response => {
        this.productionDeletedEvent.emit(),
        document.getElementById("close-delete-btn")?.click()
      },
      error: (error: HttpErrorResponse) => alert(error.message)
    })
  }

}
