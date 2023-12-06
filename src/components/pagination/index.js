import { memo } from "react";
import { cn as bem } from "@bem-react/classname";
import PropTypes from "prop-types";
import "./index.css";
import { generatePagesList } from "../../utils";
import { NavLink } from "react-router-dom";

function Pagination({ totalPages, currentPage }) {
  const cn = bem("pagination");

  const { pages, currPageIndex } = generatePagesList(currentPage, totalPages);

  if (!pages) return null;

  return (
    <ul className={cn()}>
      {pages.map((page, index) => (
        <li key={index} className={cn(index === currPageIndex ? "page active" : "page")}>
          {page === "..." ? (
            <span className="no-link"> {page}</span>
          ) : (
            <NavLink to={`/page/${page}`} className={cn("link")}>
              {" "}
              {page}{" "}
            </NavLink>
          )}
        </li>
      ))}
    </ul>
  );
}

Pagination.propTypes = {
  totalPages: PropTypes.number,
  currentPage: PropTypes.number,
};

export default memo(Pagination);
