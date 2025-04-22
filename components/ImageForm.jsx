"use client"

import { useActionState, startTransition } from "react";
import { createImage } from "../actions/imageController";
import { editImage } from "../actions/imageController";
import { CldUploadWidget } from "next-cloudinary"
import { useState } from "react";

export default function ImageForm(props){
    const [public_id, setPublicId] = useState("")
    const [version, setVersion] = useState("")
    const [signature, setSignature] = useState("")

    let actualAction 

    if(props.action === "create"){
      actualAction = createImage
    }
     if(props.action === "edit"){
       actualAction = editImage
     }

    const [formState, formAction] = useActionState(actualAction, {});

  const handleSubmit = (e) => {
    e.preventDefault(); // Prevent default form submission
    const formData = new FormData(e.target);
    startTransition(() => {
        formAction(formData);
    }); 
}

    return(
        <form onSubmit={handleSubmit} className="max-w-xs mx-auto" >
      <div className="mb-3">
        <input
          name="line1"
          autoComplete="off"
          type="text"
          placeholder="Line 1"
          className="input input-bordered w-full max-w-xs"
          defaultValue={props.image?.line1}
        />
        {formState.errors?.line1 && (
            <div role="alert" className="alert alert-warning">
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
            <span>{formState.errors?.line1}</span>
          </div>
        )
            }
      </div>
      <div className="mb-3">
        <input
          name="line2"
          autoComplete="off"
          type="text"
          placeholder="Line 1"
          className="input input-bordered w-full max-w-xs"
          defaultValue={props.image?.line2}
        />
        {formState.errors?.line2 && (
            <div role="alert" className="alert alert-warning">
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
            <span>{formState.errors?.line2}</span>
          </div>
        )
            }
      </div>
      <div className="mb-3">
        <input
          name="line3"
          autoComplete="off"
          type="text"
          placeholder="Line 1"
          className="input input-bordered w-full max-w-xs"
          defaultValue={props.image?.line3}
        />
        {formState.errors?.line3 && (
            <div role="alert" className="alert alert-warning">
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
            <span>{formState.errors?.line3}</span>
          </div>
        )}
      </div>
      <div className="mb-4">
      <CldUploadWidget 
        onSuccess={(results, {widget}) => {
          // console.log(results?.info)
          setPublicId(results?.info?.public_id)
          setVersion(results?.info?.version)
          setSignature(results?.info?.signature)
        }}
        onQueuesEnd={(results, {widget}) => {
          widget.close()
        }}
        signatureEndpoint="/widget-signature">
        {({ open }) => {
          function handleClick(e){
           e.preventDefault()
           open()
          }
          return (
            <button className="btn btn-secondary" onClick={handleClick}>
              Upload an Image
            </button>
          );
        }}
      </CldUploadWidget>
      </div>

      <input type="hidden" name="public_id" value={public_id} />
      <input type="hidden" name="version" value={version} />
      <input type="hidden" name="signature" value={signature} />

      <input type="hidden" name="imageId" defaultValue={props.image?._id.toString()} />
      <button className="btn btn-primary">Submit</button>
    </form>
    )
}