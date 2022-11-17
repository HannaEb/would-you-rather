import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api",
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.accessToken;
      if (token) {
        headers.set("authorization", `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ["Question"],
  endpoints: (builder) => ({
    registerUser: builder.mutation({
      query: (data) => ({
        url: "/auth/signup",
        method: "POST",
        body: data,
      }),
    }),
    loginUser: builder.mutation({
      query: (credentials) => ({
        url: "/auth/signin",
        method: "POST",
        body: credentials,
      }),
    }),
    getQuestions: builder.query({
      query: () => "/questions",
      providesTags: ["Question"],
      transformResponse: (response) =>
        response.questions.reduce((acc, curr) => {
          acc[curr.id] = curr;
          return acc;
        }, {}),
    }),
    addQuestion: builder.mutation({
      query: (initialQuestion) => ({
        url: "/questions",
        method: "POST",
        body: initialQuestion,
      }),
      invalidatesTags: ["Question"],
    }),
    updateQuestion: builder.mutation({
      query: (question) => ({
        url: `/questions/${question.id}`,
        method: "PATCH",
        body: question,
      }),
      invalidatesTags: ["Question"],
    }),
    deleteQuestion: builder.mutation({
      query: (id) => ({
        url: `/questions/${id}`,
        method: "DELETE",
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
  useRegisterUserMutation,
  useLoginUserMutation,
  useGetQuestionsQuery,
  useAddQuestionMutation,
  useUpdateQuestionMutation,
  useDeleteQuestionMutation,
  useGetUsersQuery,
} = apiSlice;
