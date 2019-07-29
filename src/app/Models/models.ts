

  export interface AuditMappedScore {
    s_ScoreID:number;
    s_ScoreNo: number;
    s_ScoreDescription: string;
    s_FullDescription: string;
}

export interface AuditQuestionDetail {
    s_Answercode: string;
    s_QueCode: string;
    s_AnswerOption: string;
    n_AnswerSequence: number;
}

export interface AuditSelectedAn {
    pk_AuditAnsId: number;
    s_AuditCode: string;
    s_AnsCode: string;
    s_AnsValue: string;
    s_ScoreNo: string;
    b_IsActive: boolean;
    s_CreatedBy: string;
    d_CreatedDate: Date;
    s_ModifyBy: string;
    d_ModifyDate: Date;
    Pk_AnsID: number;
    s_Answercode: string;
    s_QueCode: string;
    s_AnswerOption: string;
    n_AnswerSequence: number;
}

export interface AuditMasterDet {
    s_TemplateCode: string;
    s_AuditCode: string;
    s_PlantCode: string;
    s_PlantHead: string;
    s_PlantQualityHead: string;
    d_AuditDate: Date;
    s_TotalScore: string;
    s_Status: string;
    s_Signature: string;
    b_IsActive: boolean;
    AuditSelectedAns: AuditSelectedAn[];
}

export interface AuditQuestion {
    s_QueCode: string;
    s_TemplateCode: string;
    s_AnswerType: string;
    s_Question: string;
    b_IsMandatory: boolean;
    n_sequence: number;
    b_IsAnswered:boolean;
    AuditMappedScore: AuditMappedScore[];
    AuditQuestionDetails: AuditQuestionDetail[];
    AuditMasterDet: AuditMasterDet[];
}

export interface ResponseData {
    s_TemplateCode: string;
    s_TemplateName: string;
    s_Status:string;
    AuditQuestion: AuditQuestion[];
}

export interface RootObject {
    ResponseCode: string;
    ResponseMessage: string;
    ResponseData: ResponseData[];
}

export interface AuditCodeDetail {
    ActionType?:string;
    s_TemplateCode?:string;
    s_EmployeeCode?:string;
    s_PlantCode?:string;
    s_PlantHead?:string;
    s_PlantQualityHead?:string;
    d_AuditDate?:Date;
    s_CreatedBy?:string;
}


export interface Template {
    ActionType: string;
    s_AuditCode: string;
    s_EmployeeCode?: string;
    s_PlantCode?: string;
  }

  export interface InsertAuditDetailList
  {
    s_AuditCode:string;
    s_AnsCode:string;
    s_AnsValue:string;
    s_ScoreNo:string;
    n_QueationMapId:string;
    s_PlantCode:string;
    b_IsActive:string;
    s_CreatedBy:string;
    s_QueCode:string;
    s_Observation:string;
    s_Suggestion:string;
    d_PerformedDate:string;
  }

  export interface Score
  {
    s_AuditCode:string;
    s_PlantCode:string;
    s_CreatedBy:string;
    s_ScoreDataJson:ScoreAns[];
  }
  export interface ScoreAns
  {
    s_QuestionCode:string;
    n_FinalScore:BigInteger;
  }

  export interface InsertUpdateAuditStatus 
  {
    ActionType:string;
    s_AuditCode:string;
    s_PlantCode :string;
    s_Value :string;
    s_EmployeeCode :string;
  }


  export interface passRole
  {
    EmpCode:string;
    EmployeeRole:any[]
  }