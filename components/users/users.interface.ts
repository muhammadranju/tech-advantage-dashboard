export interface IUsersTableProps {
  status: string;
  joiningDate: string;
  name: string;
  email: string;
  _id: string;
  id: number;
  map: string;
  time: string;
  userStatus: string;
  createdAt: Date;
}

export interface IUsersTable {
  users: Array<IUsersTableProps>;
}
