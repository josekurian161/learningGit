import { Validators } from "@angular/forms";
export interface Validator {
  name: string;
  validator: any;
  message: string;
}
export interface FieldConfig {
  label?: string;
  name?: string;
  inputType?: string;
  options?: any[];
  collections?: any;
  type: string;
  value?: any;
  validations?: Validator[];
  link?: any;
}



export function updateProcess(data): Validator[] {
  let newList = [];

  switch (data) {
    case 'TextBox':
      newList = [
        {
          name: "required",
          validator: Validators.required,
          message: "Name Required"
        }
      ]
      return newList;
    case 'DropdownList':
      newList = [
        {
          name: "required",
          validator: Validators.required,
          message: "Email Required"
        }
      ]
      return newList;
    case 'file':
      newList = [
        {
          name: "required",
          validator: Validators.required,
          message: "please Upload file"
        }
      ]
      return newList;
  }
}


export function getDataForControls(data): FieldConfig {

  var object = {} as FieldConfig


  if (data[0].s_AnswerType == 'RadioButtonList') {
    object.type = data[0].s_AnswerType
    object.label = data[0].s_Question
    object.name = 'AnsCode'
    if (data[0].b_IsAnswered == true) {
      if (data[0].AuditMasterDet[0].AuditSelectedAns) {
        object.value = data[0].AuditMasterDet[0].AuditSelectedAns[0].s_AnsCode
      }
      else {
        object.value = data[0].AuditQuestionDetails[0].s_Answercode
      }

    }
    else {
      object.value = data[0].AuditQuestionDetails[0].s_Answercode
    }

    object.options = data[0].AuditQuestionDetails
    return object;
  }
  else if (data[0].s_AnswerType == 'TextBox') {
    object.type = data[0].s_AnswerType
    object.label = data[0].s_Question
    object.inputType = 'text'
    object.name = 'AnsCode'
    if (data[0].b_IsAnswered == true) {
      if (data[0].AuditMasterDet[0].AuditSelectedAns) {
        object.value = data[0].AuditMasterDet[0].AuditSelectedAns[0].s_AnsValue
      }
      else {
        object.value = null;
      }
    }

    object.options = data[0].AuditQuestionDetails
    object.validations = updateProcess('TextBox');
    return object;
  }
  else if (data[0].s_AnswerType == 'DropdownList') {
    object.type = 'Questionselect'
    object.label = data[0].s_Question

    if (data[0].b_IsAnswered == true) {
      if (data[0].AuditMasterDet[0].AuditSelectedAns) {
        object.value = data[0].AuditMasterDet[0].AuditSelectedAns[0].s_AnsCode
      }
      else {
        object.value = null;

      }
    }
    object.name = 'AnsCode'
    object.options = data[0].AuditQuestionDetails
    object.validations = updateProcess('DropdownList');
    return object;
  }
}



export function CommonControls(data, value, status): FieldConfig {
  var object = {} as FieldConfig


  if (data == 'voiceControl') {

    object.type = "file"
    object.label = "voice"
    object.name = 'voice'
    if (value[0].b_IsAnswered == true) {

      if (value[0].AuditMasterDet[0].AuditSelectedAns != null) {
        object.value = value[0].AuditMasterDet[0].AuditSelectedAns[0].s_AudioPath
      }
      else {
        object.value = null
      }
    }
    else {
      object.value = null
    }

    object.validations = updateProcess('file');
    return object;
  }
  else if (data == 'PlantCode') {

    object.type = "PlantCode"
    object.label = "PlantCode"
    object.name = 'PlantCode'
    object.value = value[0].AuditMasterDet[0].s_PlantCode;
    return object;
  }
  else if (data == 'ControlType') {
    object.type = "ControlType"
    object.label = "ControlType"
    object.name = 'ControlType'
    object.value = value[0].s_AnswerType;
    return object;
  }
  else if (data == 'imageControl') {

    object.type = "file"
    object.label = "image"
    object.name = 'image'

    return object;
  }
  else if (data == 'image') {

    object.type = "image"
    object.label = "imageUrl"
    object.name = 'imageUrl'
    if (value[0].b_IsAnswered == true) {
      if (value[0].AuditMasterDet[0].AuditSelectedAns) {
        object.value = value[0].AuditMasterDet[0].AuditSelectedAns[0].s_ImagePath
      }
      else {
        object.value = null
      }
    }
    object.validations = updateProcess('file');
    return object;
  }
  else if (data == 'submitControl') {
    object.type = "button"
    object.label = "Save"
    object.name = "submit"

    if (status == 'Pending') {
      object.value = 'Pending'
    }
    else {
      object.value = 'completed'
    }
    return object;
  }
  else if (data == 'updatedImageSatus') {
    object.type = "updatedImageSatus"
    object.label = "updatedImageSatus"
    object.name = 'updatedImageSatus'
    object.value = null
    return object;
  }
  else if (data == 'updatedVoiceSatus') {
    object.type = "updatedVoiceSatus"
    object.label = "updatedVoiceSatus"
    object.name = 'updatedVoiceSatus'
    object.value = null
    return object;
  }
  else if (data == 'questionCode') {
    object.type = "questionCode"
    object.label = "questionCode"
    object.name = 'questionCode'
    object.value = value[0].s_QueCode;
    return object;
  }
  else if (data == 'CheckBox') {
    object.label = "Accept Terms",
      object.type = "CheckBox",
      object.name = "term",
      object.value = true,
      object.options = [
        { key: 'f', label: 'Fishing', checked: true },
        { key: 'c', label: 'Cooking', checked: false }
      ];
    return object;
  }
  else if (data == 'VoiceUrl') {
    object.type = "VoiceUrl"
    object.label = "VoiceUrl"
    object.name = 'VoiceUrl'
    if (value[0].b_IsAnswered == true) {
      if (value[0].AuditMasterDet[0].AuditSelectedAns != null) {
        object.value = value[0].AuditMasterDet[0].AuditSelectedAns[0].s_AudioPath
      }
      else {
        object.value = null
      }
    }
    else {
      object.value = null
    }
    return object;
  }
  else if (data == 'scoreControl') {

    object.type = "select"
    object.label = "Score"
    object.name = 'score'
    object.options = value[0].AuditMappedScore;
    if (value[0].b_IsAnswered == true) {

      if (value[0].AuditMasterDet[0].AuditSelectedAns != null) {
        object.value = value[0].AuditMasterDet[0].AuditSelectedAns[0].s_ScoreID
      }
      else {
        object.value = null
      }
    }
    else {
      object.value = null
    }
    object.validations = updateProcess('DropdownList');
    return object;
  }
  else if (data == 'ObsTextBox') {
    object.type = 'textArea'
    object.label = 'Observation'
    object.inputType = 'text'
    object.name = 's_Observation'
    if (value[0].b_IsAnswered == true) {

      if (value[0].AuditMasterDet[0].AuditSelectedAns != null) {
        object.value = value[0].AuditMasterDet[0].AuditSelectedAns[0].s_Observation
      }
      else {
        object.value = null
      }
    }
    else {
      object.value = null
    }
    return object;
  }
  else if (data == 'ActionSugg') {
    object.type = 'textArea'
    object.label = 'Action suggested if any'
    object.inputType = 'text'
    object.name = 's_Suggestion'
    if (value[0].b_IsAnswered == true) {

      if (value[0].AuditMasterDet[0].AuditSelectedAns != null) {
        object.value = value[0].AuditMasterDet[0].AuditSelectedAns[0].s_Suggestion
      }
      else {
        object.value = null
      }
    }
    else {
      object.value = null
    }
    return object;

  }
  else if (data == 'Date') {
    object.type = 'date'
    object.label = 'Action till date'
    object.inputType = 'date'
    object.name = 'd_PerformedDate'
    
    if (value[0].b_IsAnswered == true) {

      if (value[0].AuditMasterDet[0].AuditSelectedAns != null) {
        object.value = value[0].AuditMasterDet[0].AuditSelectedAns[0].d_PerformedDate
      }
      else {
        object.value = null
      }
    }
    else {
      object.value = null
    }
    object.validations = updateProcess('TextBox');
    return object;

  }

}
