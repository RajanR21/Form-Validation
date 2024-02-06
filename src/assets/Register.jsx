import React from "react";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";

let schema = yup.object({
  firstName: yup.string().required("FirstName required"),
  lastName: yup.string().required("LastName required"),
  age: yup.number().required("Age Required").positive().integer(),
  password: yup
    .string()
    .required("Password Required")
    .test(
      "len",
      "Password needs to be atleast 8 digits",
      (val) => !(val.toString().length < 8)
    ),

  confirmPassword: yup
    .string()
    .required("Required")
    .test(
      "len",
      "Zip code needs to be atleast 8 digits",
      (val) => !(val.toString().length < 8)
    )
    .oneOf([yup.ref("password"), null], "Password should be same !"),

  email: yup.string().required("Email required").email("Invalid email address"),
});

const Register = () => {
  const { register, handleSubmit, formState } = useForm({
    defaultValues: {
      firstName: "Rajan",
      lastName: "R",
      age: 20,
      password: "123456789",
      confirmPassword: "123456789",
      email: "example@gmail.com",
    },
    resolver: yupResolver(schema),
  });

  const { errors } = formState;
  const onSubmit = (data) => console.log(data);

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <input
          {...register("firstName")}
          className="block w-50% rounded-md border-0 py-1.5 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        />
        <p>{errors.firstName?.message}</p>
        <input
          {...register("lastName")}
          className="block w-50% rounded-md border-0 py-1.5 mt-3 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        />
        <p>{errors.lastName?.message}</p>
        <input
          {...register("age")}
          className="block w-50% rounded-md border-0 py-1.5 mt-3 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        />
        <p>{errors.age?.message}</p>
        <input
          {...register("password")}
          className="block w-50% rounded-md border-0 py-1.5 mt-3 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        />
        <p>{errors.password?.message}</p>
        <input
          {...register("confirmPassword")}
          className="block w-50% rounded-md border-0 py-1.5 mt-3 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        />
        <p>{errors.confirmPassword?.message}</p>
        <input
          {...register("email")}
          className="block w-50% rounded-md border-0 py-1.5 mt-3 pl-7 pr-20 text-gray-900 ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
        />
        <p>{errors.email?.message}</p>
        <button
          type="submit"
          className="bg-blue-500 block w-50% mt-3 bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 border border-blue-500 hover:border-transparent rounded"
        >
          Submit
        </button>
      </form>
    </div>
  );
};

export default Register;
