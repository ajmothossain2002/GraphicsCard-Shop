"use client";

import React from "react";
import { WobbleCard } from "../ui/wobble-card";
import Image from "next/image";

export function WobbleCardDemo() {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 max-w-7xl mx-auto w-full">
      <WobbleCard
        containerClassName="col-span-1 lg:col-span-2 h-full bg-pink-800 min-h-[500px] lg:min-h-[300px]"
        className=""
      >
        <div className="max-w-xs">
          <h2 className="text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
       Presenting Best graphics card ...
          </h2>
          <p className="mt-4 text-left  text-base/6 text-neutral-200">
           
           Buy our console now,Lorem ipsum dolor sit, 
           amet consectetur adipisicing elit.
            Voluptates, <br />officiis!
          </p>
        </div>
        <Image
          src="https://assets.nvidia.partners/images/png/RTX5070STPL_IN.png"
          width={600}
          height={500}
          alt="linear demo image"
          className="absolute -right-4 lg:-right-[40%] grayscale filter -bottom-10 object-contain rounded-2xl"
        />
      </WobbleCard>
      <WobbleCard containerClassName="col-span-1 min-h-[300px]">
        <h2 className="max-w-80  text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
          No shirt, no shoes,Lorem ipsum dolor<br></br> sit amet consectetur adipisicing. no weapons.only GPU
        </h2>
        <p className="mt-4 max-w-[26rem] text-left  text-base/6 text-neutral-200">
          If someone yells “stop!”, goes limp, or taps out, the fight is over.
        </p>
      </WobbleCard>
      <WobbleCard containerClassName="col-span-1 lg:col-span-3 bg-blue-900 min-h-[500px] lg:min-h-[600px] xl:min-h-[300px]">
        <div className="max-w-sm">
          <h2 className="max-w-sm md:max-w-lg  text-left text-balance text-base md:text-xl lg:text-3xl font-semibold tracking-[-0.015em] text-white">
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Assumenda, quis?
          </h2>
          <p className="mt-4 max-w-[26rem] text-left  text-base/6 text-neutral-200">
           Lorem ipsum dolor sit amet consectetur adipisicing elit. Dolorem repellat accusamus 
           doloribus laudantium vitae corporis animi temporibus non dolores sint.
          </p>
        </div>
        <Image
          src="https://assets.nvidia.partners/images/png/RTX-4070-SUPER-Back.png"
          width={500}
          height={500}
          alt="linear demo image"
          className="absolute -right-10 md:-right-[40%] lg:-right-[20%] -bottom-10 object-contain rounded-2xl"
        />
      </WobbleCard>
    </div>
  );
}
export default WobbleCardDemo;
