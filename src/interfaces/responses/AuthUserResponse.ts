interface AuthUserResponse {
  user: {
    name: string;
    surname: string;
    username: string;
    phone: string;
    profileImg: string;
    email: string;
    role: string;
  };
  token: string;
}
export default AuthUserResponse;
//kullanılmıyor henüz response type olarak kullanılsa çok daha iyi olur