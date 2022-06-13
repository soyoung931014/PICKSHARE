/* eslint-disable @typescript-eslint/no-unused-vars */
import api from './index';

const commentApi = {
  // 선택한 게시글의 코멘트 모두 불러오기
  findAllComment: () => {
    return api.get(`/comment/1`);
  },
  // 댓글 작성

  //   PostComment: (a, accessToken) => {
  //     return api.post(
  //       '/comment',
  //       {
  //         text: a,
  //         board_id: 1,
  //       },
  //       {
  //         headers: { authorization: `Bearer ${accessToken}` },
  //       }
  //     );
  //   }
  //   //댓글 수정
  //   PatchComment: (id, b) => {
  //   return api.patch(`/comment/1`, {
  //           comment_id: id,
  //           text: b,
  //         })
  //       }

  //   DeleteComment: (id) => {
  //     return api .delete(`/comment/1`, {
  //           data: { comment_id: id },
  //         })
  //   }
  // };
};
export default commentApi;
