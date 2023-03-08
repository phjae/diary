import "./App.css";
import DiaryEditor from "./component/DiaryEditor/DiaryEditor";
import DiaryList from "./component/DiaryList/DiaryList";
import React, {
  useCallback,
  useEffect,
  useMemo,
  useReducer,
  useRef,
} from "react";

const reducer = (state, action) => {
  switch (action.type) {
    case "INIT": {
      return action.data; //action에서 받은 데이터를 전달
    }
    case "CREATE": {
      const created_date = new Date().getTime();
      const newItem = {
        ...action.data,
        created_date,
      };
      return [newItem, ...state];
    }
    case "DELETE":
      return state.filter((d) => d.id !== action.targetId);
    case "EDIT": {
      return state.map((d) =>
        d.id === action.targetId ? { ...d, contents: action.newContents } : d
      );
    }
    default:
      return state;
  }
};
export const DiaryStateContext = React.createContext();
export const DiaryDispatchContext = React.createContext();

function App() {
  //const [data, setData] = useState([]);
  const [data, dispatch] = useReducer(reducer, []);
  const dataId = useRef(0);

  const getData = async () => {
    const res = await fetch(
      "https://jsonplaceholder.typicode.com/comments"
    ).then((res) => res.json());

    const initData = res.slice(0, 10).map((it) => {
      return {
        author: it.email,
        contents: it.body,
        emotion: Math.floor(Math.random() * 5) + 1,
        created_date: new Date().getTime(),
        id: dataId.current++,
      };
    });
    dispatch({ type: "INIT", data: initData });
    //setData(initData);
  };
  useEffect(() => {
    getData();
  }, []);

  const onCreate = useCallback((author, contents, emotion) => {
    dispatch({
      type: "CREATE",
      data: { author, contents, emotion, id: dataId.current },
    });
    //const created_date = new Date().getTime();
    // const newItem = {
    //   author,
    //   contents,
    //   emotion,
    //   created_date,
    //   id: dataId.current,
    // };
    dataId.current += 1;
    // setData((data) => [newItem, ...data]);
  }, []);

  const onEdit = useCallback((targetId, newContents) => {
    // setData((data) =>
    //   data.map((d) => (d.id === targetId ? { ...d, contents: newContents } : d))
    // );
    dispatch({ type: "EDIT", targetId, newContents });
  }, []);

  const onDelete = useCallback((targetId) => {
    //setData((data) => data.filter((it) => it.id !== targetId));
    dispatch({ type: "DELETE", targetId });
  }, []);

  const getDiaryAnalysis = useMemo(() => {
    const goodCount = data.filter((it) => it.emotion >= 3).length;
    const badCount = data.length - goodCount;
    const goodRatio = (goodCount / data.length) * 100;
    return { goodCount, badCount, goodRatio };
  }, [data.length]);

  const { goodCount, badCount, goodRatio } = getDiaryAnalysis;

  const memoizedDispatches = useMemo(() => {
    return { onCreate, onDelete, onEdit };
  }, []);

  return (
    <DiaryStateContext.Provider value={data}>
      <DiaryDispatchContext.Provider value={memoizedDispatches}>
        <div className="App">
          <DiaryEditor />
          <div>전체 일기: {data.length} </div>
          <div>기분 좋은 일기 개수: {goodCount} </div>
          <div>기분 나쁜 일기 개수: {badCount} </div>
          <div>기분 좋은 일기 비율: {goodRatio} </div>
          <DiaryList />
        </div>
      </DiaryDispatchContext.Provider>
    </DiaryStateContext.Provider>
  );
}

export default App;
