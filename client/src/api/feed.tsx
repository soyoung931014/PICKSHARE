/*eslint-disable*/
import api from './index';

const feedApi = {
    getMainFeed: () => {
        return api.get('/feed/mainfeed');
    },

    getHeart: (board_id: number) => {
        return api.get(`/heart?board_id=${board_id}`);
    },

    getComment: () => {
        return api.get('/comment')
    },

    postHeart: (info: any, board_id: number) => {
        return api.post(
            '/heart', 
            {
                info,
                'board_id': board_id 
            },
            // {
            //     headers: {
            //         'AuthorizationToken': accessToken
            //     }
            // }
        )
    }
    
};

export default feedApi;