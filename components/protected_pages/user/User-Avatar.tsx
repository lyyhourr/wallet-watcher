"use client";
import { Button } from "@/components/ui/button";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import Image from "next/image";
import { useRouter } from "next/navigation";
import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { v4 as uuidv4 } from "uuid";
import {
  AlertDialog,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { inter } from "@/fonts/Fonts";

export default function UserAvatar({ userId }: { userId: string }) {
  const supabase = createClientComponentClient();
  const [media, setMedia] = useState<any[]>([]);
  const router = useRouter();

  const uploadImage = async (e: any) => {
    const file = e.target.files[0];
    if (!file) {
      return;
    }

    const { data, error } = await supabase.storage
      .from("user_pf")
      .upload(userId + "/" + uuidv4(), file);
    if (error) {
      toast.error(error.message);
      return;
    }
    toast.success("profile uploaded");
    getMedia();


    // const isExistingImage = media.length > 0;

    // if (!isExistingImage) {
    //   const { data, error } = await supabase.storage
    //     .from("user_pf")
    //     .upload(userId + "/" + uuidv4(), file);
    //   if (error) {
    //     toast.error(error.message);
    //     return;
    //   }
    //   toast.success("profile uploaded");
    //   getMedia();
    // } else {
    //   const { data, error } = await supabase.storage
    //     .from("user_pf")
    //     .update(`${userId}/${media[0].name}`, file);
    //   if (error) {
    //     toast.error(error.message);
    //     return;
    //   }
    //   toast.success("profile updated");
    //   getMedia();
    // }
  };

  const handleDeleteImage = async () => {
    const { data, error } = await supabase.storage
      .from("user_pf")
      .remove([`${userId}/${media[0].name}`]);
    if (error) {
      toast.error(error.message);
    }
    if (data) {
      toast.success("pfp deleted");
      getMedia();
    }
  };

  useEffect(() => {
    getMedia();
  }, []);

  async function getMedia() {
    //  fetch all data from userId as folder name
    const { data, error } = await supabase.storage
      .from("user_pf")
      .list(userId + "/");

    if (data) {
      setMedia(data);
    } else {
      console.log(71, error);
    }
  }

  const imageUrl = `https://quxwwbszmhifyfrqslyf.supabase.co/storage/v1/object/public/user_pf/${userId}/${media[0]?.name}`;
  return (
    <div className="w-full flex justify-between items-center">
      <Image
        src={media[0] ? imageUrl : "/images/user.png"}
        width={1000}
        height={1000}
        alt="user avatar"
        className="w-[100px] h-[100px] rounded-full bg-cover"
      />
      <div className="flex items-center gap-1">
        {
          !media[0] && (
            <Button className="relative" variant={"default"}>
              <label htmlFor="file-input" className="cursor-pointer">
                {/* {!media[0] ? "Upload" : "Update"} Profile */}
                Upload
              </label>
              <input
                id="file-input"
                type="file"
                className="hidden"
                onChange={(e) => uploadImage(e)}
              />
            </Button>
          )
        }
        {media[0] && (
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button variant={"destructive"}>Delete</Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <p className={`${inter.className} text-lg`}>
                  Are you sure you want to your profile picture?
                </p>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete
                  your profile picture on your account and remove your profile
                  picture from our servers.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel>Cancel</AlertDialogCancel>
                <Button variant={"destructive"} onClick={handleDeleteImage}>
                  delete
                </Button>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        )}
      </div>
    </div>
  );
}
