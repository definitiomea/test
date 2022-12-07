import { createContext, useState } from "react";

const DataContext = createContext();

const DataProvider = ({ children }) => {
  // 유저정보
  const [user, setUser] = useState({ name: "고객명" });

  const value = { state: { user }, action: { setUser } };

  // 댓글 정보

  return <DataContext.Provider value={value}>{children}</DataContext.Provider>;
};

// consumer 작성
// DataContext의 값을 가져와서 DataConsumer으로 사용
const { Consumer: DataConsumer } = DataContext;

// 컴포넌트로 사용하기위해 export > .Provider 대신 사용할 컴포넌트 : App 전체를 감쌈
export { DataConsumer, DataProvider };
// 값을 사용하기위해 가져오는 컨텍스트 export > 각컴포넌트에서 useContext로 가져올 것
export default DataContext;
