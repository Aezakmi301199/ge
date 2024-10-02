import { useEffect, useMemo, useState } from 'react';
import {
  ContainerBlock,
  ContainerUploadButtonBlock,
  NewPropertyContainer,
  PropertySection,
} from '../../../shared/ui-kit/styled';
import HeaderTitle from '../../new-property-draft/ui/headerTitle';
import Building from '../../new-property-draft/ui/building';
import { t } from 'i18next';
import DocumentUploadContainer, { DocumentFile } from '../../../widgets/document-upload/document-upload-container';
import { Box, Stack, styled } from '@mui/material';
import DefaultButton from '../../../shared/button/default-button';
import { PagePath } from '../../../shared/enums/page-path.enum';
import { theme } from '../../../theme';
import { useNavigate } from 'react-router-dom';
import PropertySelector from '../../../shared/selector/property-selector';
import { JSONSchemaType } from 'ajv';
import { FormProvider, useForm } from 'react-hook-form';
import { State } from '../../../shared/lib/reducer';
import {
  AdditionalUAETypeFields,
  BaseFilterDraftConfiguration,
  FilterUAEDraftConfiguration,
  MatchResultUAEFilter,
} from '../country/UAE-filter-draft-interface';
import { match, P } from 'ts-pattern';
import ControlledSizeBlock from '../controlled/controlled-size-block';
import { ControlledPlotSizeBlock } from '../controlled/controlled-plot-size-block';
import ControlledBedroomBlock from '../controlled/controlled-bedroom-block';
import ControlledHasMaidRoom from '../controlled/controlled-has-maid-room';
import ControlledFurnishingTypeSelector from '../controlled/controlled-furnishing-type-selector';
import ControlledParkingSpaceSelector from '../controlled/controlled-parking-space-selector';
import ControlledPriceBlock from '../controlled/controlled-price-block';
import ControlledDraftTitleBlock from '../controlled/controlled-draft-title-block';
import ControlledLocation from '../controlled/controlled-location';
import ControlledDescription from '../controlled/controlled-description';
import ControlledDealAutocomplete from '../controlled/controlled-deal-autocomplete';
import { CategoryType } from '../../../shared/enums/category-type';
import useBaseDraftPropertyForm, { documentsData } from '../hooks/use-base-draft-property-form';
import { UniversalDraftSchema, useTypeFieldsDraftForm } from '../hooks/use-type-fields-draft-form';
import { CapitalizePropertyType } from '../../../shared/enums/capitalize-property-type';
import { PropertyType } from '../../../shared/enums/property-type';
import ControlledFinancialStatusBlock from '../controlled/controlled-financial-status-block';
import { HeadlineTypography_6 } from '../../../shared/typography/ui/ui';
import ControlledBathroomBlock from '../controlled/controlled-bathroom-count';
import { formatKeyForTranslation } from '../../../shared/lib/format-key-for-translation';
import { getCssHoverRipple } from '../../../shared/lib/mui/get-css-hover-ripple';
import ControlledFloor from '../controlled/controlled-floor';
import ControlledViewsBlock from '../controlled/controlled-views-block';
import apiClient from '../../../shared/api/instance/api-client';
import { observer } from 'mobx-react-lite';
import UploadImageButton from '../../../shared/upload-form/upload-image-button';
import FloorPlanIcon from '../../../assets/icons/custom/floor-plan/floor-plan.icon';
import { useUser } from '../../../provider/user.provider';
import ControlledUnitNumber from '../controlled/controlled-unit-number';
import ControlledTitleDeed from '../controlled/controlled-title-deed';
import ControlledHasBalcony from '../controlled/controlled-has-balcony';
import { HttpStatusCode } from 'axios';
import { PropertyController } from '../../../shared/api/controllers/property-controller';
import {
  CurrencyResponse,
  DealResponse,
  DealType,
  PropertyDraftResponse,
  UpdatePropertyDto,
  UserResponse,
} from '../../../shared/api/generated-api/api.schemas';
import { action, makeAutoObservable, observable } from 'mobx';
import { UserController } from '../../../shared/api/controllers/user-controller';
import { isEmptyObject } from '../../../shared/lib/is-empty-object';
import { zodResolver } from '@hookform/resolvers/zod';
import { toCapitalize, toLowerCase } from '../../../shared/interfaces/base-property-form.interface';
import { SnackbarPropertyForm } from '../ui/snackbar-property-form';
import DocumentUploaderPdfProperty from '../document-uploader-pdf-property';

type ResponseCustomFields = {
  id: string;
  cityId: string;
  schema: JSONSchemaType<Record<string, unknown>>;
  createdAt: string;
};

const propertyTypesDefaultOptionsForUAE = [
  { name: CapitalizePropertyType.APARTMENT, value: PropertyType.APARTMENT },
  { name: CapitalizePropertyType.VILLA, value: PropertyType.VILLA },
  { name: CapitalizePropertyType.TOWNHOUSE, value: PropertyType.TOWNHOUSE },
  { name: CapitalizePropertyType.BUNGALOW, value: PropertyType.BUNGALOW },
  { name: CapitalizePropertyType.LAND, value: PropertyType.LAND },
  { name: CapitalizePropertyType.COMPOUND, value: PropertyType.COMPOUND },
  { name: CapitalizePropertyType.DUPLEX, value: PropertyType.DUPLEX },
  { name: CapitalizePropertyType.PENTHOUSE, value: PropertyType.PENTHOUSE },
  { name: CapitalizePropertyType.HALF_FLOOR, value: PropertyType.HALF_FLOOR },
  { name: CapitalizePropertyType.FULL_FLOOR, value: PropertyType.FULL_FLOOR },
  { name: CapitalizePropertyType.WHOLE_BUILDING, value: PropertyType.WHOLE_BUILDING },
  { name: CapitalizePropertyType.BULK_UNITS, value: PropertyType.BULK_UNITS },
];

const MainContainer = styled(Box)(() => ({
  display: 'flex',
  justifyContent: 'center',
  padding: `0px ${theme.padding.body}`,
  '@media (max-width: 430px)': {
    padding: '0px',
  },
}));

export const ActionButtonsContainer = styled(Box)(() => ({
  display: 'flex',
  position: 'relative',
  width: 'fit-content',
  gap: '8px',
  flexDirection: 'row',
  '@media (min-width: 320px) and (max-width: 430px)': {
    flexDirection: 'column',
    padding: '8px',
  },
}));

export class DraftForm {
  @observable readonly user: UserResponse | null = null;
  @observable baseFilterDraftConfiguration: BaseFilterDraftConfiguration = new BaseFilterDraftConfiguration();
  @observable typeFieldsSchema: JSONSchemaType<UniversalDraftSchema> | undefined = undefined;
  @observable currency: CurrencyResponse | null = null;
  @observable deals: DealResponse[] = [];
  @observable loadingDeals: boolean = true;
  @observable loadingSchema: boolean = true;
  @observable hasUpdatedDraft: boolean = false;
  @observable loadingDraft: boolean = true;
  @observable hasCreatedProperty: boolean = false;
  @observable hasUpdatedProperty: boolean = false;
  @observable showHasCreatedPropertySnackbar: boolean = false;
  constructor(user: UserResponse | null) {
    this.user = user;

    makeAutoObservable(this, undefined, { autoBind: true });
  }

  @action
  setCurrency = (currency: DraftForm['currency']) => {
    this.currency = currency;
  };

  @action
  setLoadingSchema = (loading: DraftForm['loadingSchema']) => {
    this.loadingSchema = loading;
  };

  @action
  setTypeFieldsSchema = (schema: DraftForm['typeFieldsSchema']) => {
    this.typeFieldsSchema = schema;
  };

  get userCityId() {
    return this.user?.portal.citiesPortals[0].city.id;
  }

  get userId() {
    return this.user?.id;
  }

  @action
  fetchCurrency = async () => {
    if (!this.userCityId) {
      return;
    }
    await PropertyController.getAvailableCurrencies(this.userCityId).then(
      (data) => data.length && (this.currency = data[0]),
    );
  };

  @action
  fetchUserDeals = async () => {
    if (!this.userId) {
      return;
    }
    this.loadingDeals = true;
    await UserController.findDeals(this.userId)
      .then((data) => {
        this.deals = data;
      })
      .finally(() => (this.loadingDeals = false));
  };

  fetchSchema = async () => {
    this.setLoadingSchema(true);

    if (this.userCityId) {
      try {
        await apiClient.get<ResponseCustomFields>(`/api/city/${this.userCityId}/custom-fields`).then((res) => {
          this.setTypeFieldsSchema(res.data.schema);
        });
      } catch (e) {
      } finally {
        this.setLoadingSchema(false);
      }
    }
  };

  get getSxPropsHalfWidth() {
    return {
      maxWidth: '400px',
      boxSizing: 'content-box',
      '@media (max-width: 430px)': {
        boxSizing: 'border-box',
      },
    };
  }

  @action
  transformGetDraftResponseToFormValues = (data: PropertyDraftResponse) => {
    const { attachments, views, propertyAmenity, ...otherData } = data;
    return {
      ...(views && { views: views.map((view) => view.viewId) }),
      ...(propertyAmenity && { amenities: propertyAmenity.map((amenity) => amenity.amenityId) }),
      ...attachments,
      ...otherData,
    };
  };

  @action
  setHasUpdatedDraft = (hasUpdatedDraft: boolean) => {
    this.hasUpdatedDraft = hasUpdatedDraft;
  };

  @action
  setHasCreatedProperty = (hasCreatedProperty: boolean) => {
    this.hasCreatedProperty = hasCreatedProperty;
  };

  @action
  setHasUpdatedProperty = (hasUpdatedProperty: boolean) => {
    this.hasUpdatedProperty = hasUpdatedProperty;
  };

  @action
  uploadAttachment = (propertyId: string, data: any) => {
    PropertyController.uploadAttachment(propertyId, data);
  };
}

const UAEDraftForm = () => {
  const user = useUser();
  const [draftForm] = useState(() => new DraftForm(user.user));
  const { baseFilterDraftConfiguration, typeFieldsSchema, loadingSchema, userCityId, getSxPropsHalfWidth } = draftForm;
  const [filterUAEDraftConfiguration] = useState(() => new FilterUAEDraftConfiguration());
  const formMethods = useBaseDraftPropertyForm({
    defaultValue: baseFilterDraftConfiguration.data,
  });
  const baseDraftPropertyForm = formMethods.getValues();
  const typeFieldsFormMethods = useTypeFieldsDraftForm({
    defaultValue: {
      isDraft: true,
      propertyType: PropertyType.APARTMENT,
      typeFields: filterUAEDraftConfiguration.factoryTypeFields(PropertyType.APARTMENT),
      category: CategoryType.SECONDARY,
    },
    schema: typeFieldsSchema,
  });
  const attachmentsMethods = useForm({
    mode: 'all',
    defaultValues: {
      attachments: [],
    },
    resolver: zodResolver(documentsData),
  });

  const navigate = useNavigate();

  const handleStateChange = (state: State) => {
    const type = state.propertyType;
    const dealType = state.typeOfTransaction;

    if (!type || loadingSchema || !dealType) {
      return;
    }

    if (toLowerCase(formMethods.getValues().propertyType) !== toLowerCase(type)) {
      const upperPropertyType = type as PropertyType;
      typeFieldsFormMethods.reset({
        isDraft: formMethods.getValues().isDraft,
        typeFields: filterUAEDraftConfiguration.factoryTypeFields(upperPropertyType),
        propertyType: upperPropertyType,
        category: CategoryType.SECONDARY,
      });

      formMethods.setValue('isDraft', true);
      typeFieldsFormMethods.setValue('isDraft', true);
      formMethods.setValue('propertyType', upperPropertyType);
      formMethods.clearErrors();
      filterUAEDraftConfiguration.resetConvertedValues();
      return;
    }

    const upperDealType = dealType as DealType;
    formMethods.setValue('dealType', upperDealType);
  };

  const fetchData = async () => {
    if (draftForm.userCityId) {
      await draftForm.fetchSchema();
      await draftForm.fetchCurrency();
      await draftForm.fetchUserDeals();
    }
  };

  useEffect(() => {
    fetchData();
  }, [draftForm.userCityId]);

  const watcherBitrixDealId = formMethods.watch('bitrixDealId');

  useEffect(() => {
    if (watcherBitrixDealId && userCityId) {
      draftForm.loadingDraft = true;
      PropertyController.getDraft({ dealId: watcherBitrixDealId })
        .then((data) => {
          const { typeFields: backendTypeFields, ...otherData } = draftForm.transformGetDraftResponseToFormValues(data);
          const typeFields = backendTypeFields
            ? (backendTypeFields as unknown as AdditionalUAETypeFields<typeof otherData.propertyType>)
            : new FilterUAEDraftConfiguration().factoryTypeFields(otherData.propertyType);
          formMethods.reset({ ...otherData, currencyId: draftForm.currency?.id });
          typeFieldsFormMethods.reset(
            {
              isDraft: otherData.isDraft,
              typeFields: typeFields,
              propertyType: otherData.propertyType,
              category: CategoryType.SECONDARY,
            },
            { keepDefaultValues: true },
          );
          typeFieldsFormMethods.trigger();
        })
        .catch((e) => {
          if (e !== HttpStatusCode.NotFound) {
            PropertyController.createDraft({
              dealId: watcherBitrixDealId,
              cityId: userCityId,
              dealType: formMethods.getValues().dealType,
              propertyType: formMethods.getValues().propertyType,
              category: CategoryType.SECONDARY,
            }).then((data) => {
              const { ...otherData } = draftForm.transformGetDraftResponseToFormValues(data);
              formMethods.reset({ ...otherData, currencyId: draftForm.currency?.id });
              typeFieldsFormMethods.reset({
                isDraft: otherData.isDraft,
                typeFields: filterUAEDraftConfiguration.factoryTypeFields(data.propertyType),
                propertyType: otherData.propertyType,
                category: CategoryType.SECONDARY,
              });
              handleUpdateDraftForm();
            });
          }
        })
        .finally(() => {
          draftForm.loadingDraft = false;
        });
    }
  }, [watcherBitrixDealId, userCityId]);

  const AdditionalPropertiesComponent = useMemo(
    () => () => {
      const propertyType = formMethods.getValues().propertyType;
      const isDraft = formMethods.getValues().isDraft;
      const typeFields = typeFieldsFormMethods.getValues();
      const isRequiredBedroom = match({ propertyType, isDraft })
        .with(
          { propertyType: PropertyType.APARTMENT },
          { propertyType: PropertyType.VILLA },
          { propertyType: PropertyType.TOWNHOUSE },
          { propertyType: PropertyType.COMPOUND },
          { propertyType: PropertyType.DUPLEX },
          { propertyType: PropertyType.HALF_FLOOR },
          { propertyType: PropertyType.PENTHOUSE },
          () => true,
        )
        .otherwise(() => false);

      const isRequiredBathroom = match({ propertyType, isDraft })
        .with(
          { propertyType: PropertyType.APARTMENT },
          { propertyType: PropertyType.VILLA },
          { propertyType: PropertyType.TOWNHOUSE },
          { propertyType: PropertyType.COMPOUND },
          { propertyType: PropertyType.DUPLEX },
          { propertyType: PropertyType.HALF_FLOOR },
          { propertyType: PropertyType.FULL_FLOOR },
          { propertyType: PropertyType.PENTHOUSE },
          { propertyType: PropertyType.BULK_UNITS },
          () => true,
        )
        .otherwise(() => false);

      const isRequiredSize = match({ propertyType, isDraft })
        .with(
          { propertyType: PropertyType.APARTMENT },
          { propertyType: PropertyType.VILLA },
          { propertyType: PropertyType.TOWNHOUSE },
          { propertyType: PropertyType.BUNGALOW },
          { propertyType: PropertyType.COMPOUND },
          { propertyType: PropertyType.DUPLEX },
          { propertyType: PropertyType.HALF_FLOOR },
          { propertyType: PropertyType.FULL_FLOOR },
          { propertyType: PropertyType.PENTHOUSE },
          { propertyType: PropertyType.WHOLE_BUILDING },
          { propertyType: PropertyType.BULK_UNITS },
          () => true,
        )
        .otherwise(() => false);

      const isRequirePlotSize = match({ propertyType, isDraft })
        .with(
          { propertyType: PropertyType.VILLA },
          { propertyType: PropertyType.TOWNHOUSE },
          { propertyType: PropertyType.LAND },
          () => true,
        )
        .otherwise(() => false);

      return match<MatchResultUAEFilter>({ propertyType, typeFields } as MatchResultUAEFilter)
        .with({ propertyType: PropertyType.APARTMENT }, () => {
          return (
            <>
              <PropertySection>
                <ControlledTitleDeed />
                <ControlledUnitNumber />
                <ControlledBedroomBlock required={isRequiredBedroom} />
                <ControlledBathroomBlock required={isRequiredBathroom} />
                <ControlledSizeBlock
                  required={isRequiredSize}
                  onChangeConvertedValue={filterUAEDraftConfiguration.handleConvertedSize}
                />
                <ControlledFloor />
                <ControlledHasMaidRoom />
                <ControlledHasBalcony />
              </PropertySection>
              <ControlledFurnishingTypeSelector />
              <ControlledParkingSpaceSelector />
            </>
          );
        })
        .with({ propertyType: PropertyType.VILLA }, { propertyType: PropertyType.TOWNHOUSE }, () => {
          return (
            <>
              <PropertySection>
                <ControlledTitleDeed />
                <ControlledBedroomBlock required={isRequiredBedroom} />
                <ControlledBathroomBlock required={isRequiredBathroom} />
                <ControlledSizeBlock
                  required={isRequiredSize}
                  onChangeConvertedValue={filterUAEDraftConfiguration.handleConvertedSize}
                />
                <ControlledPlotSizeBlock
                  required={isRequirePlotSize}
                  onChangeConvertedValue={filterUAEDraftConfiguration.handleConvertedPlotSize}
                />
                <ControlledHasMaidRoom />
              </PropertySection>
              <ControlledFurnishingTypeSelector />
              <ControlledParkingSpaceSelector />
            </>
          );
        })
        .with(
          { propertyType: PropertyType.BUNGALOW },
          { propertyType: PropertyType.COMPOUND },
          { propertyType: PropertyType.DUPLEX },
          { propertyType: PropertyType.HALF_FLOOR },
          { propertyType: PropertyType.FULL_FLOOR },
          { propertyType: PropertyType.PENTHOUSE },
          { propertyType: PropertyType.WHOLE_BUILDING },
          { propertyType: PropertyType.BULK_UNITS },
          () => {
            return (
              <>
                <PropertySection>
                  <ControlledTitleDeed />
                  <ControlledBedroomBlock required={isRequiredBedroom} />
                  <ControlledBathroomBlock required={isRequiredBathroom} />
                  <ControlledSizeBlock
                    required={isRequiredSize}
                    onChangeConvertedValue={filterUAEDraftConfiguration.handleConvertedSize}
                  />
                  <ControlledPlotSizeBlock
                    required={isRequirePlotSize}
                    onChangeConvertedValue={filterUAEDraftConfiguration.handleConvertedPlotSize}
                  />
                </PropertySection>
                <ControlledFurnishingTypeSelector />
                <ControlledParkingSpaceSelector />
              </>
            );
          },
        )
        .with({ propertyType: PropertyType.LAND }, () => {
          return (
            <>
              <PropertySection>
                <ControlledTitleDeed />
                <ControlledPlotSizeBlock
                  required={isRequirePlotSize}
                  onChangeConvertedValue={filterUAEDraftConfiguration.handleConvertedPlotSize}
                />
              </PropertySection>
            </>
          );
        })
        .otherwise(() => null);
    },
    [baseDraftPropertyForm.propertyType],
  );

  const handleUpdateDraftForm = (showSnackbar: boolean = false) => {
    formMethods.setValue('isDraft', true);
    typeFieldsFormMethods.setValue('isDraft', true);
    formMethods.trigger();
    typeFieldsFormMethods.trigger();
    const attachments = attachmentsMethods.getValues().attachments;
    setTimeout(() => {
      if (isEmptyObject(formMethods.formState.errors) && isEmptyObject(typeFieldsFormMethods.formState.errors)) {
        const data = baseFilterDraftConfiguration.convertTypeFieldsToApi(formMethods.getValues());
        const typeFields = filterUAEDraftConfiguration.convertTypeFieldsToApi(
          formMethods.getValues().propertyType,
          typeFieldsFormMethods.getValues().typeFields,
        );

        const fullFormData = { ...data, typeFields } as unknown as UpdatePropertyDto;
        console.log(attachmentsMethods.getValues());
        if (attachments.length) {
          console.log(attachments);
          attachments.forEach((data: DocumentFile) => {
            PropertyController.uploadAttachment(formMethods.getValues().id, data);
          });
        }

        PropertyController.updateDraft(formMethods.getValues().id, fullFormData).then(() => {
          showSnackbar && draftForm.setHasUpdatedDraft(true);
        });
      }
    }, 0);
  };

  const handleUpdatePropertyForm = () => {
    formMethods.setValue('isDraft', false);
    typeFieldsFormMethods.setValue('isDraft', false);
    formMethods.trigger();
    typeFieldsFormMethods.trigger();
    setTimeout(() => {
      if (isEmptyObject(formMethods.formState.errors) && isEmptyObject(typeFieldsFormMethods.formState.errors)) {
        const data = baseFilterDraftConfiguration.convertTypeFieldsToApi(formMethods.getValues());
        const typeFields = filterUAEDraftConfiguration.convertTypeFieldsToApi(
          formMethods.getValues().propertyType,
          typeFieldsFormMethods.getValues().typeFields,
        );
        const fullFormData = { ...data, typeFields } as unknown as UpdatePropertyDto;
        PropertyController.updateProperty(formMethods.getValues().id, fullFormData).then(() => {
          match({ hasCreatedProperty: draftForm.hasCreatedProperty, hasUpdatedProperty: draftForm.hasUpdatedProperty })
            .with({ hasCreatedProperty: false }, () => {
              draftForm.setHasCreatedProperty(true);
              draftForm.showHasCreatedPropertySnackbar = true;
            })
            .otherwise(({ hasUpdatedProperty }) => {
              if (!hasUpdatedProperty) {
                draftForm.setHasUpdatedProperty(true);
              }
            });
        });
      }
    }, 0);
  };

  return (
    <FormProvider {...formMethods}>
      {baseDraftPropertyForm && (
        <>
          <Stack mt={'49px'}>
            <HeaderTitle />
          </Stack>
          <MainContainer display={'flex'} justifyContent={'center'} padding={`0px ${theme.padding.body}`}>
            {match(watcherBitrixDealId)
              .with(P.number, () => (
                <NewPropertyContainer>
                  <ContainerBlock>
                    <Box sx={getSxPropsHalfWidth}>
                      <ControlledDealAutocomplete deals={draftForm.deals} loading={draftForm.loadingDeals} />
                    </Box>
                    {!draftForm.loadingDraft && (
                      <PropertySelector
                        sx={{
                          '@media (max-width: 430px)': {
                            padding: '0px',
                          },
                        }}
                        onStateChange={handleStateChange}
                        propertyTypes={propertyTypesDefaultOptionsForUAE}
                        defaultState={{
                          propertyType: formMethods.getValues().propertyType,
                          typeOfTransaction: baseDraftPropertyForm.dealType,
                          buildingType: null,
                          historyType: null,
                        }}
                      />
                    )}
                  </ContainerBlock>
                  <FormProvider {...typeFieldsFormMethods}>
                    <ControlledDraftTitleBlock sx={getSxPropsHalfWidth} />
                  </FormProvider>
                  <ControlledLocation sx={getSxPropsHalfWidth} />
                  <ContainerBlock sx={getSxPropsHalfWidth}>
                    <HeadlineTypography_6 pb={'7px'}>
                      {t(toCapitalize(formatKeyForTranslation(formMethods.getValues().propertyType)))}
                    </HeadlineTypography_6>
                    <FormProvider {...typeFieldsFormMethods}>
                      <AdditionalPropertiesComponent />
                    </FormProvider>
                    <ControlledViewsBlock />
                  </ContainerBlock>
                  {baseDraftPropertyForm.propertyType === PropertyType.APARTMENT && (
                    <FormProvider {...typeFieldsFormMethods}>
                      <Building sx={getSxPropsHalfWidth} />
                    </FormProvider>
                  )}
                  <ControlledDescription />
                  <ContainerBlock sx={{ width: 'auto' }}>
                    <HeadlineTypography_6 pb={'7px'}>{t('Documents')}</HeadlineTypography_6>
                    <FormProvider {...attachmentsMethods}>
                      <DocumentUploaderPdfProperty elementId={formMethods.getValues().id} />
                    </FormProvider>
                  </ContainerBlock>
                  <ContainerUploadButtonBlock>
                    <HeadlineTypography_6 pb={'7px'}>{t('Photos')}</HeadlineTypography_6>
                    <UploadImageButton helperText={'Maximum of 30 photos in JPG format, up to 30 MB'} />
                  </ContainerUploadButtonBlock>
                  <ContainerUploadButtonBlock>
                    <HeadlineTypography_6 pb={'7px'}>{t('Plan')}</HeadlineTypography_6>
                    <UploadImageButton
                      text={'Add a plan'}
                      icon={<FloorPlanIcon />}
                      helperText={'Maximum of 30 photos in JPG format, up to 30 MB'}
                    />
                  </ContainerUploadButtonBlock>
                  <ContainerBlock>
                    <ControlledPriceBlock
                      sx={{
                        '@media (max-width: 430px)': {
                          padding: '0px',
                        },
                      }}
                      currency={draftForm.currency}
                    />
                    <FormProvider {...typeFieldsFormMethods}>
                      <ControlledFinancialStatusBlock
                        sx={{
                          '@media (max-width: 430px)': {
                            padding: '0px',
                          },
                        }}
                      />
                    </FormProvider>
                  </ContainerBlock>
                  <ContainerBlock>
                    <ActionButtonsContainer position={'relative'}>
                      <DefaultButton
                        onClick={() => navigate(PagePath.EMPTY_PATH)}
                        text={t('Cancel')}
                        color={'inherit'}
                        sx={{
                          ...getCssHoverRipple(theme.base.default.main.button),
                          color: theme.text.text_dark,
                        }}
                      />
                      {!draftForm.hasCreatedProperty && (
                        <DefaultButton
                          text={t('Save draft')}
                          color={'primary'}
                          sx={{
                            ...getCssHoverRipple(theme.base.default.main.button),
                            color: theme.text.text_dark,
                          }}
                          onClick={() => handleUpdateDraftForm(true)}
                        />
                      )}
                      <DefaultButton
                        text={match(draftForm.hasCreatedProperty)
                          .with(true, () => t('Update'))
                          .otherwise(() => t('Create'))}
                        color={'primary'}
                        sx={{ ...getCssHoverRipple(theme.base.primary.main), color: theme.base.primary.contrast }}
                        onClick={handleUpdatePropertyForm}
                      />
                      <SnackbarPropertyForm
                        handleClose={() => draftForm.setHasUpdatedDraft(false)}
                        open={draftForm.hasUpdatedDraft}
                        helperText={'Draft saved'}
                      />
                      <SnackbarPropertyForm
                        handleClose={() => (draftForm.showHasCreatedPropertySnackbar = false)}
                        open={draftForm.showHasCreatedPropertySnackbar}
                        helperText={'Property created'}
                      />
                      <SnackbarPropertyForm
                        handleClose={() => draftForm.setHasUpdatedProperty(false)}
                        open={draftForm.hasUpdatedProperty}
                        helperText={'Property created'}
                      />
                    </ActionButtonsContainer>
                  </ContainerBlock>
                </NewPropertyContainer>
              ))
              .otherwise(() => (
                <NewPropertyContainer>
                  <ContainerBlock>
                    <Box sx={getSxPropsHalfWidth}>
                      <ControlledDealAutocomplete deals={draftForm.deals} loading={draftForm.loadingDeals} />
                    </Box>
                  </ContainerBlock>
                  <ContainerBlock>
                    <ActionButtonsContainer>
                      <DefaultButton
                        onClick={() => navigate(PagePath.EMPTY_PATH)}
                        text={t('Cancel')}
                        color={'inherit'}
                        sx={{
                          ...getCssHoverRipple(theme.base.default.main.button),
                          color: theme.text.text_dark,
                        }}
                      />
                    </ActionButtonsContainer>
                  </ContainerBlock>
                </NewPropertyContainer>
              ))}
          </MainContainer>
        </>
      )}
    </FormProvider>
  );
};

export default observer(UAEDraftForm);
