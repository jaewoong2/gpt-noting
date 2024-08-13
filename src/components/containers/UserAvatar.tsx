import Image from "next/image";
import React from "react";
import { useAuthContext } from "../providers/AuthContextProvider";

const UserAvatar = () => {
  const { avatar, userName } = useAuthContext();

  return (
    <figure className="w-10 h-10 rounded-full overflow-hidden border">
      <Image src={avatar} alt={userName} width={40} height={40} />
    </figure>
  );
};

export default UserAvatar;
