import {
  AfterViewInit,
  Component,
  EventEmitter,
  OnInit,
  Output,
} from '@angular/core';
import { FormControl } from '@angular/forms';

@Component({
  selector: 'app-layout-manager',
  templateUrl: './layout-manager.component.html',
  styleUrls: ['./layout-manager.component.css'],
})
export class LayoutManagerComponent {
  @Output() selectedOptEvent = new EventEmitter<string>();
  sel = new FormControl();

  onChange() {
    this.selectedOptEvent.emit(this.sel.value);
  }
}
