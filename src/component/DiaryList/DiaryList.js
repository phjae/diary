import React, { useContext } from "react";
import DiaryItem from "../DiaryItem/DiaryItem";
import "./DiaryList.css";
import { DiaryStateContext } from "../../App";

const DiaryList = () => {
  const diaryList = useContext(DiaryStateContext);
  return (
    <div className="diary-list">
      <h2>일기 리스트</h2>
      <div className="num-info">{diaryList.length}개의 일기가 있습니다.</div>
      {diaryList.map((data) => (
        <DiaryItem key={data.id} {...data} />
      ))}
    </div>
  );
};

export default DiaryList;
