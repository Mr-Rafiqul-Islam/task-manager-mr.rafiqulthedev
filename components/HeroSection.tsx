import Image from 'next/image'
import React from 'react'
import heroImg from "@/public/tasks-bro.svg"

export default function HeroSection() {
  return (
    <section className="pb-[50px] pt-10">
		<div className="container">
			<div className="grid items-center gap-6 md:grid-cols-2">
				<div className="flex justify-center md:order-2">
					<Image className="max-md:w-full" src={heroImg} width="326" height="390" alt="frame" />
				</div>
				<div>
					<h1 className="mb-4 text-[56px] font-bold leading-none text-[#F5BF42] lg:text-[73px]">
                    Task Manager Web App
					</h1>
					<p className="text-lg my-4 opacity-60">
						Effortlessly Organize, Prioritize, and Conquer Tasks with Taske Manager - Your Personal Productivity Ally for
						Seamless Goal Achievement and Stress-Free Task Management.
					</p>
				</div>
			</div>
		</div>
	</section>
  )
}
