import React from "react";

interface Props {
  rating: number;
}

/* 
        <svg
          key={i}
          xmlns="http://www.w3.org/2000/svg"
          className="text-yellow-500 w-5 h-auto fill-current hover:text-yellow-600"
          viewBox="0 0 16 16"
        >
          <path d="M5.354 5.119 7.538.792A.516.516 0 0 1 8 .5c.183 0 .366.097.465.292l2.184 4.327 4.898.696A.537.537 0 0 1 16 6.32a.548.548 0 0 1-.17.445l-3.523 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256a.52.52 0 0 1-.146.05c-.342.06-.668-.254-.6-.642l.83-4.73L.173 6.765a.55.55 0 0 1-.172-.403.58.58 0 0 1 .085-.302.513.513 0 0 1 .37-.245l4.898-.696zM8 12.027a.5.5 0 0 1 .232.056l3.686 1.894-.694-3.957a.565.565 0 0 1 .162-.505l2.907-2.77-4.052-.576a.525.525 0 0 1-.393-.288L8.001 2.223 8 2.226v9.8z" />
        </svg>
        
        */
const Rating = ({ rating }: Props) => {
  const index = Math.ceil(rating);
  const stars = Array.from({ length: 5 }, (_, i) => {
    if (i + 1 < index) {
      return (
        <svg
          key={i}
          xmlns="http://www.w3.org/2000/svg"
          className="text-yellow-500 w-5 h-auto fill-current hover:text-yellow-600"
          viewBox="0 0 16 16"
        >
          <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
        </svg>
      );
    } else if (i + 1 === index && rating % 1 !== 0) {
      return (
        <div className="w-5 h-5 inline-flex justify-center  group" key={i}>
          <div className="w-2.5 h-5 overflow-hidden relative">
            <span className="absolute left-0 top-0">
              <svg
                key={i}
                xmlns="http://www.w3.org/2000/svg"
                className="text-yellow-500 w-5 h-auto fill-current group-hover:text-yellow-600"
                viewBox="0 0 16 16"
              >
                <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
              </svg>
            </span>
          </div>
          <div className="h-5 w-2.5 overflow-hidden relative">
            <span className="absolute right-0 top-0">
              <svg
                key={i}
                xmlns="http://www.w3.org/2000/svg"
                className="text-slate-200 w-5 h-auto fill-current group-hover:text-gray-300"
                viewBox="0 0 16 16"
              >
                <path d="M3.612 15.443c-.386.198-.824-.149-.746-.592l.83-4.73L.173 6.765c-.329-.314-.158-.888.283-.95l4.898-.696L7.538.792c.197-.39.73-.39.927 0l2.184 4.327 4.898.696c.441.062.612.636.282.95l-3.522 3.356.83 4.73c.078.443-.36.79-.746.592L8 13.187l-4.389 2.256z" />
              </svg>
            </span>
          </div>
        </div>
      );
    } else {
      return (
        <svg
          key={i}
          xmlns="http://www.w3.org/2000/svg"
          className="text-slate-200 w-5 h-auto fill-current hover:text-gray-300"
          viewBox="0 0 16 16"
        >
          <path d="M2.866 14.85c-.078.444.36.791.746.592l4.898-2.256 4.898 2.256c.386.198.824-.149.746-.592l-.83-4.73 3.522-3.356c.33-.314.16-.888-.282-.95l-4.898-.696L8 .792c-.197-.39-.73-.39-.927 0L3.89 5.119 0 5.815c-.442.062-.612.636-.283.95l3.522 3.356-.83 4.73z" />
        </svg>
      );
    }
  });

  return (
    <div className="flex items-center gap-4">
      <div className="flex items-center gap-1">{stars}</div>
      <span className="text-slate-700 font-medium text-sm">({rating})</span>
    </div>
  );
};

export default Rating;
