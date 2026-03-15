import { useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import { useDispatch, useSelector } from "react-redux";
import { userActions } from "./action/userAction";
import { cartActions } from "./action/cartAction";
import "./style/common.style.css";
import AppLayout from "./Layout/AppLayout";
import AppRouter from "./routes/AppRouter";

function App() {
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.user);

  useEffect(() => {
    dispatch(userActions.loginWithToken()); // 로그인 유지
  }, []);

  useEffect(() => {
    if (user) {
      dispatch(cartActions.getCartList()); // 로그인 상태면 카트 로드
    }
  }, [user]);

  return (
    <div>
      <AppLayout>
        <AppRouter />
      </AppLayout>
    </div>
  );
}

export default App;