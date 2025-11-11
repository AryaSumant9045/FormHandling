import { useState } from "react";
import { useForm } from "react-hook-form";
import "./App.css";

function App() {
  const {
    register,
    handleSubmit,
    setError,
    watch,
    formState: { errors ,isSubmitting},
  } = useForm();

 const Delay = (d)=>{
  return new Promise((resolve, reject)=>{
    setTimeout(() => {
      resolve()
    }, d*1000);
  })
 }
  const onSubmit = async(data) => {
    // await Delay(2) //simulating network delay
    let r = await fetch('http://localhost:3000/')
    let res = await r.json()
    console.log(data)
    // if(data.username !== "sumant"){
    //   setError("myform",{message:"Credientials are invalid!"})
    // }
    // if(data.username == "ankush"){
    //   setError("blocked",{message:"Credientials are invalid for this user!"})
    // }
  };

  return (
    <>
    {isSubmitting&&<div>Loading...</div>}
      <div className="container">
        <form action="" form onSubmit={handleSubmit(onSubmit)}>
          <input
            placeholder="username"
            {...register("username", {
              required: { value: true, message: "This field is required" },
              minLength: { value: 3, message: "min length is 3" },
              maxLength: { value: 8, message: "max length is 8" },
            })}
            type="text"
          />
          {errors.username && (
            <div className="red">{errors.username.message}</div>
          )}
          <br />
          <input
            placeholder="password"
            {...register("password",{minLength: { value: 7, message: "min length of password is 7" }})}
            type="password"
          />
          {errors.password && (
            <div className="red">{errors.password.message}</div>
          )}
          <br />
          <input disabled={isSubmitting} type="submit" value="submit" />
          {errors.myform && (
            <div className="red">{errors.myform.message}</div>
          )}
          {errors.blocked && (
            <div className="red">{errors.blocked.message}</div>
          )}
        </form>
      </div>
    </>
  );
}

export default App;
