import { Component, OnInit } from '@angular/core';
import { DataProviderService } from '../data-provider.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.scss']
})
export class FooterComponent implements OnInit {

  contri: any[] = [];

  constructor(private dataserver: DataProviderService) {
    dataserver.getTextMessages()
      .subscribe(data => {
        console.log(data);
        for (let i = 0; i < data.length;) {
          let a: string[] = [];
          for (let j = 0; (i < data.length)&&(j < 4) ; j++) {
            a.push(data[i].name);
            i++;
          }
          this.contri.push(a);
        }
      })
  }

  ngOnInit(): void {
  }

}
