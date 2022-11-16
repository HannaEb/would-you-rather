import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api",
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.user.accessToken;
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["Question"],
  endpoints: (builder) => ({
    getQuestions: builder.query({
      query: () => "/questions",
      transformResponse: (response) =>
        response.questions.reduce((acc, curr) => {
          acc[curr.id] = curr;
          return acc;
        }, {}),
      providesTags: ["Question"],
    }),
    addQuestion: builder.mutation({
      query: (initialQuestion) => ({
        url: "/questions",
        method: "POST",
        body: initialQuestion,
      }),
      invalidatesTags: ["Question"],
    }),
    getUsers: builder.query({
      query: () => "/users",
      transformResponse: (response) =>
        response.users.reduce((acc, curr) => {
          acc[curr.id] = curr;
          return acc;
        }, {}),
    }),
  }),
});

export const {
  useGetQuestionsQuery,
  useAddQuestionMutation,
  useGetUsersQuery,
} = apiSlice;
