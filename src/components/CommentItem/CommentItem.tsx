import React, { FC, useEffect, useState } from 'react';
import DownloadLink from 'react-download-link';
import FsLightbox from 'fslightbox-react';
import { Comment } from '../../types/comment';
import { ReplyForm } from '../ReplyForm/ReplyForm';
import './CommentItem.css';

interface Props {
  comment: Comment;
  commentIdToReply: number | null,
  setCommentIdToReply: (id: number | null) => void,
  setIsCommentAdded: (flag: boolean) => void,
}

export const CommentItem: FC<Props> = ({
  comment,
  commentIdToReply,
  setCommentIdToReply,
  setIsCommentAdded,
}) => {
  const [fileType, setFileType] = useState('');
  const [lightboxOpen, setLightboxOpen] = useState(false);

  const getDataFromURL = (url:string) => new Promise((resolve) => {
    setTimeout(() => {
      fetch(url)
        .then(response => response.blob())
        .then(data => {
          resolve(data);
        });
    });
  });

  const getCommentDate = (dateString: string) => {
    const date = new Date(dateString);

    const [month, day, year] = [
      (date.getMonth() + 1) > 9 ? date.getMonth() + 1 : `0${date.getMonth() + 1}`,
      (date.getDate()) > 9 ? date.getDate() : `0${date.getDate()}`,
      date.getFullYear(),
    ];
    const [hour, minutes] = [
      date.getHours(),
      date.getMinutes(),
    ];

    return `${day}.${month}.${year} в ${hour}:${minutes}`;
  };

  useEffect(() => {
    if (!comment.file) {
      return;
    }

    fetch(comment.file).then(res => {
      setFileType(res.headers.get('Content-Type') || '');
    });
  }, []);

  return (
    <div key={comment.id} className="comment_item mb-5">
      <div className="comment_header h-100 px-2 py-2 bg-light border">
        <div className="comment__user-details container px-0">
          <div className="row align-items-start">
            <div className="col-md-5 comment_user">
              <span className="comment_author fw-bold">{comment.user.name}</span>
              <span className="comment_date px-2">{getCommentDate(comment.createdAt)}</span>
            </div>
            <div className="col-md-3 align-items-end">
              <span className="comment_author">{comment.user.mail}</span>
            </div>
            <div className="col-md-4">
              <span className="comment_author">{comment.user.page}</span>
            </div>
          </div>
        </div>
      </div>
      <div className="comment_body p-1 border mb-2">
        <div className="px-1 pb-2">
          {/* eslint-disable-next-line react/no-danger */}
          <div dangerouslySetInnerHTML={{ __html: comment.text }}>
          </div>
          {/* <span className="comment_text">{comment.text}</span> */}
        </div>
        {comment.file && (
          <div className="mb-2">
            <div className="input-group">
              <div className="input-group-text">Attachment: </div>
              {fileType === 'image/webp' && (
                <div className="input-group-text bg-white">
                  <img
                    className="img-thumbnail"
                    src={comment.file}
                    alt={comment.id}
                    role="presentation"
                    onClick={() => setLightboxOpen(!lightboxOpen)}
                  />
                  <FsLightbox
                    toggler={lightboxOpen}
                    sources={[comment.file]}
                  />
                </div>
              )}
              <div className="form-control d-flex align-items-center">
                <DownloadLink
                  label="Download"
                  filename={`${comment.id}_attachment.${comment.file.split('.').pop()}`}
                  exportFile={() => Promise.resolve(getDataFromURL(comment.file))}
                  style={{ margin: 0 }}
                />
              </div>
            </div>
          </div>
        )}
        <div className="d-grid gap-2 d-md-flex justify-content-md-end">
          {commentIdToReply !== Number(comment.id) && (
            <button
              type="submit"
              className="btn btn-outline-primary"
              onClick={() => setCommentIdToReply(Number(comment.id))}
            >
              Reply &gt;&gt;
            </button>
          )}
        </div>
      </div>
      <div className="comment_reply">
        {commentIdToReply === Number(comment.id) && (
          <div className="p-2 border mb-3 bg-light">
            <ReplyForm
              commentIdToReply={commentIdToReply}
              setCommentIdToReply={setCommentIdToReply}
              setIsCommentAdded={setIsCommentAdded}
            />
          </div>
        )}
      </div>
    </div>
  );
};
