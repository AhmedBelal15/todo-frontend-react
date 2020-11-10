import React from "react";
import { useForm } from "../../CustomHooks/useForm";
import FormInput from "../Form Input/FormInput.component";
import CustomButton from "../CustomButton/CustomButton.component";
import { useAlert } from "react-alert";
import "./SignUp.Style.css";

const SignUp = () => {
  const alert = useAlert();
  const handleSubmit = async (e) => {
    e.preventDefault();
    const { name, email, password, confirmPassword } = values;
    if (password !== confirmPassword) {
      alert.show("Passwords don't match");
      return;
    }
    const response = await fetch("https://aqueous-earth-51842.herokuapp.com/user/register", {
      method: "post",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name,
        email,
        password,
      }),
    });
    const data = await response.json();

    if (data === "Email already exists") {
      alert.show(data);
    } else if (data.msg === "Registered") {
      alert.show('Registered! please log in')
    }
  };

  const [values, handleChange] = useForm({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  return (
    <div className="sign-up">
      <h2 className="title">I don't have an account</h2>
      <span className="font-cnd">Sign Up with your email and password</span>

      <form onSubmit={handleSubmit}>
        <FormInput
          type="text"
          name="name"
          value={values.name}
          onChange={handleChange}
          label="Display Name"
          required
        />
        <FormInput
          type="email"
          name="email"
          value={values.email}
          onChange={handleChange}
          label="Email"
          required
        />
        <FormInput
          type="password"
          name="password"
          value={values.password}
          onChange={handleChange}
          label="Password"
          required
          minLength="6"
        />

        <FormInput
          type="password"
          name="confirmPassword"
          value={values.confirmPassword}
          onChange={handleChange}
          label="confirmPassword"
          required
          minLength="6"
        />

        <CustomButton type="submit">SIGN UP</CustomButton>
      </form>
    </div>
  );
};

export default SignUp;
