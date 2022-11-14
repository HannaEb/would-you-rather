import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api",
  }),
  endpoints: (builder) => ({
    getQuestions: builder.query({
      query: () => "/questions",
    }),
  }),
});

export const { useGetQuestionsQuery } = apiSlice;
