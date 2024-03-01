import { useState } from "react";
import { useRouter } from "next/router";
import { useAppContext } from "@/context/AppContext";
import { gql, useMutation } from "@apollo/client";
import Cookie from "js-cookie";

import Form from "@/components/Form/Form";
import Loader from "@/components/Loader";
import styles from "@/components/Form/Form.module.css";

const REGISTER_MUTATION = gql`
  mutation Register($username: String!, $email: String!, $password: String!) {
    register(
      input: { username: $username, email: $email, password: $password }
    ) {
      jwt
      user {
        username
        email
      }
    }
  }
`;
const LOGIN_MUTATION = gql`
  mutation Login($identifier: String!, $password: String!) {
    login(input: { identifier: $identifier, password: $password }) {
      jwt
      user {
        username
        email
      }
    }
  }
`;
export default function RegisterRoute() {
  const { setUser } = useAppContext();
  const router = useRouter();

  const [formData, setFormData] = useState({ email: "", password: "" });
  const [registerMutation, { loading, error }] = useMutation(REGISTER_MUTATION);
  const [loginMutation, { loading:loadingLogin, error:errorLogin }] = useMutation(LOGIN_MUTATION);

  const handleRegister = async () => {
    const { email, password } = formData;
    const { data } = await registerMutation({
      variables: { username: email, email: email, password },
    });
    if (data?.register.user) {
      setUser(data.register.user);
      router.push("/");
      Cookie.set("token", data.register.jwt);
    }
  };
  const handleDemoLogin = async () => {
    const email = "test@test.com";
    const password = "test1234";
    const { data } = await loginMutation({
      variables: { identifier: email, password },
    });
    if (data?.login.user) {
      setUser(data.login.user);
      Cookie.set("token", data.login.jwt);
      router.push("/");
    }
  }
  if (loading || loadingLogin) return <Loader />;

  return (
    <section className={`${styles.form_user_signup_image} inline-flex items-center justify-center w-full`}>
      <Form
      title="Sign Up"
      buttonText="Sign Up"
      formData={formData}
      setFormData={setFormData}
      callback={handleRegister}
      error={error || errorLogin}
      demoClick={handleDemoLogin}
    />
        </section>
    
  );
}