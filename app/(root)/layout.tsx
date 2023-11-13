import React from "react";
import {auth} from "@clerk/nextjs";
import {redirect} from "next/navigation";

import prismadb from "@/lib/primsmadb";

export default async function SetupLayout({
    children
                                          }: {
    children: React.ReactNode;
}){
    const {userId} = auth();

    if (!userId) {
        redirect('/sign-in');
    }

    const store = await prismadb.store.findFirst({
        where: {
            userId
        }
    });

    if (store) {
        redirect(`/${store.id}`);
    }

    return (
      <>
          {children}
      </>
    );
}