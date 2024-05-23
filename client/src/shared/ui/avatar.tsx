import React from "react";
import Image from "next/image";

import { Avatar as AvatarMui } from "@mui/material";

import { stringAvatar } from "../lib/helpers";

interface AvatarProps {
  avatarUrl: string;
  userName: string;
  userSurname: string;
}

export const Avatar: React.FC<AvatarProps> = ({
  avatarUrl,
  userName,
  userSurname,
}) => {
  return (
    <>
      {avatarUrl ? (
        <Image
          src={`http://localhost:4000/account/profile-image/${avatarUrl}`}
          width={40}
          height={40}
          alt="profile-image"
          style={{ borderRadius: "50%" }}
        />
      ) : (
        <AvatarMui {...stringAvatar(`${userName} ${userSurname}`)} />
      )}
    </>
  );
};
