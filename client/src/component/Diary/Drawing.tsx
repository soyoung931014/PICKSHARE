/* eslint-disable */
import { useEffect, useRef, useState } from 'react';
import styled from 'styled-components';
import { FormValues } from '../../pages/DiaryPage';
import { v4 as uuidv4 } from 'uuid';
const AWS = require('aws-sdk/dist/aws-sdk-react-native');

const DiaryWrap = styled.div`
  border: #a396f8 solid 2px;
  border-radius: 10px;
  width: 90%;
  height: 90%;

  h3 {
    text-align: center;
  }

  div.drawing {
    margin: auto;
    background-color: #fff;
    border-radius: 1rem;
    position: relative;
  }
  button.close_btn {
    margin: 0;
    padding: 1rem 1.2rem;
    font-size: 1.5em;
    line-height: 1;
    color: var(--color-black);
    border: none;
    background: none;
    cursor: pointer;
    position: absolute;
    top: 0;
    right: 0;
  }
  button.close_btn:hover {
    color: var(--color-red);
  }
  div.controls_range {
    margin-top: 1rem;
    font-size: 0.9em;
    color: #666;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }
  div.controls_btns {
    display: flex;
    justify-content: center;
  }
  div.controls_btns button {
    margin: 1.2rem 0.2rem 0.5rem;
    padding: 0.3rem 0.6rem;
    border: 1px solid #ccc;
    background: #fff;
    border-radius: 4px;
  }
  div.controls_btns button.active {
    border: 1px solid #999;
    box-shadow: 0 0 4px 0 rgba(0, 0, 0, 0.2);
  }
  ul {
    margin: 1rem;
    display: flex;
    justify-content: center;
  }
  li {
    width: 2.5rem;
    height: 2.5rem;
    margin: 0 0.2rem;
    border-radius: 50%;
    cursor: pointer;
  }

  p {
    text-align: center;
    color: var(--color-black);
  }
`;
const CanvasWrap = styled.div`
  width: 100%;
  height: auto;
  min-height: 30vh;

  margin: auto;
  background-color: #eee;
  position: relative;
  canvas {
    border: 2px solid #ccc;
    background-color: #fff;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    cursor: pointer;
  }
`;
const Img = styled.img`
  box-sizing: border-box;
  width: 100%;
  height: 100%;
`;

export interface drawingProps {
  boardInput: FormValues;
  setBoardInput: (boardInput: FormValues) => FormValues | void;
  setPickWay: (pickWay: number) => number | void;
  pickWay: number;
}
export default function Drawing({
  boardInput,
  setBoardInput,
  setPickWay,
  pickWay,
}: drawingProps) {
  const canvasRef = useRef(null);
  const inputFile: any = useRef();
  const [isDrawing, setIsDrawing] = useState(false);
  const [isFillMode, setIsFillMode] = useState(false);
  const [lineWidth, setLineWidth] = useState(7.5);
  const [drawingImg, setDrawingImg] = useState('');
  const previousImg = boardInput.picture;

  // ????????? ??????
  const image = new Image();
  useEffect(() => {
    const canvas = canvasRef.current;

    canvas.style.width = '100%';
    canvas.style.height = '100%';
    // ...then set the internal size to match
    canvas.width = canvas.offsetWidth;
    canvas.height = canvas.offsetHeight;

    const ctx = canvas.getContext('2d');
    image.setAttribute('crossOrigin', '*');
    image.src = previousImg;
    image.onload = () => {
      ctx.drawImage(image, 0, 0);
    };
    ctx.strokeStyle = '#2c2c2c';
    ctx.lineWidth = 7.5;
    ctx.fillStyle = '#fff';
    ctx.fillRect(0, 0, ctx.canvas.width, ctx.canvas.height);
  }, []);

  // Draw start
  function initDraw({ nativeEvent }: any) {
    setIsDrawing(true);

    const ctx = canvasRef.current.getContext('2d');

    const { offsetX, offsetY } = nativeEvent;

    ctx.beginPath();
    ctx.moveTo(offsetX, offsetY);
  }
  // Draw ?????????
  function draw({ nativeEvent }: any) {
    if (!isDrawing) {
      return;
    }

    const ctx = canvasRef.current.getContext('2d');

    const { offsetX, offsetY } = nativeEvent;

    ctx.lineTo(offsetX, offsetY);
    ctx.stroke();
  }

  // finish ?????????
  function finishDraw() {
    setIsDrawing(false);
  }

  // color ?????? ??????
  function handleColorClick({ nativeEvent }: any) {
    const ctx = canvasRef.current.getContext('2d');
    if (!isFillMode) {
      // fill?????? false?????? ??? ?????? ??????
      ctx.strokeStyle = nativeEvent.target.style.backgroundColor;
    } else {
      // fill???????????? ?????? ????????? ?????? ???????????? ????????? ????????? paint ????????? ??????
      ctx.globalCompositeOperation = 'multiply';
      ctx.fillStyle = nativeEvent.target.style.backgroundColor;
      ctx.fillRect(0, 0, canvasRef.current.width, canvasRef.current.height);
      setIsFillMode(!isFillMode);
      ctx.globalCompositeOperation = 'source-over';
    }
  }
  // lineWidth ?????? ??????
  const handleRangeChange = ({ nativeEvent }: any) => {
    const ctx = canvasRef.current.getContext('2d');
    const size = nativeEvent.target.value;
    ctx.lineWidth = size;
    setLineWidth(size);
  };

  // ????????? Clear
  function fillWhiteHandler(event: any) {
    const ctx = canvasRef.current.getContext('2d');
    //????????? fillStyle??? white??? ?????????
    ctx.fillStyle = 'white';
    ctx.fillRect(0, 0, canvasRef.current.width, canvasRef.current.height);
    //fillRect(x?????????, y?????????, width, height)
  }
  // Fill, Paint ?????? ?????? ??????
  function fillModeHandler(event: any) {
    // fill ?????? ????????? fill ?????? true??? ?????? (????????? ???????????? ??????)
    if (event.target.dataset.mode === 'fill') {
      setIsFillMode(true);
    }
    // pain ?????? ????????? fill ?????? false??? ?????? (????????? ???????????? ??????)
    else if (event.target.dataset.mode === 'paint') {
      setIsFillMode(false);
    }
  }
  // ?????? ?????? ??????
  AWS.config.update({
    region: `${process.env.REACT_APP_AWS_REGION}`, // congito IdentityPoolId ????????? ???????????? ????????????. ?????? ?????? (Ex. "ap-northeast-2")
    credentials: new AWS.CognitoIdentityCredentials({
      IdentityPoolId: `${process.env.REACT_APP_AWS_IMG_ID}`, // cognito ?????? ????????? ????????? ?????? ???????????? ????????????. (Ex. "ap-northeast-2...")
    }),
  });

  function dataURItoBlob(dataURI: string) {
    var binary = atob(dataURI.split(',')[1]);
    var array = [];
    for (var i = 0; i < binary.length; i++) {
      array.push(binary.charCodeAt(i));
    }
    return new Blob([new Uint8Array(array)], { type: 'image/png' });
  }

  const SaveImgHandler = async (e: any) => {
    const image = canvasRef.current.toDataURL('image/png');
    const link = document.createElement('a');
    setPickWay(1);
    alert('????????? ?????????????????????.');

    const newFileName = uuidv4();
    const imgfile = dataURItoBlob(image);

    const upload = new AWS.S3.ManagedUpload({
      params: {
        Bucket: 'profileimage-pickshare', // ???????????? ?????? ????????? ???????????? ??????.
        Key: newFileName, //???????????? ?????????
        Body: imgfile, // ???????????? ?????? ??????
      },
    });

    const promise = upload.promise();

    await promise.then(
      function (data: { Location: any }) {
        setBoardInput({
          ...boardInput,
          ['picture']: data.Location,
        });
      },
      function (err: any) {
        console.log(err, '???????????? ??????');
      }
    );
  };

  return (
    <DiaryWrap id="page">
      <div className="drawing">
        <CanvasWrap>
          <canvas
            ref={canvasRef}
            onMouseDown={initDraw}
            onMouseUp={finishDraw}
            onMouseMove={draw}
            onMouseLeave={finishDraw}
          />
        </CanvasWrap>
        <div className="controls">
          <div className="controls_range">
            <input
              type="range"
              min="0.1"
              max="15"
              value={lineWidth}
              step="0.1"
              onChange={handleRangeChange}
            />
            <div>{lineWidth}</div>
          </div>
          <div className="controls_btns">
            <button onClick={(e) => fillWhiteHandler(e)}>Clear</button>
            <button
              onClick={(e) => fillModeHandler(e)}
              className={!isFillMode ? 'active' : ''}
              data-mode="paint"
            >
              Paint
            </button>
            <button
              onClick={(e) => fillModeHandler(e)}
              className={isFillMode ? 'active' : ''}
              data-mode="fill"
            >
              Fill
            </button>
            <button onClick={SaveImgHandler} name="picture">
              Save
            </button>
          </div>
        </div>
        {/* ?????? ????????? */}
        <ul>
          <li
            style={{ backgroundColor: '#ffffff', border: '1px solid #ccc' }}
            onClick={handleColorClick}
          />
          <li
            style={{ backgroundColor: '#fffafa' }}
            onClick={handleColorClick}
          />
          <li
            style={{ backgroundColor: '#2c2c2c' }}
            onClick={handleColorClick}
          />
          <li
            style={{ backgroundColor: '#FAEBD7' }}
            onClick={handleColorClick}
          />
          <li
            style={{ backgroundColor: '#a52a2a' }}
            onClick={handleColorClick}
          />
          <li
            style={{ backgroundColor: '#d26c6c' }}
            onClick={handleColorClick}
          />
          <li
            style={{ backgroundColor: '#d2691e' }}
            onClick={handleColorClick}
          />
          <li
            style={{ backgroundColor: '#ffbb00' }}
            onClick={handleColorClick}
          />
          <li
            style={{ backgroundColor: '#8fbc8f' }}
            onClick={handleColorClick}
          />
          <li
            style={{ backgroundColor: '#339933' }}
            onClick={handleColorClick}
          />
          <li
            style={{ backgroundColor: '#b7e2fc' }}
            onClick={handleColorClick}
          />
          <li
            style={{ backgroundColor: '#4682b4' }}
            onClick={handleColorClick}
          />
          <li
            style={{ backgroundColor: '#f2f2fc' }}
            onClick={handleColorClick}
          />
          <li
            style={{ backgroundColor: '#c37fcc' }}
            onClick={handleColorClick}
          />
        </ul>
        {/* <p>*????????? ????????? ????????? ?????? ???????????? ????????? ???????????????</p> */}
      </div>
    </DiaryWrap>
  );
}
