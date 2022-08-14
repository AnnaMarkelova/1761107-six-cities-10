import { createSlice } from '@reduxjs/toolkit';
import { NameSpace } from '../../../../consts/api-route';
import { CommentsData } from '../../../../types/state';
import { fetchCommentsAction, fetchNewCommentAction } from '../../api-actions';

const initialState: CommentsData = {
  comments: [],
  isCommentLoading: false,
  isDataLoading: false
};

export const commentsData = createSlice({
  name: NameSpace.DataComments,
  initialState,
  reducers: {},
  extraReducers(builder) {
    builder
      .addCase(fetchCommentsAction.pending, (state) => {
        state.isDataLoading = true;
      })
      .addCase(fetchCommentsAction.fulfilled, (state, action) => {
        state.comments = action.payload;
        state.isDataLoading = false;
      })
      .addCase(fetchCommentsAction.rejected, (state, action) => {
        state.isDataLoading = false;
      })
      .addCase(fetchNewCommentAction.pending, (state) => {
        state.isCommentLoading = true;
      })
      .addCase(fetchNewCommentAction.fulfilled, (state) => {
        state.isCommentLoading = false;
      })
      .addCase(fetchNewCommentAction.rejected, (state) => {
        state.isCommentLoading = false;
      });
  }
});
