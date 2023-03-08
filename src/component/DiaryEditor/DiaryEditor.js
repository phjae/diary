import React, { useContext, useEffect, useRef, useState } from "react";
import "./DiaryEditor.css";
import { DiaryDispatchContext } from "../../App";

const DiaryEditor = () => {
  const { onCreate } = useContext(DiaryDispatchContext);
  //함수 3개로 이루어진 객체라 비구조화 할당 {}으로 받아와야함

  useEffect(() => {
    console.log("render");
  });
  const inputAuthor = useRef();
  const inputContents = useRef();
  const [state, setState] = useState({
    author: "",
    contents: "",
    emotion: 1,
  });

  const handleChangeState = (e) => {
    e.preventDefault();
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };
  const handleSubmitDiary = (e) => {
    e.preventDefault();
    if (state.author.length < 1) {
      inputAuthor.current.focus();
      return;
    }
    if (state.contents.length < 5) {
      inputContents.current.focus();
      return;
    }
    onCreate(state.author, state.contents, state.emotion);
    setState({
      author: "",
      contents: "",
      emotion: 1,
    });
    alert("저장 성공");
  };

  return (
    <div className="diary-editor">
      <h2>오늘의 일기</h2>
      <form onSubmit={handleSubmitDiary}>
        <input
          name="author"
          ref={inputAuthor}
          className="author"
          type="text"
          value={state.author}
          onChange={handleChangeState}
        />
        <textarea
          name="contents"
          ref={inputContents}
          className="contents"
          value={state.contents}
          onChange={handleChangeState}
        />
        <div className="score-wrap">
          <div className="score-tit">오늘의 감정점수 :</div>
          <select
            name="emotion"
            value={state.emotion}
            onChange={handleChangeState}
          >
            <option value={1}>1</option>
            <option value={2}>2</option>
            <option value={3}>3</option>
            <option value={4}>4</option>
            <option value={5}>5</option>
          </select>
        </div>
        <button>일기 저장하기</button>
      </form>
    </div>
  );
};

export default React.memo(DiaryEditor);
