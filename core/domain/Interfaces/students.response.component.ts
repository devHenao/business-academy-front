export interface IStudentResponse {
  page:        number;
  per_page:    number;
  total:       number;
  total_pages: number;
  data:        IStudent[];
  support:     Support;
}

export interface  Student{
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


// export interface State {
//   student: IStudent[]
//   loading: boolean;
// }
export interface State {
  student: any[]
  loading: boolean;
}

export interface IStudent {
  id:        number;
  docType:   string;
  document:  number;
  firstName: string;
  lastName:  string;
  course:    string;
  address:   string;
  city:      string;
  district:  string;
  attendant: string;
  active:    boolean;
}
