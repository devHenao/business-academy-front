export interface IStudentResponse {
  page:        number;
  per_page:    number;
  total:       number;
  total_pages: number;
  data:        IStudent[];
  support:     Support;
}

export interface IStudent {
  id:         number;
  email:      string;
  first_name: string;
  last_name:  string;
  avatar:     string;
}

export interface Support {
  url:  string;
  text: string;
}


export interface State {
  student: IStudent[]
  loading: boolean;
}
