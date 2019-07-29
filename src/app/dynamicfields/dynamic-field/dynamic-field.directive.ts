import {
  ComponentFactoryResolver, ComponentRef, Directive, Input, OnInit,
  ViewContainerRef
} from "@angular/core";
import { FormGroup } from "@angular/forms";
import { FieldConfig } from '../../Models/field.interface';
import { InputComponent } from "../input/input.component";
import { ButtonComponent } from "../button/button.component";
import { SelectComponent } from "../select/select.component";
import { FileinputComponent } from "../fileinput/fileinput.component";
import { RadiobuttonComponent } from '../radiobutton/radiobutton.component';
import { QuestionselectComponent } from '../questionselect/questionselect.component';
import { ImageComponent } from '../image/image.component';
import { CheckboxComponent } from '../checkbox/checkbox.component';
import { DateComponent } from '../date/date.component';
import { TextAreaComponent } from '../text-area/text-area.component';
const componentMapper = {
  TextBox: InputComponent,
  button: ButtonComponent,
  file: FileinputComponent,
  select: SelectComponent,
  RadioButtonList: RadiobuttonComponent,
  date: DateComponent,
  Questionselect: QuestionselectComponent,
  image: ImageComponent,
  CheckBox: CheckboxComponent,
  textArea:TextAreaComponent

};
@Directive({
  selector: '[dynamicField]'
})
export class DynamicFieldDirective {
  @Input() field: FieldConfig;
  @Input() group: FormGroup;
  componentRef: any;
  constructor(
    private resolver: ComponentFactoryResolver,
    private container: ViewContainerRef
  ) { }

  ngOnInit() {

    if (this.field.type != "updatedVoiceSatus" && this.field.type != "updatedImageSatus" && this.field.type != "VoiceUrl" && this.field.type != "questionCode" && this.field.type != "ControlType" && this.field.type !="PlantCode") {
      const factory = this.resolver.resolveComponentFactory(
        componentMapper[this.field.type]
      );
      this.componentRef = this.container.createComponent(factory);
      this.componentRef.instance.field = this.field;
      this.componentRef.instance.group = this.group;
    }

  }


}
