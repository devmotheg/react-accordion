/*!
 * @author Mohamed Muntasir
 * @link https://github.com/devmotheg
 */

import React, { useState, useEffect, useRef } from "react";
import faqs from "../data/faqs";

interface SVGProps {
	className?: string;
}

interface ItemProps {
	question: string;
	answer: string;
}

const PlusSVG = (props: SVGProps) => {
	return (
		<svg
			{...props}
			viewBox="0 0 1024 1024"
			version="1.1"
			xmlns="http://www.w3.org/2000/svg">
			<title>plus</title>
			<path d="M474 152m8 0l60 0q8 0 8 8l0 704q0 8-8 8l-60 0q-8 0-8-8l0-704q0-8 8-8Z"></path>
			<path d="M168 474m8 0l672 0q8 0 8 8l0 60q0 8-8 8l-672 0q-8 0-8-8l0-60q0-8 8-8Z"></path>
		</svg>
	);
};

const MinusSVG = (props: SVGProps) => {
	return (
		<svg
			{...props}
			viewBox="0 0 1024 1024"
			version="1.1"
			xmlns="http://www.w3.org/2000/svg">
			<title>minus</title>
			<path d="M872 474H152c-4.4 0-8 3.6-8 8v60c0 4.4 3.6 8 8 8h720c4.4 0 8-3.6 8-8v-60c0-4.4-3.6-8-8-8z"></path>
		</svg>
	);
};

const Item = (props: ItemProps) => {
	const [isOpen, setIsOpen] = useState(false);
	const answer = useRef<HTMLSpanElement>(null);

	let Icon: (props: SVGProps) => JSX.Element;
	if (isOpen) Icon = MinusSVG;
	else Icon = PlusSVG;

	useEffect(() => {
		if (isOpen && answer.current)
			answer.current.style.height = `${answer.current.scrollHeight}px`;
		else if (answer.current) answer.current.style.height = "";
	});

	return (
		<li className="p-4 border-2 border-solid rounded shadow-md border-slate-100">
			<div className="flex items-center justify-between gap-4">
				<span className="text-lg font-bold">{props.question}</span>
				<button
					className="p-2 rounded-full bg-purple-50 fill-purple-500"
					onClick={() => setIsOpen(!isOpen)}>
					<Icon className="w-4 h-4" />
				</button>
			</div>
			<span
				ref={answer}
				className={String(
					`block h-0 overflow-hidden transition-all ${isOpen && "mt-4"}`
				)}>
				{props.answer}
			</span>
		</li>
	);
};

const Project = () => {
	return (
		<>
			<h1 className="relative py-4 mb-12 text-4xl font-bold capitalize after:w-2/4 after:h-1 after:absolute after:bottom-0 after:left-2/4 after:-translate-x-1/2 after:bg-purple-500">
				FAQs
			</h1>
			<ul className="max-w-[40rem] space-y-8">
				{faqs.map(q => (
					<Item key={q.id} question={q.title} answer={q.info} />
				))}
			</ul>
		</>
	);
};

export default Project;
