import { useState, useEffect } from 'react';
import { CreatePropertyCommentDto, PropertyCommentResponse } from '../../../shared/api/generated-api/api.schemas';
import {
  propertyControllerAddComment,
  propertyControllerFindCommentsById,
} from '../../../shared/api/generated-api/api';
import CommentsSection from './comments-section';
import { useParams } from 'react-router-dom';
import { Alert } from '@mui/material';
import { t } from 'i18next';
import { catchEnterKeyDown } from '../../../shared/lib/catch-enter-key-down';
import { MultilineTextField } from '../../../shared/text-field/multiline-text-field';

const MainSectionPropertyCommentsContainer = () => {
  const [comments, setComments] = useState<PropertyCommentResponse[]>([]);
  const [comment, setComment] = useState<CreatePropertyCommentDto>({ text: '' });
  const { id: propertyId } = useParams<string>();
  const maxCommentLength = 1500;

  if (!propertyId) {
    return;
  }

  const sendComment = () => {
    const currentComment = { text: comment.text.trim() };

    if (!currentComment.text.length) {
      setComment(currentComment);

      return;
    }

    propertyControllerAddComment(propertyId, currentComment).then((res) => setComments([res, ...comments]));
    setComment({ text: '' });
  };

  const isCommentReachLimit = (comment: CreatePropertyCommentDto) => {
    return comment.text.trim().length > maxCommentLength;
  };

  const fetch = () => {
    propertyControllerFindCommentsById(propertyId).then((res) => setComments([...res]));
  };

  useEffect(() => {
    fetch();
  }, []);

  return (
    <>
      <CommentsSection comments={comments} />
      {isCommentReachLimit(comment) ? (
        <Alert
          sx={{
            borderRadius: 0,
            width: '100%',
            margin: 0,
            padding: 0,
            justifyContent: 'center',
            alignItems: 'center',
            height: '24px',
            fontSize: 13,
            fontWeight: 400,
          }}
          icon={false}
          variant='filled'
          severity='error'
        >
          {`${t('Limit was exceeded')}: ${maxCommentLength - comment.text.trim().length}`}
        </Alert>
      ) : null}
      <MultilineTextField
        placeholder={`${t('Add a comment')}...`}
        value={comment.text}
        onChange={(event) => setComment({ text: event.target.value })}
        onKeyDown={(event) => {
          if (isCommentReachLimit(comment)) {
            return;
          }

          catchEnterKeyDown(event, sendComment);
        }}
        onClick={() => {
          if (isCommentReachLimit(comment)) {
            return;
          }

          sendComment();
        }}
      />
    </>
  );
};

export default MainSectionPropertyCommentsContainer;
