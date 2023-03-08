import React, { useContext, useRef, useState } from "react";
import "./DiaryItem.css";
import { DiaryDispatchContext } from "../../App";

const DiaryItem = ({ id, author, contents, created_at, emotion }) => {
  const { onDelete, onEdit } = useContext(DiaryDispatchContext);

  const [isEdit, setIsEdit] = useState(false);
  const [localContents, setLocalContents] = useState(contents);
  const localContentsInput = useRef();
  const toggleIsEdit = () => {
    setIsEdit(!isEdit);
  };
  const handleEditChange = (e) => {
    e.preventDefault();
    setLocalContents(e.target.value);
  };
  const handleQuitEdit = () => {
    setIsEdit(false);
    setLocalContents(contents);
  };
  const handleSaveEdit = () => {
    if (localContents.length < 5) {
      localContentsInput.current.focus();
      return;
    }
    if (window.confirm(`${id}번째 일기를 정말 수정하시겠습니까?`)) {
      onEdit(id, localContents);
      setIsEdit(false);
    }
  };
  const handleDelete = () => {
    if (window.confirm(`${id}번째 일기를 정말 삭제하시겠습니까?`)) {
      onDelete(id);
    }
  };

  return (
    <div className="diary-item">
      <div className="info">
        <span>
          작성자: {author} | 감정점수: {emotion}
        </span>
        <div className="date">{new Date(created_at).toLocaleString()}</div>
      </div>
      <div className="content">
        {isEdit ? (
          <>
            <textarea
              ref={localContentsInput}
              value={localContents}
              onChange={handleEditChange}
            />
          </>
        ) : (
          <>{contents}</>
        )}
      </div>
      <div className="btn">
        {isEdit ? (
          <>
            <button onClick={handleQuitEdit}>취소하기</button>
            <button onClick={handleSaveEdit}>수정완료</button>
          </>
        ) : (
          <>
            <button onClick={handleDelete}>삭제하기</button>
            <button onClick={toggleIsEdit}>수정하기</button>
          </>
        )}
      </div>
    </div>
  );
};

export default React.memo(DiaryItem);
