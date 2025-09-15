export interface IUsersTableProps {
  status: string;
  joiningDate: string;
  name: string;
  email: string;
  id: number;
  map: string;
  time: string;
}

export interface IUsersTable {
  users: Array<IUsersTableProps>;
}
