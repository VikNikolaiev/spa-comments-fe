import { FC } from 'react';
import classNames from 'classnames';
import { getNumbers } from '../../utils/paginationGererator';

type Props = {
  total: number,
  perPage: number,
  currentPage: number,
  onPageChange: (page: number) => void,
};

export const Pagination: FC<Props> = (props) => {
  const {
    total,
    perPage,
    currentPage,
    onPageChange,
  } = props;

  const totalPages = Math.ceil(total / perPage);
  const allPages = getNumbers(1, totalPages);
  const isFirstPage = currentPage === 1;
  const isLastPage = currentPage === totalPages;

  const handlerPrevClick = () => {
    if (!isFirstPage) {
      onPageChange(currentPage - 1);
    }
  };

  const handlerNextClick = () => {
    if (!isLastPage) {
      onPageChange(currentPage + 1);
    }
  };

  return (
    // eslint-disable-next-line react/react-in-jsx-scope
    <ul className="pagination justify-content-center">
      {/* eslint-disable-next-line react/react-in-jsx-scope */}
      <li
        className={classNames(
          'page-item',
          {
            disabled: isFirstPage,
          },
        )}
      >
        {/* eslint-disable-next-line react/react-in-jsx-scope */}
        <a
          data-cy="prevLink"
          className="page-link"
          href="#prev"
          aria-disabled={isFirstPage}
          onClick={handlerPrevClick}
        >
          «
        </a>
      </li>

      {allPages.map(page => (
        // eslint-disable-next-line react/react-in-jsx-scope
        <li
          key={page}
          className={classNames(
            'page-item',
            {
              active: page === currentPage,
            },
          )}
        >
          {/* eslint-disable-next-line react/react-in-jsx-scope */}
          <a
            data-cy="pageLink"
            className="page-link"
            href={`#${page}`}
            onClick={() => onPageChange(page)}
          >
            {page}
          </a>
        </li>
      ))}

      {/* eslint-disable-next-line react/react-in-jsx-scope */}
      <li
        className={classNames(
          'page-item',
          {
            disabled: isLastPage,
          },
        )}
      >
        {/* eslint-disable-next-line react/react-in-jsx-scope */}
        <a
          data-cy="nextLink"
          className="page-link"
          href="#next"
          aria-disabled={isLastPage}
          onClick={handlerNextClick}
        >
          »
        </a>
      </li>
    </ul>
  );
};
