export interface Student {
  _id: string;
  firstName: string;
  lastName: string;
  gender: string;
}

export interface StudentRequest extends Student {
//   subject: string; //id te, tea if we put id when get data from that object, we see id.name or something like that.
}

export interface Subject {
  _id: string;
  name: string;
}

export interface StudentListing extends Student {
//   subject: Subject;
}
