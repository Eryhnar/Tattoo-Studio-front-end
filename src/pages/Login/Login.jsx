import "./Login.css";
import { CInput } from "../../common/CInput/CInput";
import { Header } from "../../common/Header/Header";
import { CButton } from "../../common/CButton/CButton";

export const Login = () => {
  return (
    <>
      <Header />
      <div className="loginDesign">
        <CInput
          className="inputDesign"
          type="email"
          placeholder="email@yourdomain.com"
          name="email"
          disabled=""
          value=""
          onChangeFunction={() => { }}
        />
        <CInput
          className="inputDesign"
          type="password"
          placeholder="password"
          name="password"
          disabled=""
          value=""
          onChangeFunction={() => { }}
        />
        <CButton
          className="loginButton"
          title="Log in"
          onClickFunction={() => { }}
        />
      </div>
    </>
  );
}