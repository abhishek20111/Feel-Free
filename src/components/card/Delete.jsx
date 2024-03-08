import React from "react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import Delete_Post from "../../../public/assets/dele.png";
import { deletePost } from "@/lib/actions/No_action";
import { useToast } from "@/components/ui/use-toast";
import Image from "next/image";
function Delete({ id }) {
  const { toast } = useToast();

  const handleDelete = async (id) => {
    try {
      // Call deletePost function with the post ID
      const response = await deletePost(id);
      console.log(response);
      toast({
        variant: "success",
        title: "Post Deleted Successfully",
      });
      // Reload the page after successful deletion
      window.location.reload()
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Error in deleting post",
        description: error,
      });
      console.error("Error deleting post:", error);
    }
  };

  return (
    <AlertDialog>
      <AlertDialogTrigger className="flex items-center sm:gap-4 cursor-pointer">
        <Image src={Delete_Post} height={30} width={30} alt="Delete" />
        <h1 className="sm:block hidden">Delete</h1>
      </AlertDialogTrigger>
      <AlertDialogContent className="bg-white">
        <AlertDialogHeader>
          <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
          <AlertDialogDescription>
            This will permanently delete your post and no recovery is
            possible.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          {/* Pass the post ID to handleDelete function */}
          <AlertDialogAction onClick={() => handleDelete(id)}>
            Continue
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

export default Delete;
