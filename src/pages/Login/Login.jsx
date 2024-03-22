import "./Login.css";

export const Login = () => {
  return (
    <div className="loginDesign">
        <CInput className="input" type="text" placeholder="John" name="name" disabled={false} value="" onChangeFunction={() => {}} />
    </div>
  );
}