export interface Policy {
  Version: Date;
  Statement: Statement[];
}

export interface Statement {
  Sid: string;
  Effect: string;
  Action: string[];
  Resource: string[] | string;
}
