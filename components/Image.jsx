"use client";

import { deleteImage } from "@/actions/imageController";
import Link from "next/link";
import { CldImage } from "next-cloudinary";
import { useEffect, useState } from "react";

export default function Image(props) {
  if (!props.image.photo) {
    props.image.photo = "https://res.cloudinary.com/do4psnh2f/image/upload/v1741782993/Image-not-found_zemvfx.png";
  }

  const [fontSize, setFontSize] = useState(32);

  useEffect(() => {
    function handleResize() {
      setFontSize(window.innerWidth < 768 ? 80 : 32);
    }
    
    window.addEventListener('resize', handleResize);
    handleResize();
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return (
    <div className="relative rounded-xl overflow-hidden max-w-[650px] mx-auto mb-7">
      <img src="/aspect-ratio.png" alt=""/>

      <div className="absolute inset-0 bg-gray-200 grid">
        <span className="loading loading-dots loading-lg m-auto"></span>
      </div>

      <CldImage
        className="absolute inset-0"
        alt="Image"
        width="650"
        height="300"
        src={props.image.photo}
        crop={{ type: "pad", source: true }}
        fillBackground
        sizes="650px"
        overlays={[
          {
            position: {
              x: 34,
              y: 154,
              angle: -10,
              gravity: "north_west",
            },
            text: {
              text: `${props.image.line1}\n${props.image.line2}\n${props.image.line3}`,
              fontSize: fontSize,
              fontFamily: "Source Sans Pro",
              fontWeight: "bold",
              color: "black",
            },
          },
          {
            position: {
              x: 30,
              y: 150,
              angle: -10,
              gravity: "north_west",
            },
            text: {
              text: `${props.image.line1}\n${props.image.line2}\n${props.image.line3}`,
              fontSize: fontSize,
              fontFamily: "Source Sans Pro",
              fontWeight: "bold",
              color: "white",
            },
          },
        ]}
      />

      <div className="absolute bottom-2 right-2 flex">
        <Link
          className="size-8 rounded inline-block mr-1 bg-black/40 hover:bg-black/50 p-1 text-white/60 hover:text-white/80"
          href={`/edit-image/${props.image._id.toString()}`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L6.832 19.82a4.5 4.5 0 0 1-1.897 1.13l-2.685.8.8-2.685a4.5 4.5 0 0 1 1.13-1.897L16.863 4.487Zm0 0L19.5 7.125"
            />
          </svg>
        </Link>
        <form action={deleteImage}>
          <input
            type="hidden"
            name="id"
            defaultValue={props.image._id.toString()}
          />
          <button className="size-8 rounded inline-block  bg-black/40 hover:bg-black/50 p-1 text-white/60 hover:text-white/80">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.5}
              stroke="currentColor"
              className="size-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
              />
            </svg>
          </button>
        </form>
      </div>
    </div>
  );
}
