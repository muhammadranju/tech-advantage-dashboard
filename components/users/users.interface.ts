export interface IUsersTableProps {
  status: string;
  joiningDate: string;
  name: string;
  email: string;
  id: number;
}

export interface IUsersTable {
  users: Array<IUsersTableProps>;
}
