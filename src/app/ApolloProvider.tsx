"use client";
import React from "react";

import { ApolloProvider } from "@apollo/client";
import client from "@/lib/graphql-client";

const ApolloClientProvider = ({ children }: { children: React.ReactNode }) => {
  return <ApolloProvider client={client}>{children}</ApolloProvider>;
};

export default ApolloClientProvider;
