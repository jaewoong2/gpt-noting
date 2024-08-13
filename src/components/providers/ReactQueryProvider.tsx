"use client";

import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import React, { PropsWithChildren, useState } from "react";

const queryClient = new QueryClient();

const ReactQueryProvider = ({ children }: PropsWithChildren) => {
  const [qClient] = useState(queryClient);

  return <QueryClientProvider client={qClient}>{children}</QueryClientProvider>;
};

export default ReactQueryProvider;
