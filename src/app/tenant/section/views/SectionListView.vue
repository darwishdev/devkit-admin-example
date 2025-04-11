<script setup lang="ts">

import type { AppFormSections } from "devkit-admin/form";
import Datalist, {
	ColumnText,
	type DatalistColumnsBase,
	type DatalistProps,
	ColumnImage,
} from "devkit-admin/datalist";

import { useI18n } from "vue-i18n";
import { apiClient } from "@/api/apiClient";
import type { SectionCreateUpdateRequest, SectionListRequest, TenantsSchemaSection } from "@buf/ahmeddarwish_devkit-api.bufbuild_es/devkit/v1/tenant_section_pb";
import { ColumnRichText } from "@/pkg/utils/ColumnRichText";
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
				$formkit: "devkitEditor",
				prefixIcon: "header",
				outerClass: "col-12 sm:col-6 md:col-4",
				name: "sectionHeader",
				label: t("sectionHeader"),
				placeholder: t("sectionHeader"),
			},
			{
				$formkit: "devkitEditor",
				prefixIcon: "align-left",
				outerClass: "col-12 sm:col-6 md:col-4",
				name: "sectionDescription",
				label: t("sectionDescription"),
				placeholder: t("sectionDescription"),
			},
			{
				$formkit: "devkitImage",
				prefixIcon: "image",
				outerClass: "col-12 sm:col-6 md:col-4",
				name: "sectionBackground",
				label: t("sectionBackground"),
				placeholder: t("sectionBackground"),
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
	sectionHeader: new ColumnImage("sectionBackground", {
		isSortable: true,
	}),
	sectionDescription: new ColumnRichText("sectionHeader", {
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
