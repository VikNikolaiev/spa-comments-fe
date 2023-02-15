import React, { FC, useRef, useState } from 'react';
import ReCAPTCHA from 'react-google-recaptcha';
import Resizer from 'react-image-file-resizer';
import ReactS3Client from 'react-aws-s3-typescript';
import sanitizeHtml from 'sanitize-html';
import { postComment } from '../../api/comments';

interface Props {
  commentIdToReply: number | null,
  setCommentIdToReply: (id: number | null) => void,
  setIsCommentAdded:(flag: boolean) => void,
}

const sanitizeOptions = {
  allowedTags: ['code', 'i', 'strong', 'a', 'br'],
  allowedAttributes: {
    a: ['href', 'title'],
  },
};

export const ReplyForm: FC<Props> = ({
  commentIdToReply,
  setCommentIdToReply,
  setIsCommentAdded,
}) => {
  const [name, setName] = useState('');
  const [isNameValid, setIsNameValid] = useState(true);
  const [mail, setMail] = useState('');
  const [isMailValid, setIsMailValid] = useState(true);
  const [page, setPage] = useState('');
  const [isPageValid, setIsPageValid] = useState(true);
  const [text, setText] = useState('');
  const [sanitizedText, setSanitizedText] = useState('');
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const [isTextValid, setIsTextValid] = useState(true);
  const [file, setFile] = useState<File | string>();
  const [inputKey, setInputKey] = useState('');

  const resetsFileInput = () => {
    const randomString = Math.random().toString(36);

    setFile('');
    setInputKey(randomString);
  };

  const reRef = useRef<ReCAPTCHA>(null);
  const textRef = useRef<HTMLTextAreaElement>(null);

  const handleTextDecorate = (openTag:string, closeTag:string) => {
    const textVal = textRef.current;

    if (!textVal) {
      return;
    }

    const cursorStart = textVal.selectionStart;
    const cursorEnd = textVal.selectionEnd;

    // eslint-disable-next-line no-console
    console.log(cursorStart, cursorEnd, text);

    if (cursorStart === cursorEnd) {
      setText((currText) => currText.substring(0, cursorStart)
        + openTag
        + closeTag
        + currText.substring(cursorEnd));

      return;
    }

    // const selectedText = text.substring(cursorStart, cursorEnd);

    setText((currText) => currText.substring(0, cursorStart)
      + openTag
      + currText.substring(cursorStart, cursorEnd)
      + closeTag
      + currText.substring(cursorEnd));
  };

  const KID = process.env.REACT_APP_S_ID || '';
  const AK = process.env.REACT_APP_S_KEY || '';

  const uploadFile = async (fileToUpload: File) => {
    const s3 = new ReactS3Client({
      bucketName: 'comments-spa',
      region: 'eu-central-1',
      accessKeyId: KID,
      secretAccessKey: AK,
    });

    try {
      const res = await s3.uploadFile(fileToUpload);

      // eslint-disable-next-line no-console
      return res.location;
    } catch (exception) {
      // eslint-disable-next-line no-console
      console.log(exception);

      return exception;
      /* handle the exception */
    }
  };

  const onFileChange = async (event: React.ChangeEvent<HTMLInputElement>) => {
    const addedFile = event?.target?.files?.[0];

    const resizeFile = (fileToResize: File) => new Promise((resolve) => {
      Resizer.imageFileResizer(
        fileToResize,
        320,
        240,
        'WEBP',
        100,
        0,
        (uri) => {
          resolve(uri);
        },
        'file',
      );
    });

    if (addedFile) {
      switch (addedFile.type) {
        case 'image/png':
        case 'image/jpg':
        case 'image/gif':
          setFile(await resizeFile(addedFile) as File);
          break;
        case 'text/plain':
          if (addedFile.size > 102400) {
            // eslint-disable-next-line no-alert
            window.alert('Please upload a file smaller than 100 kB');
            resetsFileInput();

            return;
          }

          setFile(addedFile);
          break;
        default:
          // eslint-disable-next-line no-alert
          window.alert('Please upload only PNG, JPG, GIF or TXT files');
          resetsFileInput();

          return;
      }
    }

    // eslint-disable-next-line no-console
    console.log(file);
  };

  const handlerSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    const token = await reRef.current?.executeAsync();

    let fileToUpload = '';

    if (file) {
      fileToUpload = await uploadFile(file as File);
      if (!fileToUpload) {
        return;
      }
    }

    if (reRef.current) {
      reRef.current.reset();
    }

    const obj = {
      parrentId: commentIdToReply,
      text,
      file: fileToUpload,
      user: {
        name,
        mail,
        page,
      },
      token,
    };

    postComment(obj);
    setCommentIdToReply(0);
    setIsCommentAdded(true);
  };

  return (
    <>
      <form onSubmit={handlerSubmit}>
        <div className="row g-3">
          <div className="col-sm-6">
            {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
            <label htmlFor="name" className="form-label">Name</label>
            <input
              type="text"
              className="form-control"
              id="name"
              placeholder=""
              required
              pattern="[A-Za-z0-9]{1,20}"
              value={name}
              onChange={(event) => setName(event.target.value)}
              onBlur={(event) => {
                setName(event.target.value.trim());
                setIsNameValid(event.target.value.trim().length > 0);
              }}
            />
            {!isNameValid && (
              <div className="text-danger">
                Valid name is required.
              </div>
            )}
          </div>

          <div className="col-sm-6">
            {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
            <label htmlFor="email" className="form-label">Email</label>
            <input
              type="email"
              className="form-control"
              id="email"
              placeholder="you@example.com"
              required
              pattern="[a-zA-Z0-9._%+-]+@[A-Za-z0-9.-]+\.[a-z]{2,4}$"
              value={mail}
              onChange={(event) => setMail(event.target.value)}
              onBlur={(event) => {
                setMail(event.target.value.trim());
                setIsMailValid(/[a-zA-Z0-9._%+-]+@[A-Za-z0-9.-]+\.[a-z]{2,4}$/.test(event.target.value.trim()));
              }}
            />
            {!isMailValid && (
              <div className="text-danger">
                Please enter a valid email address.
              </div>
            )}
          </div>

          <div className="col-12">
            {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
            <label htmlFor="page" className="form-label">
              Page
              <span className="text-muted px-1">(Optional)</span>
            </label>
            <input
              type="text"
              className="form-control"
              id="page"
              placeholder=""
              value={page}
              pattern="^(|https?:\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\\.,@?^=%&amp;:/~\\+#]*[\w\-\\@?^=%&amp;/~\\+#])?)$"
              onChange={(event) => setPage(event.target.value)}
              onBlur={(event) => {
                setPage(event.target.value.trim());
                setIsPageValid(/^(|https?:\/\/[\w\-_]+(\.[\w\-_]+)+([\w\-\\.,@?^=%&amp;:/~\\+#]*[\w\-\\@?^=%&amp;/~\\+#])?)$/.test(event.target.value.trim()));
              }}
            />
            {!isPageValid && (
              <div className="text-danger">
                Please enter a valid page address.
              </div>
            )}
          </div>

          <ul className="nav nav-tabs" id="myTab" role="tablist">
            <li className="nav-item" role="presentation">
              <button
                className="nav-link active"
                id="home-tab"
                data-bs-toggle="tab"
                data-bs-target={`#input-${commentIdToReply}`}
                type="button"
                role="tab"
                aria-controls="home"
                aria-selected="true"
                onClick={() => {
                  setText(currentText => sanitizeHtml(currentText.replace(/<br \/>/g, '\n'), sanitizeOptions));
                }}
              >
                Text input
              </button>
            </li>
            <li className="nav-item" role="presentation">
              <button
                className="nav-link"
                id="profile-tab"
                data-bs-toggle="tab"
                data-bs-target={`#preview-${commentIdToReply}`}
                type="button"
                role="tab"
                aria-controls="profile"
                aria-selected="false"
                onClick={() => {
                  setSanitizedText(sanitizeHtml(text.replace(/\n/g, '<br/>'), sanitizeOptions));
                }}
                disabled={!text.length}
              >
                Preview
              </button>
            </li>
          </ul>
          <div className="tab-content p-3" id="myTabContent">
            <div className="tab-pane fade show active" id={`input-${commentIdToReply}`} role="tabpanel" aria-labelledby="home-tab">
              <div className="container">
                <div className="row px-0 py-2">
                  <div className="col-sm-1 px-0">
                    {/* eslint-disable-next-line jsx-a11y/label-has-associated-control */}
                    <label htmlFor="text" className="form-label">Text</label>
                  </div>
                  <div className="col-sm-11 px-0 text-end">
                    <button
                      className="btn btn-light btn-sm"
                      type="button"
                      role="tab"
                      onClick={() => handleTextDecorate('<strong>', '</strong>')}
                    >
                      STRONG
                    </button>
                    <button
                      className="btn btn-light btn-sm"
                      type="button"
                      role="tab"
                      onClick={() => handleTextDecorate('<i>', '</i>')}
                    >
                      ITALIC
                    </button>
                    <button
                      className="btn btn-light btn-sm"
                      type="button"
                      role="tab"
                      onClick={() => handleTextDecorate('<code>', '</code>')}
                    >
                      CODE
                    </button>
                    <button
                      className="btn btn-light btn-sm"
                      type="button"
                      role="tab"
                      onClick={() => handleTextDecorate('<a href="" title="">', '</a>')}
                    >
                      LINK
                    </button>
                  </div>
                </div>
              </div>
              <div className="col-12">
                <textarea
                  className="form-control"
                  ref={textRef}
                  id="text"
                  rows={5}
                  required
                  value={text.replace(/<br \/>/g, '\n')}
                  onChange={(event) => {
                    setText(event.target.value);
                  }}
                  onBlur={(event) => {
                    setText(event.target.value.trim());
                    setSanitizedText(sanitizeHtml(event.target.value.trim().replace(/\n/g, '<br/>'), sanitizeOptions));
                    setIsTextValid(event.target.value.trim().length > 0);
                  }}
                />
                {!isTextValid && (
                  <div className="text-danger">
                    Comment must not be empty.
                  </div>
                )}
              </div>
            </div>
            <div className="tab-pane fade" id={`preview-${commentIdToReply}`} role="tabpanel" aria-labelledby="profile-tab">
              {/* eslint-disable-next-line react/no-danger */}
              <div dangerouslySetInnerHTML={{ __html: sanitizedText }} />
            </div>
          </div>

          <div className="col-12 mb-1">
            <label className="input-group-text" htmlFor="inputGroupFile">
              <input
                type="file"
                className="form-control"
                id="inputGroupFile"
                accept="image/png, image/jpg, image/gif, text/plain"
                key={inputKey || ''}
                onChange={(event) => onFileChange(event)}
              />
              <span className="ps-2">Upload file</span>
            </label>
          </div>
        </div>
        <div className="d-grid gap-2 d-md-flex justify-content-md-end">
          <button
            className="btn btn-outline-danger"
            type="button"
            onClick={() => setCommentIdToReply(0)}
          >
            Cancel
          </button>

          <button
            type="submit"
            className="w-15 btn btn-primary"
          >
            Publish
          </button>
          <ReCAPTCHA
            size="invisible"
            sitekey={process.env.REACT_APP_GC || ''}
            ref={reRef}
          />
        </div>
      </form>
    </>
  );
};
