import classNames from 'classnames';
import React, { FC } from 'react';
import { SortType } from '../../types/SortType';

interface Props {
  sortType: SortType,
  setSortType: (sortType: SortType) => void,
}
export const SortBar: FC<Props> = ({ sortType, setSortType }) => {
  return (
    <div className="container text-center my-3">
      <span className="p-3">
        Sorting by:
      </span>
      <div className="comments_sort btn-group" role="group" aria-label="Basic example">
        <button
          type="button"
          className={classNames(
            'btn',
            { 'btn btn-primary': sortType.includes('name') },
            { 'btn btn-light': !sortType.includes('name') },
          )}
          onClick={() => {
            if (sortType === SortType.byNameAsc) {
              setSortType(SortType.byNameDesc);
            } else {
              setSortType(SortType.byNameAsc);
            }
          }}
        >
          {sortType === SortType.byNameAsc && (
          // eslint-disable-next-line react/react-in-jsx-scope
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="currentColor"
              className="bi bi-sort"
              viewBox="0 0 20 18"
            >
              {/* eslint-disable-next-line react/react-in-jsx-scope */}
              <path
                d="M3.5 2.5a.5.5 0 0 0-1 0v8.793l-1.146-1.147a.5.5 0 0 0-.708.708l2 1.999.007.007a.497.497 0 0 0 .7-.006l2-2a.5.5 0 0 0-.707-.708L3.5 11.293V2.5zm3.5 1a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zM7.5 6a.5.5 0 0 0 0 1h5a.5.5 0 0 0 0-1h-5zm0 3a.5.5 0 0 0 0 1h3a.5.5 0 0 0 0-1h-3zm0 3a.5.5 0 0 0 0 1h1a.5.5 0 0 0 0-1h-1z"
              >
              </path>
            </svg>
          )}
          {sortType === SortType.byNameDesc && (
          // eslint-disable-next-line react/react-in-jsx-scope
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="currentColor"
              className="bi bi-sort"
              viewBox="0 0 20 18"
            >
              {/* eslint-disable-next-line react/react-in-jsx-scope */}
              <path
                d="M3.5 12.5a.5.5 0 0 1-1 0V3.707L1.354 4.854a.5.5 0 1 1-.708-.708l2-1.999.007-.007a.498.498 0 0 1 .7.006l2 2a.5.5 0 1 1-.707.708L3.5 3.707V12.5zm3.5-9a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zM7.5 6a.5.5 0 0 0 0 1h5a.5.5 0 0 0 0-1h-5zm0 3a.5.5 0 0 0 0 1h3a.5.5 0 0 0 0-1h-3zm0 3a.5.5 0 0 0 0 1h1a.5.5 0 0 0 0-1h-1z"
              >
              </path>
            </svg>
          )}
          User Name
        </button>
        <button
          type="button"
          className={classNames(
            'btn',
            { 'btn btn-primary': sortType.includes('mail') },
            { 'btn btn-light': !sortType.includes('mail') },
          )}
          onClick={() => {
            if (sortType === SortType.byMailAsc) {
              setSortType(SortType.byMailDesc);
            } else {
              setSortType(SortType.byMailAsc);
            }
          }}
        >
          {sortType === SortType.byMailAsc && (
          // eslint-disable-next-line react/react-in-jsx-scope
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="currentColor"
              className="bi bi-sort"
              viewBox="0 0 20 18"
            >
              {/* eslint-disable-next-line react/react-in-jsx-scope */}
              <path
                d="M3.5 2.5a.5.5 0 0 0-1 0v8.793l-1.146-1.147a.5.5 0 0 0-.708.708l2 1.999.007.007a.497.497 0 0 0 .7-.006l2-2a.5.5 0 0 0-.707-.708L3.5 11.293V2.5zm3.5 1a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zM7.5 6a.5.5 0 0 0 0 1h5a.5.5 0 0 0 0-1h-5zm0 3a.5.5 0 0 0 0 1h3a.5.5 0 0 0 0-1h-3zm0 3a.5.5 0 0 0 0 1h1a.5.5 0 0 0 0-1h-1z"
              >
              </path>
            </svg>
          )}
          {sortType === SortType.byMailDesc && (
          // eslint-disable-next-line react/react-in-jsx-scope
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="currentColor"
              className="bi bi-sort"
              viewBox="0 0 20 18"
            >

              {/* eslint-disable-next-line react/react-in-jsx-scope */}
              <path
                d="M3.5 12.5a.5.5 0 0 1-1 0V3.707L1.354 4.854a.5.5 0 1 1-.708-.708l2-1.999.007-.007a.498.498 0 0 1 .7.006l2 2a.5.5 0 1 1-.707.708L3.5 3.707V12.5zm3.5-9a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zM7.5 6a.5.5 0 0 0 0 1h5a.5.5 0 0 0 0-1h-5zm0 3a.5.5 0 0 0 0 1h3a.5.5 0 0 0 0-1h-3zm0 3a.5.5 0 0 0 0 1h1a.5.5 0 0 0 0-1h-1z"
              >
              </path>
            </svg>
          )}
          E-mail
        </button>
        <button
          type="button"
          className={classNames(
            'btn',
            { 'btn btn-primary': sortType.includes('date') },
            { 'btn btn-light': !sortType.includes('date') },
          )}
          onClick={() => {
            if (sortType === SortType.byDateAsc) {
              setSortType(SortType.byDateDesc);
            } else {
              setSortType(SortType.byDateAsc);
            }
          }}
        >
          {sortType === SortType.byDateAsc && (
          // eslint-disable-next-line react/react-in-jsx-scope
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="currentColor"
              className="bi bi-sort"
              viewBox="0 0 20 18"
            >
              {/* eslint-disable-next-line react/react-in-jsx-scope */}
              <path
                d="M3.5 2.5a.5.5 0 0 0-1 0v8.793l-1.146-1.147a.5.5 0 0 0-.708.708l2 1.999.007.007a.497.497 0 0 0 .7-.006l2-2a.5.5 0 0 0-.707-.708L3.5 11.293V2.5zm3.5 1a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zM7.5 6a.5.5 0 0 0 0 1h5a.5.5 0 0 0 0-1h-5zm0 3a.5.5 0 0 0 0 1h3a.5.5 0 0 0 0-1h-3zm0 3a.5.5 0 0 0 0 1h1a.5.5 0 0 0 0-1h-1z"
              >
              </path>
            </svg>
          )}
          {sortType === SortType.byDateDesc && (
          // eslint-disable-next-line react/react-in-jsx-scope
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="20"
              height="20"
              fill="currentColor"
              className="bi bi-sort"
              viewBox="0 0 20 18"
            >
              {/* eslint-disable-next-line react/react-in-jsx-scope */}
              <path
                d="M3.5 12.5a.5.5 0 0 1-1 0V3.707L1.354 4.854a.5.5 0 1 1-.708-.708l2-1.999.007-.007a.498.498 0 0 1 .7.006l2 2a.5.5 0 1 1-.707.708L3.5 3.707V12.5zm3.5-9a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zM7.5 6a.5.5 0 0 0 0 1h5a.5.5 0 0 0 0-1h-5zm0 3a.5.5 0 0 0 0 1h3a.5.5 0 0 0 0-1h-3zm0 3a.5.5 0 0 0 0 1h1a.5.5 0 0 0 0-1h-1z"
              >
              </path>
            </svg>
          )}
          Date
        </button>
      </div>
    </div>
  );
};
