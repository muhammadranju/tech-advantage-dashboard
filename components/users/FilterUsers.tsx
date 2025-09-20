// /* eslint-disable @typescript-eslint/no-explicit-any */
// import { DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
// import { Check, MoreVertical } from "lucide-react";
// import { ImBlocked } from "react-icons/im";
// import { Badge } from "../ui/badge";
// import { Button } from "../ui/button";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
// } from "../ui/dropdown-menu";

// import { IUsersTableProps } from "./users.interface";

// const FilterUsers = ({ users }: any) => {
//   const handelBlockUser = (user: IUsersTableProps) => {
//     console.log(user);
//   };

//   return (
//     <div className="divide-y divide-border px-3">
//       {users()?.map((user: IUsersTableProps) => (
//         <div
//           key={user.id}
//           className="grid grid-cols-5 gap-4 p-4 items-center hover:bg-muted/30 transition-colors"
//         >
//           <div className="text-sm font-medium text-foreground">{user.name}</div>
//           <div className="text-sm text-muted-foreground">{user.email}</div>
//           <div>
//             <Badge
//               variant="secondary"
//               className={`${
//                 user.status === "Newest"
//                   ? "bg-green-500/20 hover:bg-green-500 text-green-600"
//                   : "bg-yellow-500/20 hover:bg-yellow-500 text-yellow-600"
//               }`}
//             >
//               {user.status === "Newest" ? "New" : "Old"}
//             </Badge>
//           </div>
//           <div className="text-sm text-muted-foreground">
//             {user.joiningDate}
//           </div>
//           <div>
//             <DropdownMenu>
//               <DropdownMenuTrigger asChild>
//                 <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
//                   <MoreVertical className="h-4 w-4" />
//                 </Button>
//               </DropdownMenuTrigger>
//               <DropdownMenuContent align="end" className="p-0   rounded-none">
//                 <DropdownMenuItem
//                   onClick={() => handelBlockUser(user)}
//                   className="bg-green-500 text-white rounded-none focus:text-white  focus:bg-green-600"
//                 >
//                   <Check className="text-white" />
//                   Approve User
//                 </DropdownMenuItem>
//                 <DropdownMenuItem
//                   onClick={() => handelBlockUser(user)}
//                   className="bg-red-500 text-white focus:text-white  rounded-none  focus:bg-red-600"
//                 >
//                   <ImBlocked className="text-white" />
//                   Block User
//                 </DropdownMenuItem>
//               </DropdownMenuContent>
//             </DropdownMenu>
//           </div>
//         </div>
//       ))}
//     </div>
//   );
// };

// export default FilterUsers;


/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from "react";
import { DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";
import { Check, MoreVertical, X } from "lucide-react";
import { ImBlocked } from "react-icons/im";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
} from "../ui/dropdown-menu";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from "../ui/alert-dialog";

import { IUsersTableProps } from "./users.interface";

const FilterUsers = ({ users }: any) => {
  const [modalState, setModalState] = useState<{
    isOpen: boolean;
    action: 'approve' | 'block' | null;
    user: IUsersTableProps | null;
  }>({
    isOpen: false,
    action: null,
    user: null,
  });

  const handleApproveUser = (user: IUsersTableProps) => {
    setModalState({
      isOpen: true,
      action: 'approve',
      user: user,
    });
  };

  const handleBlockUser = (user: IUsersTableProps) => {
    setModalState({
      isOpen: true,
      action: 'block',
      user: user,
    });
  };

  const confirmAction = () => {
    if (modalState.user && modalState.action) {
      console.log(`${modalState.action} user:`, modalState.user);
      // Add your actual approve/block logic here
      if (modalState.action === 'approve') {
        // Handle approve user logic
        console.log('User approved:', modalState.user.name);
      } else if (modalState.action === 'block') {
        // Handle block user logic
        console.log('User blocked:', modalState.user.name);
      }
    }
    closeModal();
  };

  const closeModal = () => {
    setModalState({
      isOpen: false,
      action: null,
      user: null,
    });
  };

  return (
    <>
      <div className="divide-y divide-border px-3">
        {users()?.map((user: IUsersTableProps) => (
          <div
            key={user.id}
            className="grid grid-cols-5 gap-4 p-4 items-center hover:bg-muted/30 transition-colors"
          >
            <div className="text-sm font-medium text-foreground">{user.name}</div>
            <div className="text-sm text-muted-foreground">{user.email}</div>
            <div>
              <Badge
                variant="secondary"
                className={`${
                  user.status === "Newest"
                    ? "bg-green-500/20 hover:bg-green-500 text-green-600"
                    : "bg-yellow-500/20 hover:bg-yellow-500 text-yellow-600"
                }`}
              >
                {user.status === "Newest" ? "New" : "Old"}
              </Badge>
            </div>
            <div className="text-sm text-muted-foreground">
              {user.joiningDate}
            </div>
            <div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="p-0 rounded-none">
                  <DropdownMenuItem
                    onClick={() => handleApproveUser(user)}
                    className="bg-green-500 text-white rounded-none focus:text-white focus:bg-green-600"
                  >
                    <Check className="text-white" />
                    Approve User
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    onClick={() => handleBlockUser(user)}
                    className="bg-red-500 text-white focus:text-white rounded-none focus:bg-red-600"
                  >
                    <ImBlocked className="text-white" />
                    Block User
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        ))}
      </div>

      {/* Confirmation Modal */}
      <AlertDialog open={modalState.isOpen} onOpenChange={closeModal}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2">
              {modalState.action === 'approve' ? (
                <>
                  <Check className="h-5 w-5 text-green-600" />
                  Approve User
                </>
              ) : (
                <>
                  <ImBlocked className="h-5 w-5 text-red-600" />
                  Block User
                </>
              )}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {modalState.action === 'approve' ? (
                <>
                  Are you sure you want to approve <strong>{modalState.user?.name}</strong>? 
                  This will grant them access to the system.
                </>
              ) : (
                <>
                  Are you sure you want to block <strong>{modalState.user?.name}</strong>? 
                  This will prevent them from accessing the system.
                </>
              )}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={closeModal}>
              <X className="h-4 w-4 mr-2" />
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmAction}
              className={`${
                modalState.action === 'approve'
                  ? 'bg-green-600 hover:bg-green-700'
                  : 'bg-red-600 hover:bg-red-700'
              }`}
            >
              {modalState.action === 'approve' ? (
                <>
                  <Check className="h-4 w-4 mr-2" />
                  Approve
                </>
              ) : (
                <>
                  <ImBlocked className="h-4 w-4 mr-2" />
                  Block
                </>
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
};

export default FilterUsers;