import { ChevronRight } from "lucide-react";
import Link from "next/link";
import React from "react";

interface Props {
  links: {
    name: string;
    href: string;
    link?: Props["links"];
  };
  lastEnabled?: boolean;
}

const BreadCrums = ({ links, lastEnabled }: Props) => {
  const renderLinks: any = [];

  function renderLink(link: Props["links"]) {
    renderLinks.push(
      <li className="inline-flex items-center" key={link.name}>
        {link.link || lastEnabled ? (
          <Link
            className={`${!link.link && "text-slate-600"}`}
            href={link.href}
          >
            {link.name}
          </Link>
        ) : (
          <p className="text-slate-600">{link.name}</p>
        )}
        {link.link && (
          <span className="ml-2">
            <ChevronRight />
          </span>
        )}
      </li>
    );

    if (link.link) {
      renderLinks.push(renderLink(link.link));
    }
  }
  renderLink(links);

  return (
    <div>
      {renderLinks.length > 0 && (
        <ul className="flex gap-x-2 font-medium text-xs sm:text-sm text-gray-400">
          {renderLinks}
        </ul>
      )}
    </div>
  );
};

export default BreadCrums;
