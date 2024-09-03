export interface Teacher {
  _id: string;
  firstName: string;
  lastName: string;
  gender: string;
  phoneNumber: string;
}

export interface TeacherRequest extends Teacher {
  subject: string; //id te, tea if we put id when get data from that object, we see id.name or something like that.
}

export interface Subject {
  _id: string;
  name: string;
}

export interface TeacherListing extends Teacher {
  subject: Subject;
}
