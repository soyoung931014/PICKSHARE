import React, { useState } from 'react';
import { IoIosCloseCircleOutline } from 'react-icons/io';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { modalOffAction } from '../../redux/actions';
import FollowerList from '../Feed/PersonalFeed/FollowerList';
import FollowingList from '../Feed/PersonalFeed/FollowingList';
import FollowList from '../Feed/PersonalFeed/FollowerList';

export interface modalProps {
  follower: any;
  following: any;
  follow: boolean;
  setFollow: (follow: boolean) => boolean | void;
}
export default function Modal({
  follower,
  following,
  follow,
  setFollow,
}: modalProps) {
  const dispatch = useDispatch();
  const { isModalOn } = useSelector(
    (modalReducer: any) => modalReducer.modalInfo
  );
  const [ fClicked, setFClicked ] = useState(false);

  const handleClose = (e: any) => {
    dispatch(modalOffAction);
  };

  const followerClick = () => {
    setFClicked(false)
  }
  const followingClick = () => {
    setFClicked(true)
  }

  return (
    <>
      {isModalOn ? (
        <ModalBackdrop>
          <ModalContainer>
            <ListBtn>
              <button onClick={followerClick}>팔로워 {follower.length}</button>
              <button onClick={followingClick}>팔로잉 {following.length}</button>
              <IoIosCloseCircleOutline onClick={handleClose} />
            </ListBtn>
            <List className="follower">
              {
                fClicked ? (
                  <div>
                    {following.id === ''
                      ? `${following}이 없습니다`
                      : following.map((el: any) => (
                          <FollowingList
                            {...el}
                            key={el.id}
                            follow={follow}
                            setFollow={setFollow}
                          />
                        )
                      )
                    }
                  </div>
                ) : (
                  <div>
                    {follower.id === '' ? (
                      <>팔로워가 없습니다</>
                      ) : (
                        follower.map((el: any) => (
                          <FollowerList
                            {...el}
                            key={el.id}
                            follow={follow}
                            setFollow={setFollow}
                          />
                        ))
                      )
                    }
                  </div>
                )
              }
            </List>
          </ModalContainer>
        </ModalBackdrop>
      ) : null}
    </>
  );
}

const ModalBackdrop = styled.div`
  position: fixed;
  z-index: 999;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background-color: rgba(0, 0, 0, 0.4);
  display: grid;
  place-items: center;
`;

const ModalContainer = styled.div`
  width: 20rem;
  height: 30rem;
  background-color: #ebf1f1;
  opacity: 0.8;
  border-radius: 12%;
  padding: 2rem 0.5rem;
`;
const ListBtn = styled.div`
  display: grid;
  grid-template-columns: 5fr 5fr 1fr;
  font-size: 17px;
`
const List = styled.button`
`;