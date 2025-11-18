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
import { parseISO, format } from "date-fns";

import { IUsersTableProps } from "./users.interface";
import {
  useBlockedUserMutation,
  useGetAllUsersQuery,
  useUnblockUserMutation,
} from "@/lib/redux/features/api/users/userApiSlice";
import { toast } from "sonner";

const FilterUsers = ({ users }: any) => {
  const [modalState, setModalState] = useState<{
    isOpen: boolean;
    action: "activate" | "block" | null;
    user: IUsersTableProps | null;
  }>({
    isOpen: false,
    action: null,
    user: null,
  });

  const [blockUser, { isLoading: isBlocking }] = useBlockedUserMutation();
  const [unblockUser, { isLoading: isUnblocking }] = useUnblockUserMutation();
  const { refetch } = useGetAllUsersQuery(null);

  const handleActivateUser = (user: IUsersTableProps) => {
    setModalState({
      isOpen: true,
      action: "activate",
      user: user,
    });
  };

  const handleBlockUser = (user: IUsersTableProps) => {
    setModalState({
      isOpen: true,
      action: "block",
      user: user,
    });
  };

  const confirmAction = async () => {
    if (!modalState.user || !modalState.action) return;

    try {
      if (modalState.action === "activate") {
        await unblockUser(modalState.user._id).unwrap();
        toast.success("User activated successfully!");
      } else if (modalState.action === "block") {
        await blockUser(modalState.user._id).unwrap();
        toast.success("User blocked successfully!");
      }

      // Refetch the data to update the UI
      await refetch();
    } catch (error) {
      console.error("Error updating user status:", error);
      // You might want to show an error toast here
    } finally {
      closeModal();
    }
  };

  const closeModal = () => {
    setModalState({
      isOpen: false,
      action: null,
      user: null,
    });
  };

  // Format createdAt date using date-fns
  const formatDate = (isoDate: string) => {
    try {
      const date = parseISO(isoDate);
      return format(date, "MM/dd/yyyy");
    } catch (error) {
      toast.error((error as string) || "Invalid Date");
      return "Invalid Date";
    }
  };

  const isLoading = isBlocking || isUnblocking;

  return (
    <>
      <div className="divide-y divide-border px-3">
        {users()?.map((user: IUsersTableProps) => (
          <div
            key={user._id}
            className="grid grid-cols-5 gap-4 p-4 items-center hover:bg-muted/30 transition-colors"
          >
            <div className="text-sm font-medium text-foreground">
              {user.name}
            </div>
            <div className="text-sm text-muted-foreground">{user.email}</div>
            <div>
              <Badge
                variant="secondary"
                className={`${
                  user.userStatus === "active"
                    ? "bg-green-500/20 hover:bg-green-500 hover:text-green-50 text-green-600"
                    : "bg-red-500/20 hover:bg-red-500 hover:text-red-50 text-red-600"
                }`}
              >
                {user.userStatus === "blocked" ? "Blocked" : "Active"}
              </Badge>
            </div>
            <div className="text-sm text-muted-foreground">
              {formatDate(user.createdAt as unknown as string)}
            </div>
            <div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 p-0"
                    disabled={isLoading}
                  >
                    <MoreVertical className="h-4 w-4" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="p-0 rounded-none">
                  {user.userStatus === "blocked" ? (
                    <DropdownMenuItem
                      onClick={() => handleActivateUser(user)}
                      className="bg-green-500 text-white rounded-none focus:text-white focus:bg-green-600"
                      disabled={isLoading}
                    >
                      <Check className="text-white mr-2 h-4 w-4" />
                      Activate User
                    </DropdownMenuItem>
                  ) : (
                    <DropdownMenuItem
                      onClick={() => handleBlockUser(user)}
                      className="bg-red-500 text-white focus:text-white rounded-none focus:bg-red-600"
                      disabled={isLoading}
                    >
                      <ImBlocked className="text-white mr-2 h-4 w-4" />
                      Block User
                    </DropdownMenuItem>
                  )}
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
              {modalState.action === "activate" ? (
                <>
                  <Check className="h-5 w-5 text-green-600" />
                  Activate User
                </>
              ) : (
                <>
                  <ImBlocked className="h-5 w-5 text-red-600" />
                  Block User
                </>
              )}
            </AlertDialogTitle>
            <AlertDialogDescription>
              {modalState.action === "activate" ? (
                <>
                  Are you sure you want to activate{" "}
                  <strong>{modalState.user?.name}</strong>? This will grant them
                  access to the system.
                </>
              ) : (
                <>
                  Are you sure you want to block{" "}
                  <strong>{modalState.user?.name}</strong>? This will prevent
                  them from accessing the system.
                </>
              )}
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel onClick={closeModal} disabled={isLoading}>
              <X className="h-4 w-4 mr-2" />
              Cancel
            </AlertDialogCancel>
            <AlertDialogAction
              onClick={confirmAction}
              disabled={isLoading}
              className={`${
                modalState.action === "activate"
                  ? "bg-green-600 hover:bg-green-700"
                  : "bg-red-600 hover:bg-red-700"
              }`}
            >
              {isLoading ? (
                <>
                  <div className="h-4 w-4 mr-2 animate-spin rounded-full border-2 border-white border-t-transparent" />
                  Processing...
                </>
              ) : modalState.action === "activate" ? (
                <>
                  <Check className="h-4 w-4 mr-2" />
                  Activate
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
