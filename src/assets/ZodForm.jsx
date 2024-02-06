import React from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

let schema = z
  .object({
    firstName: z.string().nonempty("FirstName required"),
    lastName: z.string().nonempty("LastName required"),
    age: z.number().int(),
    password: z
      .string()
      .nonempty("Password Required")
      .refine(
        (val) => !(val.toString().length < 8),
        "Password needs to be atleast 8 digits"
      ),

    confirmPassword: z
      .string()
      .nonempty("Required")
      .refine(
        (val) => !(val.toString().length < 8),
        "Password needs to be atleast 8 digits"
      ),
    email: z.string().nonempty("Email required").email("Invalid email address"),
  })
  .refine((data) => data.password === data.confirmPassword, {
    message: "Passwords don't match",
    path: ["password"], // path of error
  });
const ZodForm = () => {
  const { register, handleSubmit, formState } = useForm({
    defaultValues: {
      firstName: "Rajan",
      lastName: "R",
      age: 20,
      password: "123456789",
      confirmPassword: "123456789",
      email: "example@gmail.com",
    },
    resolver: zodResolver(schema),
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

export default ZodForm;
