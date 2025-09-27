export interface IUsersTableProps {
  [x: string]: string | number | Date;
  id: number;
  name: string;
  email: string;
  status: string;
  joiningDate: string;
  userStatus: string;
}
export const users: IUsersTableProps[] = [
  // {
  //   id: 1,
  //   name: "John b",
  //   email: "xyzhpc@gmail.com",
  //   status: "Newest",
  //   joiningDate: "10/09/25",
  // },
  // {
  //   id: 2,
  //   name: "John b",
  //   email: "xyzhpc@gmail.com",
  //   status: "Oldest",
  //   joiningDate: "10/09/25",
  // },
  // {
  //   id: 3,
  //   name: "John b",
  //   email: "xyzhpc@gmail.com",
  //   status: "Newest",
  //   joiningDate: "10/09/25",
  // },
  // {
  //   id: 4,
  //   name: "John b",
  //   email: "xyzhpc@gmail.com",
  //   status: "Oldest",
  //   joiningDate: "10/09/25",
  // },
  // {
  //   id: 5,
  //   name: "John b",
  //   email: "xyzhpc@gmail.com",
  //   status: "Oldest",
  //   isActive: true,
  //   joiningDate: "10/09/25",
  // },
  // {
  //   id: 6,
  //   name: "John b",
  //   email: "xyzhpc@gmail.com",
  //   status: "Newest",
  //   joiningDate: "10/09/25",
  // },
  // {
  //   id: 7,
  //   name: "John b",
  //   email: "xyzhpc@gmail.com",
  //   status: "Oldest",
  //   isActive: false,
  //   joiningDate: "10/09/25",
  // },
  // {
  //   id: 8,
  //   name: "Alice W",
  //   email: "alice@gmail.com",
  //   status: "Newest",
  //   joiningDate: "10/09/25",
  // },
  // {
  //   id: 9,
  //   name: "Bob K",
  //   email: "bob@gmail.com",
  //   status: "Oldest",
  //   joiningDate: "10/09/25",
  // },
  // {
  //   id: 10,
  //   name: "Charlie P",
  //   email: "charlie@gmail.com",
  //   status: "Newest",
  //   joiningDate: "10/09/25",
  // },
  // {
  //   id: 11,
  //   name: "David L",
  //   email: "david@gmail.com",
  //   status: "Oldest",
  //   joiningDate: "10/09/25",
  // },
  // {
  //   id: 12,
  //   name: "Eva S",
  //   email: "eva@gmail.com",
  //   status: "Oldest",
  //   joiningDate: "10/09/25",
  // },
  // {
  //   id: 13,
  //   name: "Frank T",
  //   email: "frank@gmail.com",
  //   status: "Newest",
  //   isActive: false,
  //   joiningDate: "10/09/25",
  // },
  // {
  //   id: 14,
  //   name: "Grace H",
  //   email: "grace@gmail.com",
  //   status: "Oldest",
  //   joiningDate: "10/09/25",
  // },
  // {
  //   id: 15,
  //   name: "Hannah R",
  //   email: "hannah@gmail.com",
  //   status: "Newest",
  //   joiningDate: "10/09/25",
  // },
  // {
  //   id: 16,
  //   name: "Ivy D",
  //   email: "ivy@gmail.com",
  //   status: "Oldest",
  //   joiningDate: "10/09/25",
  // },
  // {
  //   id: 17,
  //   name: "Jack Q",
  //   email: "jack@gmail.com",
  //   status: "Newest",
  //   joiningDate: "10/09/25",
  // },
];

async function getUsers() {
  return users;
}

export default getUsers;

// _id: "68ba2e8554abaccee2b8606a"
// name: "Liton Miah"
// email: "litonakash846@gmail.com"
// userStatus: "active"
// createdAt: "2025-09-05T00:27:49.893Z"

// status: "active"
// updatedAt: "2025-09-06T20:21:40.604Z"
// verified: true
