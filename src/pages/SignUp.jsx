const SignUp = () => {
  // 회원가입 완료가 되었다는 페이지를 따로 보여줄지
  // 회원가입이 완료되면 main(home)이나 shop으로 이동

  const signIn = () => {};

  return (
    <div className="wrap">
      <form className="sign-up">
        <label htmlFor="">Name</label>
        <input type="text" />
        <label htmlFor="">E-mail Address</label>
        <input type="email" />
        <label htmlFor="">Passwrod</label>
        <input type="password" />
        <label htmlFor="">Confirm Password</label>
        <input type="passwrod" />
        <input type="submit" value="SIGN UP" />
      </form>
      <div>
        Have an Account? <button onClick={signIn}>SIGN IN</button>
      </div>
    </div>
  );
};

export default SignUp;
