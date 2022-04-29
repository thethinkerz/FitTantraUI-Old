import { Component, OnInit } from '@angular/core';
import { LoaderService } from '@app/Service/loader.service';

@Component({
  selector: 'app-loader',
  templateUrl: './loader.component.html',
  styleUrls: ['./loader.component.css']
})
export class LoaderComponent implements OnInit {

  loading: boolean;
  virtualPath: string;
  baseUrl: string;

  constructor(private loaderService: LoaderService) {
    debugger
    this.loaderService.isLoading.subscribe((v) => {
      console.log(v);
      this.loading = v;
    });

   }

  ngOnInit(): void {
  }

}
