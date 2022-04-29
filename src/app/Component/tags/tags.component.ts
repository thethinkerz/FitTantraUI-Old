import { Component, OnInit, OnDestroy, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { NgModel } from '@angular/forms';
import { Subscription } from 'rxjs';
import { debounceTime, distinctUntilChanged } from 'rxjs/operators';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-tags',
  templateUrl: './tags.component.html',
  styleUrls: ['./tags.component.scss']
})
export class TagsComponent implements OnInit, OnDestroy {

  @Input() tags: Array<string>;
  
  @Output() tagAdded = new EventEmitter<string>();
  @Output() tagRemoved = new EventEmitter<string>();
  
  @ViewChild('tagInput') tagInput: NgModel;

  expanded = true;
  tagInputText = '';

  debouncedText = '';

  private changesSub: Subscription;

  constructor(private toastrService: ToastrService) { }

  ngOnInit() {
    debugger;
    // this.changesSub = this.tagInput.valueChanges!
    //   .pipe(
    //     debounceTime(300),
    //     distinctUntilChanged()
    //   )
    //   .subscribe(tagInputText => {
    //     this.debouncedText = tagInputText;
    //   });
  }

  ngOnDestroy() {
    if (this.changesSub) {
      this.changesSub.unsubscribe();
    }
  }

  onKeyUp(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      if (event.shiftKey) {
        // const filtered = this.tagService.filterSuggestions(this.suggestions, this.tags, this.debouncedText);
        // if (filtered.length > 0) {
        //   this.tagAdded.emit(filtered[0]);
        // }
      } else {
        this.tagAdded.emit(this.tagInputText);
        this.tagInput.reset();
      }
    }
  }
  
  onAdd() {
    debugger;
    if(this.tagInputText != ''){
      this.tagAdded.emit(this.tagInputText);
      this.tagInput.reset();
    }
    else{
      this.toastrService.error("Please enter text");
    }
    
  }

  onExpand() {
    this.expanded = !this.expanded;
  }
}
