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
import type {
	PageCreateUpdateRequest,
	PageListRequest,
	TenantsSchemaPage,
} from "@buf/ahmeddarwish_devkit-api.bufbuild_es/devkit/v1/tenant_page_pb";


const { t } = useI18n();

const formSections: AppFormSections<PageCreateUpdateRequest> = {
	page_info: {
		isTitleHidden: true,
		isTransparent: true,
		inputs: [
			{
				$formkit: "text",
				prefixIcon: "edit",
				outerClass: "col-12 sm:col-6 md:col-4",
				name: "pageName",
				validation: "required",
				label: t("pageName"),
				placeholder: t("pageName"),
			},
			{
				$formkit: "text",
				prefixIcon: "edit",
				outerClass: "col-12 sm:col-6 md:col-4",
				name: "pageNameAr",
				validation: "required",
				label: t("pageNameAr"),
				placeholder: t("pageNameAr"),
			},
			{
				$formkit: "textarea",
				prefixIcon: "align-left",
				outerClass: "col-12 sm:col-6 md:col-4",
				name: "pageDescription",
				label: t("pageDescription"),
				placeholder: t("pageDescription"),
			},
			{
				$formkit: "textarea",
				prefixIcon: "align-left",
				outerClass: "col-12 sm:col-6 md:col-4",
				name: "pageDescriptionAr",
				label: t("pageDescriptionAr"),
				placeholder: t("pageDescriptionAr"),
			},
			{
				$formkit: "text",
				prefixIcon: "navigation",
				outerClass: "col-12 sm:col-6 md:col-4",
				name: "pageBreadcrumb",
				label: t("pageBreadcrumb"),
				placeholder: t("pageBreadcrumb"),
			},
			{
				$formkit: "text",
				prefixIcon: "store",
				outerClass: "col-12 sm:col-6 md:col-4",
				name: "tenantId",
				label: t("tenantId"),
				placeholder: t("tenantId"),
			},
			{
				$formkit: "text",
				prefixIcon: "route",
				outerClass: "col-12 sm:col-6 md:col-4",
				name: "pageRoute",
				label: t("pageRoute"),
				placeholder: t("pageRoute"),
			},
			{
				$formkit: "text",
				prefixIcon: "image",
				outerClass: "col-12 sm:col-6 md:col-4",
				name: "pageCoverImage",
				label: t("pageCoverImage"),
				placeholder: t("pageCoverImage"),
			},
			{
				$formkit: "text",
				prefixIcon: "video",
				outerClass: "col-12 sm:col-6 md:col-4",
				name: "pageCoverVideo",
				label: t("pageCoverVideo"),
				placeholder: t("pageCoverVideo"),
			},
			{
				$formkit: "text",
				prefixIcon: "tag",
				outerClass: "col-12 sm:col-6 md:col-4",
				name: "pageKeyWords",
				label: t("pageKeyWords"),
				placeholder: t("pageKeyWords (comma-separated)"),
			},
			{
				$formkit: "textarea",
				prefixIcon: "description",
				outerClass: "col-12 sm:col-6 md:col-4",
				name: "pageMetaDescription",
				label: t("pageMetaDescription"),
				placeholder: t("pageMetaDescription"),
			},
			{
				$formkit: "text",
				prefixIcon: "icon",
				outerClass: "col-12 sm:col-6 md:col-4",
				name: "pageIcon",
				label: t("pageIcon"),
				placeholder: t("pageIcon"),
			},
		],
	},
};

const columns: DatalistColumnsBase<TenantsSchemaPage> = {
	pageId: new ColumnText("pageId", {
		isSortable: true,
	}),
	pageName: new ColumnText("pageName", {
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
					name: "pageName",
					label: t("pageName"),
					placeholder: t("pageName"),
				},
			},
		],
	}),
	pageRoute: new ColumnText("pageRoute", {
		isSortable: true,
	}),
	pageBreadcrumb: new ColumnText("pageBreadcrumb", {
		isSortable: true,
	}),
	pageDescription: new ColumnText("pageDescription", {
		isSortable: true,
	}),
	createdAt: new ColumnDate("createdAt", {
		isSortable: true,
	}),
};

const rowIdentifier = "pageId" as const;

const tableProps: DatalistProps<
	typeof apiClient,
	PageListRequest,
	TenantsSchemaPage,
	undefined,
	undefined,
	PageCreateUpdateRequest
> = {
	context: {
		datalistKey: "tenant-pages",
		title: t("tenantPages"),
		rowIdentifier,
		columns,
		records: apiClient.pageList,
		viewRouter: {
			name: "tenant_page_find",
			paramName: "id",
			paramColumnName: rowIdentifier,
		},
		isServerSide: false,
		isPresistFilters: true,
		isExportable: false,
		isLazyFilters: true,
		formSections,
		isActionsDropdown: true,
		options: {
			title: t("tenantPages"),
			description: t("Manage all tenant pages and their metadata"),
		},
	},
};
</script>

<template>
	<Datalist :context="tableProps.context" />
</template>
