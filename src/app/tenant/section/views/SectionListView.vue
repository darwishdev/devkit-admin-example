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
import type { SectionCreateUpdateRequest, SectionListRequest, TenantsSchemaSection } from "@buf/ahmeddarwish_devkit-api.bufbuild_es/devkit/v1/tenant_section_pb";
const { t } = useI18n();

const formSections: AppFormSections<SectionCreateUpdateRequest> = {
	section_info: {
		isTitleHidden: true,
		isTransparent: true,
		inputs: [
			{
				$formkit: "text",
				prefixIcon: "edit",
				outerClass: "col-12 sm:col-6 md:col-4",
				name: "sectionName",
				validation: "required",
				label: t("sectionName"),
				placeholder: t("sectionName"),
			},
			{
				$formkit: "text",
				prefixIcon: "edit",
				outerClass: "col-12 sm:col-6 md:col-4",
				name: "sectionNameAr",
				validation: "required",
				label: t("sectionNameAr"),
				placeholder: t("sectionNameAr"),
			},
			{
				$formkit: "text",
				prefixIcon: "header",
				outerClass: "col-12 sm:col-6 md:col-4",
				name: "sectionHeader",
				label: t("sectionHeader"),
				placeholder: t("sectionHeader"),
			},
			{
				$formkit: "text",
				prefixIcon: "header",
				outerClass: "col-12 sm:col-6 md:col-4",
				name: "sectionHeaderAr",
				label: t("sectionHeaderAr"),
				placeholder: t("sectionHeaderAr"),
			},
			{
				$formkit: "textarea",
				prefixIcon: "align-left",
				outerClass: "col-12 sm:col-6 md:col-4",
				name: "sectionDescription",
				label: t("sectionDescription"),
				placeholder: t("sectionDescription"),
			},
			{
				$formkit: "textarea",
				prefixIcon: "align-left",
				outerClass: "col-12 sm:col-6 md:col-4",
				name: "sectionDescriptionAr",
				label: t("sectionDescriptionAr"),
				placeholder: t("sectionDescriptionAr"),
			},
			{
				$formkit: "text",
				prefixIcon: "tag",
				outerClass: "col-12 sm:col-6 md:col-4",
				name: "sectionButtonLabel",
				label: t("sectionButtonLabel"),
				placeholder: t("sectionButtonLabel"),
			},
			{
				$formkit: "text",
				prefixIcon: "tag",
				outerClass: "col-12 sm:col-6 md:col-4",
				name: "sectionButtonLabelAr",
				label: t("sectionButtonLabelAr"),
				placeholder: t("sectionButtonLabelAr"),
			},
			{
				$formkit: "text",
				prefixIcon: "link",
				outerClass: "col-12 sm:col-6 md:col-4",
				name: "sectionButtonPageId",
				label: t("sectionButtonPageId"),
				placeholder: t("sectionButtonPageId"),
			},
			{
				$formkit: "text",
				prefixIcon: "image",
				outerClass: "col-12 sm:col-6 md:col-4",
				name: "sectionBackground",
				label: t("sectionBackground"),
				placeholder: t("sectionBackground"),
			},
			{
				$formkit: "text",
				prefixIcon: "icon",
				outerClass: "col-12 sm:col-6 md:col-4",
				name: "sectionIcon",
				label: t("sectionIcon"),
				placeholder: t("sectionIcon"),
			},
			{
				$formkit: "text",
				prefixIcon: "images",
				outerClass: "col-12 sm:col-6 md:col-4",
				name: "sectionImages",
				label: t("sectionImages"),
				placeholder: t("sectionImages"),
			},
			{
				$formkit: "text",
				prefixIcon: "store",
				outerClass: "col-12 sm:col-6 md:col-4",
				name: "tenantId",
				label: t("tenantId"),
				placeholder: t("tenantId"),
			},
		],
	},
};

const columns: DatalistColumnsBase<TenantsSchemaSection> = {
	sectionId: new ColumnText("sectionId", {
		isSortable: true,
	}),
	sectionName: new ColumnText("sectionName", {
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
					name: "sectionName",
					label: t("sectionName"),
					placeholder: t("sectionName"),
				},
			},
		],
	}),
	sectionHeader: new ColumnText("sectionHeader", {
		isSortable: true,
	}),
	sectionDescription: new ColumnText("sectionDescription", {
		isSortable: true,
	}),
	createdAt: new ColumnDate("createdAt", {
		isSortable: true,
	}),
};

const rowIdentifier = "sectionId" as const;

const tableProps: DatalistProps<
	typeof apiClient,
	SectionListRequest,
	TenantsSchemaSection,
	undefined,
	undefined,
	SectionCreateUpdateRequest
> = {
	context: {
		datalistKey: "tenant-sections",
		title: t("tenantSections"),
		rowIdentifier,
		columns,
		records: apiClient.sectionList,
		viewRouter: {
			name: "tenant_section_find",
			paramName: "id",
			paramColumnName: rowIdentifier,
		},
		isServerSide: false,
		isPresistFilters: true,
		isExportable: false,
		isLazyFilters: true,
		formSections,
		isActionsDropdown: true,
		options: { title: t("tenantSections"), description: t("Manage all tenant homepage sections") },
	},
};
</script>

<template>
	<Datalist :context="tableProps.context" />
</template>
