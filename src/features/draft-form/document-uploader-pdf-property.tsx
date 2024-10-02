import { observer, useLocalStore } from 'mobx-react-lite';
import React, { useState } from 'react';
import { Box, Stack } from '@mui/material';
import TextFieldStore from '../../shared/store/text-field.store';
import { action, makeAutoObservable, observable } from 'mobx';
import { Controller, useFieldArray, useFormContext } from 'react-hook-form';
import { DragDropContext, Draggable, Droppable, DropResult } from 'react-beautiful-dnd';
import { PropertyController } from '../../shared/api/controllers/property-controller';
import DocumentView from '../../widgets/document-upload/document-view';
import FileUploader from '../../widgets/document-upload/file-uploader';
import { PropertyAttachmentResponse } from '../../shared/api/generated-api/api.schemas';

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

const options = [
  { name: 'Availability List', value: 'availabilityList' },
  { name: 'Emirates ID', value: 'emiratesId' },
  { name: 'Emirates Visa', value: 'emiratesVisa' },
  { name: 'Form A', value: 'optionFormA' },
  { name: 'Form F', value: 'formF' },
  { name: 'International ID', value: 'internationalId' },
  { name: 'Leasing form', value: 'leasingForm' },
  { name: 'M.O.U', value: 'mou' },
  { name: 'N.O.C', value: 'noc' },
  { name: 'Oqood', value: 'oqood' },
  { name: 'Passport', value: 'passport' },
  { name: 'Power of Attorney', value: 'powerOfAttorney' },
  { name: 'SPA', value: 'spa' },
  { name: 'Sales form', value: 'salesForm' },
  { name: 'Title Deed', value: 'titleDeed' },
];

interface DocumentUploadContainerProps {
  onSelectFileType?: (index: number, attachments: DocumentFile[]) => void;
  onDeleteFile?: (attachments: DocumentFile[]) => void;
  onUpdatedFiles?: (attachments: DocumentFile[]) => void;
  elementId: string;
}

const DocumentUploaderPropertyForm: React.FC<DocumentUploadContainerProps> = ({
  onUploadFile,
  onSelectFileType,
  elementId,
}) => {
  const { control, trigger, setValue } = useFormContext<{ attachments: DocumentFile[] }>();
  const { fields, append, remove, update } = useFieldArray({ control, name: 'attachments' });
  const [textFieldStore] = useState(() => new TextFieldStore());
  const localStore = useLocalStore<{ downloadedFiles: PropertyAttachmentResponse[] }>(() => ({ downloadedFiles: [] }));

  const handleFileDrop = (key: string | undefined) => async (acceptedFiles: File[]) => {
    const documentFiles = acceptedFiles.map((file) => {
      return {
        key: file.name,
        file: file,
        fileType: undefined,
      };
    }) as DocumentFile[];

    console.log(acceptedFiles);
    console.log(documentFiles);
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
    console.log(fields);
    console.log(reorderedFiles);
    setValue('attachments', reorderedFiles);
  };

  const handleRemoveDocument = (index: number, file: DocumentFile) => {
    remove(index);
    PropertyController.uploadAttachment(elementId.toString(), file).then((data) => {
      console.log(data);
      localStore.downloadedFiles.push(data);
    });
  };

  const handleSelectDocumentFileType = (index: number, file: DocumentFile) => {
    update(index, file);
    trigger(`attachments.${index}`);
    PropertyController.uploadAttachment(elementId.toString(), file).then((data) => {
      console.log(data);
      localStore.downloadedFiles.push(data);
    });
  };

  return (
    <Stack>
      <FileUploader
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
                                      handleRemoveDocument(index, value);
                                    }}
                                    options={options}
                                    onSelect={(type) => {
                                      const updatedFile = { ...field, fileType: type };
                                      handleSelectDocumentFileType(index, updatedFile);
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

export default observer(DocumentUploaderPropertyForm);
