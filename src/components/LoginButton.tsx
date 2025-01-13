"use client";

import { ConnectButton } from "thirdweb/react";
import { client } from "../app/utils/client";
import {
  generatePayload,
  isLoggedIn,
  login,
  logout,
} from "../app/actions/auth";
import { rootstockTestnet } from "../app/utils/consts";

export const LoginButton = () => {
  return (
    <ConnectButton
      autoConnect={true}
      client={client}
      chain={rootstockTestnet}
      auth={{
        isLoggedIn: async (address) => {
          console.log("checking if logged in!", { address });
          return await isLoggedIn();
        },
        doLogin: async (params) => {
          console.log("logging in!");
          await login(params);
        },
        getLoginPayload: async ({ address }) => generatePayload({ address }),
        doLogout: async () => {
          console.log("logging out!");
          await logout();
        },
      }}
    />
  );
};
