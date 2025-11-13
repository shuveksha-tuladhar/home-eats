import { useState } from "react";
import { useRouter } from "next/router";
import { useAppContext } from "@/context/AppContext";
import { gql, useMutation } from "@apollo/client";
import Cookie from "js-cookie";

import Register from "@/components/Register/Register";
import Loader from "@/components/Loader";

const REGISTER_MUTATION = gql`
  mutation Register($createUserInput: CreateUserInput!) {
    register(input: $createUserInput) {
      jwt
      username
      email
    }
  }
`;
const LOGIN_MUTATION = gql`
  mutation Login($identifier: String!, $password: String!) {
    login(identifier: $identifier, password: $password) {
      jwt
      username
      email
    }
  }
`;
export default function RegisterRoute() {
  const { setUser } = useAppContext();
  const router = useRouter();

  const [formData, setFormData] = useState({
    email: "",
    password: "",
    firstName: "",
    lastName: "",
    phoneNumber: "",
    addresses: {
      address: "",
      city: "",
      state: "",
      zipCode: "",
      isPrimary: true,
    },
  });
  const [registerMutation, { loading, error }] = useMutation(REGISTER_MUTATION);
  const [loginMutation, { loading: loadingLogin, error: errorLogin }] =
    useMutation(LOGIN_MUTATION);

  const handleRegister = async () => {
    const { email, password, firstName, lastName, phoneNumber, addresses } =
      formData;
    const { data } = await registerMutation({
      variables: {
        createUserInput: {
          email,
          password,
          firstName,
          lastName,
          username: email.split("@")[0],
          phoneNumber,
          addresses: { ...addresses },
        },
      },
    });
    if (data?.register.username && data?.register.email) {
      setUser({ username: data.register.username, email: data.register.email });
      router.push("/");
      Cookie.set("token", data.register.jwt);
    }
  };
  const handleDemoLogin = async () => {
    const email = "harry.potter@test.com";
    const password = "test1234";
    const { data } = await loginMutation({
      variables: { identifier: email, password },
    });
    if (data?.login.username && data?.login.email) {
      setUser({ username: data.login.username, email: data.login.email });
      Cookie.set("token", data.login.jwt);
      router.push("/");
    }
  };
  if (loading || loadingLogin) return <Loader />;

  return (
    <section className="relative min-h-[calc(100vh-140px)] sm:min-h-[calc(100vh-120px)] md:min-h-[calc(100vh-100px)] lg:min-h-screen bg-gradient-to-br from-lightbg to-lightbg2 flex items-center py-4 sm:py-6 md:py-8 lg:py-0 overflow-hidden">
      <div className="absolute inset-0 bg-[url('/v2/background-register.jpg')] bg-cover bg-center -z-10" />
      <div className="container mx-auto px-4 flex justify-center items-center">
        <div className="w-full max-w-xl bg-white bg-opacity-90 rounded-xl shadow-lg p-6 sm:p-8">
          <Register
            title="Sign Up"
            buttonText="Sign Up"
            formData={formData}
            setFormData={setFormData}
            callback={handleRegister}
            error={error || errorLogin}
            demoClick={handleDemoLogin}
          />
        </div>
      </div>
    </section>
  );
}
