"use client";

import { useActionState, startTransition } from "react";
// import { useFormState, useFormStatus } from "react-dom"
import { register } from "../actions/userController.js";

export default function RegisterForm() {
  const [formState, formAction] = useActionState(register, {});

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission
    const formData = new FormData(e.target);
    startTransition(() => {
        formAction(formData);
    }); 
}

  console.log(formState);

  return (
    <form onSubmit={handleSubmit} className="max-w-xs mx-auto">
      <div className="mb-3">
        <input
          name="username"
          autoComplete="off"
          type="text"
          placeholder="Username"
          className="input input-bordered w-full max-w-xs"
        />
        {formState.errors?.username && (
            <div role="alert" className="alert alert-warning mt-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 shrink-0 stroke-current"
              fill="none"
              viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <span>{formState.errors?.username}</span>
          </div>
        )
            }
      </div>
      <div className="mb-3">
        <input
          name="password"
          autoComplete="off"
          type="password"
          placeholder="password"
          className="input input-bordered w-full max-w-xs"
        />
        {formState.errors?.password && (
            <div role="alert" className="alert alert-warning mt-1">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 shrink-0 stroke-current"
              fill="none"
              viewBox="0 0 24 24">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <span>{formState.errors?.password}</span>
          </div>
        )
            }
      </div>
      <button className="btn btn-primary">Create Account</button>
    </form>
  );
}
