<script setup lang="ts">

import type { AppFormSections } from "devkit-admin/form";
import Datalist, {
	ColumnText,
	ColumnDate,
	type DatalistColumnsBase,
	type DatalistProps,
} from "devkit-admin/datalist";

import { useI18n } from "vue-i18n";
import { apiClient } from "@/api/apiClient";
import type { PartialCreateUpdateRequest, PartialListRequest, TenantsSchemaPartial } from "@buf/ahmeddarwish_devkit-api.bufbuild_es/devkit/v1/tenant_partial_pb";
const { t } = useI18n();

const formSections: AppFormSections<PartialCreateUpdateRequest> = {
	partial_info: {
		isTitleHidden: true,
		isTransparent: true,
		inputs: [
			{
				$formkit: "text",
				prefixIcon: "edit",
				outerClass: "col-12 sm:col-6 md:col-4",
				name: "partialName",
				validation: "required",
				label: t("partialName"),
				placeholder: t("partialName"),
			},
			{
				$formkit: "text",
				prefixIcon: "edit",
				outerClass: "col-12 sm:col-6 md:col-4",
				name: "partialNameAr",
				validation: "required",
				label: t("partialNameAr"),
				placeholder: t("partialNameAr"),
			},
			{
				$formkit: "number",
				prefixIcon: "list-ordered",
				outerClass: "col-12 sm:col-6 md:col-4",
				name: "partialTypeId",
				validation: "required",
				label: t("partialTypeId"),
				placeholder: t("partialTypeId"),
			},
			{
				$formkit: "number",
				prefixIcon: "layout-grid",
				outerClass: "col-12 sm:col-6 md:col-4",
				name: "sectionId",
				validation: "required",
				label: t("sectionId"),
				placeholder: t("sectionId"),
			},
			{
				$formkit: "text",
				prefixIcon: "image",
				outerClass: "col-12 sm:col-6 md:col-4",
				name: "partialImage",
				label: t("partialImage"),
				placeholder: t("partialImage"),
			},
			{
				$formkit: "text",
				prefixIcon: "images",
				outerClass: "col-12 sm:col-6 md:col-4",
				name: "partialImages",
				label: t("partialImages"),
				placeholder: t("partialImages"),
			},
			{
				$formkit: "text",
				prefixIcon: "video",
				outerClass: "col-12 sm:col-6 md:col-4",
				name: "partialVideo",
				label: t("partialVideo"),
				placeholder: t("partialVideo"),
			},
			{
				$formkit: "checkbox",
				outerClass: "col-12 sm:col-6 md:col-4",
				name: "isFeatured",
				label: t("isFeatured"),
			},
			{
				$formkit: "textarea",
				prefixIcon: "file-text",
				outerClass: "col-12 sm:col-6 md:col-4",
				name: "partialBrief",
				label: t("partialBrief"),
				placeholder: t("partialBrief"),
			},
			{
				$formkit: "textarea",
				prefixIcon: "file-text",
				outerClass: "col-12 sm:col-6 md:col-4",
				name: "partialBriefAr",
				label: t("partialBriefAr"),
				placeholder: t("partialBriefAr"),
			},
			{
				$formkit: "textarea",
				prefixIcon: "file-text",
				outerClass: "col-12 sm:col-6 md:col-4",
				name: "partialContent",
				label: t("partialContent"),
				placeholder: t("partialContent"),
			},
			{
				$formkit: "textarea",
				prefixIcon: "file-text",
				outerClass: "col-12 sm:col-6 md:col-4",
				name: "partialContentAr",
				label: t("partialContentAr"),
				placeholder: t("partialContentAr"),
			},
			{
				$formkit: "text",
				prefixIcon: "tag",
				outerClass: "col-12 sm:col-6 md:col-4",
				name: "partialButtonLabel",
				label: t("partialButtonLabel"),
				placeholder: t("partialButtonLabel"),
			},
			{
				$formkit: "text",
				prefixIcon: "tag",
				outerClass: "col-12 sm:col-6 md:col-4",
				name: "partialButtonLabelAr",
				label: t("partialButtonLabelAr"),
				placeholder: t("partialButtonLabelAr"),
			},
			{
				$formkit: "text",
				prefixIcon: "aperture",
				outerClass: "col-12 sm:col-6 md:col-4",
				name: "partialButtonIcon",
				label: t("partialButtonIcon"),
				placeholder: t("partialButtonIcon"),
			},
			{
				$formkit: "text",
				prefixIcon: "link",
				outerClass: "col-12 sm:col-6 md:col-4",
				name: "partialButtonLink",
				label: t("partialButtonLink"),
				placeholder: t("partialButtonLink"),
			},
			{
				$formkit: "number",
				prefixIcon: "link",
				outerClass: "col-12 sm:col-6 md:col-4",
				name: "partialButtonPageId",
				label: t("partialButtonPageId"),
				placeholder: t("partialButtonPageId"),
			},
			{
				$formkit: "text",
				prefixIcon: "icons",
				outerClass: "col-12 sm:col-6 md:col-4",
				name: "partialIcons",
				label: t("partialIcons"),
				placeholder: t("partialIcons"),
			},
			{
				$formkit: "text",
				prefixIcon: "map-pin",
				outerClass: "col-12 sm:col-6 md:col-4",
				name: "address",
				label: t("address"),
				placeholder: t("address"),
			},
			{
				$formkit: "text",
				prefixIcon: "link",
				outerClass: "col-12 sm:col-6 md:col-4",
				name: "partialLink",
				label: t("partialLink"),
				placeholder: t("partialLink"),
			},
			// Note: partialLinks is a map type and might need a custom component or different handling
		],
	},
};

const columns: DatalistColumnsBase<TenantsSchemaPartial> = {
	partialId: new ColumnText("partialId", {
		isSortable: true,
	}),
	partialName: new ColumnText("partialName", {
		isSortable: true,
		isGlobalFilter: true,
		filters: [
			{
				isGlobal: true,
				matchMode: "contains",
				input: {
					$formkit: "text",
					prefixIcon: "search",
					outerClass: "col-12 sm:col-6 md:col-3",
					name: "partialName",
					label: t("partialName"),
					placeholder: t("partialName"),
				},
			},
		],
	}),
	partialTypeId: new ColumnText("partialTypeId", {
		isSortable: true,
	}),
	sectionId: new ColumnText("sectionId", {
		isSortable: true,
	}),
	isFeatured: new ColumnText("isFeatured", {
		isSortable: true,
	}),
	createdAt: new ColumnDate("createdAt", {
		isSortable: true,
	}),
};

const rowIdentifier = "partialId" as const;

const tableProps: DatalistProps<
	typeof apiClient,
	PartialListRequest,
	TenantsSchemaPartial,
	undefined,
	undefined,
	PartialCreateUpdateRequest
> = {
	context: {
		datalistKey: "tenant-partials",
		title: t("tenantPartials"),
		rowIdentifier,
		columns,
		records: apiClient.partialList,
		viewRouter: {
			name: "tenant_partial_find",
			paramName: "id",
			paramColumnName: rowIdentifier,
		},
		isServerSide: false,
		isPresistFilters: true,
		isExportable: false,
		isLazyFilters: true,
		formSections,
		isActionsDropdown: true,
		options: { title: t("tenantPartials"), description: t("Manage all tenant section partials") },
	},
};
</script>

<template>
	<Datalist :context="tableProps.context" />
</template>
