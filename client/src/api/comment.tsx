import api from './index';

const commentApi = {
  // 선택한 게시글의 코멘트 모두 불러오기
  findAllComment: (boardId: number) => {
    return api.get(`/comment/${boardId}`);
  },
  // 댓글 작성
  PostComment: (boardId: number, text: string, accessToken: string) => {
    return api.post(
      '/comment',
      {
        text,
        board_id: boardId,
      },
      {
        headers: { authorization: `Bearer ${accessToken}` },
      }
    );
  },
  //댓글 수정
  PatchComment: (boardId: number, id: number, text: string) => {
    return api.patch(`/comment/${boardId}`, {
      comment_id: id,
      text,
    });
  },

  DeleteComment: (boardId: number, id: number) => {
    return api.delete(`/comment/${boardId}`, {
      data: { comment_id: id },
    });
  },
};
export default commentApi;
