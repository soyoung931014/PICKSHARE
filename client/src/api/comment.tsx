/* eslint-disable @typescript-eslint/no-unused-vars */
import api from './index';

const commentApi = {
  // 선택한 게시글의 코멘트 모두 불러오기
  findAllComment: () => {
    return api.get(`/comment/1`);
  },
  // 댓글 작성
};
export default commentApi;
