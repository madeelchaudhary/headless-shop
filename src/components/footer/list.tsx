import Link from "next/link";
import React from "react";

interface Props {
  label: string;
  items: {
    label: string;
    link: string;
  }[];
}

const FooterList = ({ items, label }: Props) => {
  return (
    <div>
      <h3 className="text-lg font-semibold text-slate-700 mb-4 uppercase">
        {label}
      </h3>
      <ul className="flex flex-col gap-y-2">
        {items.map((item, i) => (
          <li key={i}>
            <Link
              className="text-gray-500 hover:text-slate-800 "
              href={item.link}
            >
              {item.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default FooterList;
