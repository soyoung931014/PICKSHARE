/*eslint-disable*/
import api from './index';

const feedApi = {
  getMainFeed: (start: number, end: number) => {
    return api.get(`/feed?start=${start}&end=${end}`);
  },
  getHeart: (board_id: number, accessToken: string) => {
    return api.get(
      `/heart?board_id=${board_id}`,
      {
        headers: {
          authorization: `Bearer ${accessToken}`
        }
      }
      );
  },
  getComment: () => {
    return api.get('/comment');
  },
  getUserFeed: (nickname: string, start: number, end: number) => {
    return api.get(`/feed/mainfeed?nickname=${nickname}&start=${start}end=${end}`);
  },
  getMyFeed: (accessToken: string, start: number, end: number) => {
    return api.get('/feed/myfeed?start=${start}&end=${end}',{
      headers: {
        authorization: `Bearer ${accessToken}`,
      },
    })
  },
  postHeart: (info: any, board_id: number, accessToken: string) => {
    return api.post(
      '/heart',
      {
        info,
        board_id: board_id,
      },
      {
        headers: {
          authorization: `Bearer ${accessToken}`,
        },
      }
    );
  },
  deleteHeart: (info: any, board_id: number, accessToken: string) => {
    return api.delete('/heart', {
      data: { info, board_id: board_id },
      headers: {
        authorization: `Bearer ${accessToken}`,
      },
    });
  },
  searchHeart: (info: any, board: number, accessToken: string) => {
    return api.get(`/heart?board_id=${board}`, {
      data: { info },
      headers: {
        authorization: `Bearer ${accessToken}`,
      },
    });
  },
  userInfo: (nickname: string) => {
    return api.get(`/user/userInfo?userNickname=${nickname}`);
  },
  postFollow: ( nickname: string, accessToken: string ) => {
    return api.post(
      '/follow/',
      {
        'followingNickname': nickname,
      },
      {
        headers: {
          authorization: `Bearer ${accessToken}`,
        },
      }
    );
  },
  deleteFollow: (nickname: string, accessToken: string ) => {
    return api.delete(
      `/follow?followingNickname=${nickname}`,
      {
        headers: {
          authorization: `Bearer ${accessToken}`,
        },
      }
    )
  },
  searchFollow: (nickname: string, accessToken: string) => {
    return api.get(
      `/follow/follow?userNickname=${nickname}`,
      {
        headers: {
          authorization: `Bearer ${accessToken}`,
        },
      }
    )
  },
  getFollowingList: (nickname: string) => {
    return api.get(
       `/follow/following?nickname=${nickname}`
    )
  },
  getFollowerList: (nickname: string) => {
    return api.get(
      `follow/follower?nickname=${nickname}`
    )
  },
};

export default feedApi;
