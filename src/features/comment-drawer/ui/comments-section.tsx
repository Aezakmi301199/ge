import { Avatar, Stack } from '@mui/material';
import { PropertyCommentResponse } from '../../../shared/api/generated-api/api.schemas';
import { MainVerticalContainer } from '../../../widgets/drawers/ui/ui';
import { environments } from '../../../environment';
import { BodyTypography_1, BodyTypography_2, BodyTypographyMedium_1 } from '../../../shared/typography/ui/ui';
import { formatRelativeDate } from '../../../shared/lib/format-relative-date';

interface CommentsSectionProps {
  comments: PropertyCommentResponse[];
}

const CommentsSection: React.FC<CommentsSectionProps> = ({ comments }) => {
  return (
    <MainVerticalContainer flexDirection={'column-reverse'} flexGrow={1}>
      {comments.map((comment) => (
        // Сообщение
        <Stack direction={'row'} gap={'8px'} sx={{ width: '100%' }}>
          {/* Aватар */}
          <Avatar src={`${environments.VITE_BITRIX_CDN}${comment.user.photo}`} />
          {/* Bubble */}
          <Stack flex={1} overflow='hidden'>
            {/* autor */}
            <Stack direction={'row'} justifyContent={'space-between'}>
              {/* ФИО */}
              <BodyTypographyMedium_1>
                {comment.user.name} {comment.user.surname}
              </BodyTypographyMedium_1>
              {/* Дата создания коммента */}
              <BodyTypography_2>{formatRelativeDate(comment.createdAt)}</BodyTypography_2>
            </Stack>
            {/* текст коммента */}
            <BodyTypography_1 sx={{ wordWrap: 'break-word', whiteSpace: 'pre-wrap' }}>{comment.text}</BodyTypography_1>
          </Stack>
        </Stack>
      ))}
    </MainVerticalContainer>
  );
};

export default CommentsSection;
