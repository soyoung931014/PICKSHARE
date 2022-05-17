/*eslint-disable*/
import api from './index';

const mainfeedApi = {
    getMainFeed: () => {
        return api.get('/feed/mainfeed');
    },

    getHeart: (board_id: number) => {
        return api.get(`/heart?board_id=${board_id}`);
    },

    getComment: () => {
        return api.get('/comment')
    }
};

export default mainfeedApi;