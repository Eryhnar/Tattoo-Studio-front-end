import "./Login.css";
import { CInput } from "../../common/CInput/CInput";
import { Header } from "../../common/Header/Header";

export const Login = () => {
  return (
    <>
      <Header />
      <div className="loginDesign">
        <CInput
          className="input"
          type="text"
          placeholder="John"
          name="name"
          disabled={false}
          value=""
          onChangeFunction={() => { }}
        />
      </div>
    </>
  );
}