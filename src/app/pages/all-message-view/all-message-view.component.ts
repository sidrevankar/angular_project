import { Component, OnInit } from '@angular/core';
import { DataProviderService } from '../data-provider.service';
import { Data } from '@angular/router';

@Component({
  selector: 'app-all-message-view',
  templateUrl: './all-message-view.component.html',
  styleUrls: ['./all-message-view.component.scss']
})
export class AllMessageViewComponent implements OnInit {

  data: Data[];
  constructor(private dataserver: DataProviderService) {
    dataserver.getTextMessages()
      .subscribe(data => this.data = data)
   }

  ngOnInit(): void {
  }

}
