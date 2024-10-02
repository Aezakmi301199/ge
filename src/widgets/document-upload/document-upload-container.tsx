import React, { useState } from 'react';
import { Box, Stack } from '@mui/material';
import DocumentView from './document-view';
import TextFieldStore from '../../shared/store/text-field.store';
import { action, makeAutoObservable, observable } from 'mobx';
import FileUpload from './file-uploader';
import { observer } from 'mobx-react-lite';
import { Controller, useFieldArray, useFormContext } from 'react-hook-form';
import { DragDropContext, Draggable, Droppable, DropResult } from 'react-beautiful-dnd';
import { renderMatches } from 'react-router-dom';

export interface DocumentFile {
  key: string;
  file: File;
  fileType?: string;
  url?: string;
}

interface ContentFile {
  key: string;
  url: string;
}

interface IDocumentUploadStore {
  titleDeed: TextFieldStore;
  documents: DocumentFile[];
  upload: (file: File[]) => void;
  remove: (key: string) => void;
}

export class DocumentUploadStore implements IDocumentUploadStore {
  @observable documents: DocumentFile[] = [];
  @observable titleDeed: TextFieldStore = new TextFieldStore();
  @action
  upload = (files: File[]) => {
    this.documents = files.map((file) => {
      return {
        key: file.name,
        file: file,
        fileType: this.findType(file.name),
      } as DocumentFile;
    });
  };
  @action
  remove = (key: string) => {
    const index = this.documents.findIndex((doc) => doc.key === key);
    if (index !== -1) {
      this.documents.splice(index, 1);
    }
  };

  constructor(documents?: DocumentFile[]) {
    if (documents) {
      this.documents = documents;
    }

    makeAutoObservable(this, undefined, { autoBind: true });
  }

  @action
  findType = (key: string) => {
    const data = this.documents.find((doc) => doc.key === key);
    return data ? data.fileType : undefined;
  };

  @action
  mappedFile = (files: File[]) => {
    return files.map((file) => {
      return { ...file, typeFile: undefined };
    });
  };
}

export enum AttachmentType {
  PHOTO = 'PHOTO',
  PASSPORT = 'PASSPORT',
  CONTRACT = 'CONTRACT',
  TITLE_DEED = 'TITLE_DEED',
  FORM_A = 'FORM_A',
  FORM_F = 'FORM_F',
  SALES_FORM = 'SALES_FORM',
  LEASING_FORM = 'LEASING_FORM',
  NOC = 'NOC',
  SPA = 'SPA',
  EMIRATES_ID = 'EMIRATES_ID',
  OQOOD = 'OQOOD',
  LAYOUT = 'LAYOUT',
  POWER_OF_ATTORNEY = 'POWER_OF_ATTORNEY',
  AVAILABILITY_LIST = 'AVAILABILITY_LIST',
  EMIRATES_VISA = 'EMIRATES_VISA',
  MOU = 'MOU',
  INTERNATIONAL_ID = 'INTERNATIONAL_ID',
  VIDEO = 'VIDEO',
}

const options = [
 { name: 'Availability List', value: AttachmentType.AVAILABILITY_LIST },
  { name: 'Emirates ID', value: AttachmentType.EMIRATES_ID },
  { name: 'Emirates Visa', value: AttachmentType.EMIRATES_VISA },
  { name: 'Form A', value: AttachmentType.FORM_A },
  { name: 'Form F', value: AttachmentType.FORM_F },
  { name: 'International ID', value: AttachmentType.INTERNATIONAL_ID },
  { name: 'Leasing form', value: AttachmentType.LEASING_FORM },
  { name: 'M.O.U', value: AttachmentType.MOU },
  { name: 'N.O.C', value: AttachmentType.NOC },
  { name: 'Oqood', value: AttachmentType.OQOOD },
  { name: 'Passport', value: AttachmentType.PASSPORT },
  { name: 'Power of Attorney', value: AttachmentType.POWER_OF_ATTORNEY },
  { name: 'SPA', value: AttachmentType.SPA },
  { name: 'Sales form', value: AttachmentType.SALES_FORM },
  { name: 'Title Deed', value: AttachmentType.TITLE_DEED },
];

interface DocumentUploadContainerProps {}

const DocumentUploadContainer: React.FC<DocumentUploadContainerProps> = ({}) => {
  const { control, trigger, setValue } = useFormContext<{ attachments: DocumentFile[] }>();
  const { fields, append, remove, update } = useFieldArray({ control, name: 'attachments' });
  const [textFieldStore] = useState(() => new TextFieldStore());

  const handleFileDrop = (key: string | undefined) => async (acceptedFiles: File[]) => {
    const documentFiles = acceptedFiles.map((file) => {
      return {
        key: file.name,
        file: file,
        fileType: undefined,
      };
    }) as DocumentFile[];

    append(documentFiles);
    await trigger('attachments');
  };

  const onDragEnd = (result: DropResult) => {
    console.log(result);
    // dropped outside the list
    if (!result.destination) {
      return;
    }

    const reorderedFiles = Array.from(fields);
    const [movedFile] = reorderedFiles.splice(result.source.index, 1);
    reorderedFiles.splice(result.destination.index, 0, movedFile);
    setValue('attachments', reorderedFiles);
  };

  return (
    <Stack>
      <FileUpload
        onDrop={handleFileDrop(textFieldStore.value)}
        renderFiles={() => {
          return (
            <DragDropContext onDragEnd={onDragEnd}>
              <Droppable droppableId='droppable'>
                {(provided) => (
                  <Stack position={'relative'} ref={provided.innerRef} {...provided.droppableProps}>
                    {fields.map((field, index) => (
                      <Controller
                        key={field.id}
                        name={`attachments.${index}`}
                        control={control}
                        render={({ field: { value }, fieldState: { error } }) => {
                          if (!value.file) {
                            return <Box></Box>;
                          }
                          return (
                            <Draggable key={value.file?.name} draggableId={value.file?.name} index={index}>
                              {(provided) => {
                                return (
                                  <DocumentView
                                    showLabel={false}
                                    document={value}
                                    onRemove={() => {
                                      remove(index);
                                    }}
                                    options={options}
                                    onSelect={(type) => {
                                      const updatedFile = { ...field, fileType: type };
                                      update(index, updatedFile);
                                      trigger(`attachments.${index}`);
                                    }}
                                    valueSelect={field.fileType}
                                    error={Boolean(error)}
                                    innerRef={provided.innerRef}
                                    {...provided.draggableProps}
                                    {...provided.dragHandleProps}
                                  />
                                );
                              }}
                            </Draggable>
                          );
                        }}
                      />
                    ))}
                  </Stack>
                )}
              </Droppable>
            </DragDropContext>
          );
        }}
      />
    </Stack>
  );
};

export default observer(DocumentUploadContainer);
