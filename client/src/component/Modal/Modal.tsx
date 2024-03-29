import React, { useState } from 'react';
import { IoIosCloseCircleOutline } from 'react-icons/io';
import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import styled from 'styled-components';
import { modalOffAction } from '../../redux/actions';
import FollowerList from '../Feed/PersonalFeed/FollowerList';
import FollowingList from '../Feed/PersonalFeed/FollowingList';
import { modalProps } from '../../types/feedType';
import { RootState } from '../../redux';

export default function Modal({
  follower,
  following,
  follow,
  setFollow,
}: modalProps) {
  const dispatch = useDispatch();
  const { isModalOn } = useSelector(
    (modalReducer: RootState) => modalReducer.modalInfo
  );
  const [fClicked, setFClicked] = useState(false);

  const handleClose = () => {
    dispatch(modalOffAction);
  };

  const followerClick = () => {
    setFClicked(false);
  };
  const followingClick = () => {
    setFClicked(true);
  };

  return (
    <>
      {isModalOn ? (
        <ModalBackdrop>
          <ModalContainer>
            <ListBtn>
              <Button Selected={!fClicked} onClick={followerClick}>
                팔로워 {follower.length}
              </Button>
              <Button Selected={fClicked} onClick={followingClick}>
                팔로잉 {following.length}
              </Button>
              <Close onClick={handleClose} />
            </ListBtn>
            <List className="follower">
              {fClicked ? (
                <div>
                  {following.length === 0
                    ? '팔로잉 목록이 없습니다'
                    : following.map((el) => (
                        <FollowingList
                          {...el}
                          key={el.id}
                          follow={follow}
                          setFollow={setFollow}
                        />
                      ))}
                </div>
              ) : (
                <div>
                  {follower.length === 0
                    ? '팔로워가 없습니다'
                    : follower.map((el) => (
                        <FollowerList
                          {...el}
                          key={el.id}
                          follow={follow}
                          setFollow={setFollow}
                        />
                      ))}
                </div>
              )}
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
  border-radius: 1rem;
  padding: 2rem 0.5rem;
`;
const ListBtn = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
`;
const List = styled.button`
  padding-top: 10px;
  width: 300px;
`;
const Button = styled.button<{ Selected: boolean }>`
  flex: 1 0 auto;
  font-size: 1rem;
  font-weight: 600;
  color: ${(props) => (props.Selected ? 'violet' : 'black')};
  background-color: ${(props) => (props.Selected ? 'white' : 'null')};
  height: 2rem;
  border-radius: 1rem;
  margin-left: 12px;
  :hover {
    cursor: pointer;
    background-color: white;
    border-radius: 1rem;
  }
`;
const Close = styled(IoIosCloseCircleOutline)`
  position: relative;
  top: -27px;
  right: 3px;
`;
