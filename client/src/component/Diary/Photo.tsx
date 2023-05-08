import { useRef } from 'react';
import styled from 'styled-components';
import { FormValues } from '../../pages/DiaryPage';

const AWS = require('aws-sdk/dist/aws-sdk-react-native');

export interface photoProps {
  boardInput: FormValues;
  setBoardInput: (boardInput: FormValues) => FormValues | void;
}

export default function Photo({ boardInput, setBoardInput }: photoProps) {
  const file: any = useRef();

  AWS.config.update({
    region: `${process.env.REACT_APP_AWS_REGION}`, // congito IdentityPoolId 리전을 문자열로 입력하기. 아래 확인 (Ex. "ap-northeast-2")
    credentials: new AWS.CognitoIdentityCredentials({
      IdentityPoolId: `${process.env.REACT_APP_AWS_IMG_ID}`, // cognito 인증 풀에서 받아온 키를 문자열로 입력하기. (Ex. "ap-northeast-2...")
    }),
  });

  const pickImgHandle = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const imgFile = e.target.files[0];
    /* 개체가 null인 것 같습니다 에러 없애기 위해
    1. e: any로 타입지정
    2. tsconfig.json에서 "sstrictNullChecks":"false"설정
    3. 유니온타입설정
    */
   if (!imgFile) {
      return setBoardInput({
        ...boardInput,
        [e.target.name]: '',
      });
    }
    setBoardInput({
      ...boardInput,
      [e.target.name]: imgFile,
    });
    const uploadImg = new AWS.S3.ManagedUpload({
      params: {
        Bucket: 'profileimage-pickshare',
        Key: imgFile.name,
        Body: imgFile,
      },
    });

    const promise = uploadImg.promise();

    await promise.then(
      (data: { Location: any }) => {
        setBoardInput({
          ...boardInput,
          [e.target.name]: data.Location,
        });
      },
      (err: any) => {
        console.log(err);
      }
    );
  };
  return (
    <>
      <label htmlFor="pick-file"></label>
      <form>
        <input
          type="file"
          id="pickFile"
          ref={file}
          accept="image/*"
          onChange={pickImgHandle}
          name="picture"
        />
        {boardInput.picture !== '' ? (
          <Img src={boardInput.picture} alt="picture" />
        ) : (
          'Pick the PickShare'
        )}
      </form>
    </>
  );
}

const Img = styled.img`
  box-sizing: border-box;
  width: 100%;
  height: 100%;
`;