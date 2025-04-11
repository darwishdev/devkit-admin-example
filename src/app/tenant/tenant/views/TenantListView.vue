<script setup lang="ts">
import type { TenantCreateUpdateRequest, TenantListRequest, TenantsSchemaTenant } from "@buf/ahmeddarwish_devkit-api.bufbuild_es/devkit/v1/tenant_tenant_pb";
import type { AppFormSections } from "devkit-admin/form";
PageListRequestSchema
import Datalist, { ColumnDate, ColumnText, type DatalistColumnsBase, type DatalistProps } from "devkit-admin/datalist";

import { useI18n } from "vue-i18n";

import { apiClient } from "@/api/apiClient";
import { PageListRequestSchema } from "@buf/ahmeddarwish_devkit-api.bufbuild_es/devkit/v1/tenant_page_pb";
const { t } = useI18n();

const formSections: AppFormSections<TenantCreateUpdateRequest> = {
	tenant_info: {
		isTitleHidden: true,
		isTransparent: true,
		inputs: [
			{
				$formkit: "text",
				prefixIcon: "store",
				name: "tenantName",
				validation: "required",
				placeholder: t("tenantName"),
				label: t("tenantName"),
			},
			{
				$formkit: "text",
				prefixIcon: "phone",
				name: "tenantPhone",
				validation: "required",
				placeholder: t("tenantPhone"),
				label: t("tenantPhone"),
			},
			{
				$formkit: "text",
				prefixIcon: "email",
				name: "tenantEmail",
				validation: "required|email",
				placeholder: t("tenantEmail"),
				label: t("tenantEmail"),
			},
			{
				$formkit: "text",
				prefixIcon: "map",
				name: "tenantAddress",
				validation: "required",
				placeholder: t("tenantAddress"),
				label: t("tenantAddress"),
			},
			{
				$formkit: "devkitEditor",
				prefixIcon: "file-text",
				name: "tenantDescription",
				placeholder: t("tenantDescription"),
				primeProps: {
					editorStyle: { height: '120px' }
				},
				label: t("tenantDescription"),
			},
			{
				$formkit: "devkitImage",
				accept: '.png,.svg,.webp',
				prefixIcon: "image",
				name: "tenantLogo",
				placeholder: t("tenantLogo"),
				label: t("tenantLogo"),
			},
			{
				$formkit: "text",
				prefixIcon: "image",
				name: "tenantLogoVertical",
				placeholder: t("tenantLogoVertical"),
				label: t("tenantLogoVertical"),
			},
		],
	},
};
;

const columns: DatalistColumnsBase<TenantsSchemaTenant> = {
	tenantId: new ColumnText("tenantId", {
		isSortable: true,
		isGlobalFilter: true,
	}),

	tenantName: new ColumnText("tenantName", {
		isSortable: true,
		isGlobalFilter: true,
		filters: [
			{
				isGlobal: true,
				matchMode: "contains",
				input: {
					$formkit: "text",
					prefixIcon: "tools",
					name: "tenantName",
					validation: "",
					label: t("tenantName"),
					placeholder: t("tenantName"),
				},

			},


		],
	}),

	tenantPhone: new ColumnText("tenantPhone", {
		isSortable: true,
		isGlobalFilter: true,
		filters: [
			{
				isGlobal: true,
				matchMode: "contains",
				input: {
					$formkit: "text",
					prefixIcon: "tools",
					outerClass: "",
					name: "tenantPhone",
					validation: "",
					label: t("tenantPhone"),
					placeholder: t("tenantPone"),
				},
			},
		]
	}),

	tenantEmail: new ColumnText("tenantEmail", {
		isSortable: true,
		isGlobalFilter: true,
	}),

	createdAt: new ColumnDate("createdAt", {
		isSortable: true,
	}),
};

const rowIdentifier = "tenantId" as const;
const tableProps: DatalistProps<
	typeof apiClient,
	TenantListRequest,
	TenantsSchemaTenant,
	undefined,
	undefined,
	TenantCreateUpdateRequest
> = {
	context: {
		datalistKey: "user",
		title: "users",
		rowIdentifier,
		columns,
		records: apiClient.tenantList,
		viewRouter: {
			name: "user_find",
			paramName: "id",
			paramColumnName: rowIdentifier,
		},
		isServerSide: false,
		isPresistFilters: true,
		isExportable: false,
		// displayType: 'table',
		isLazyFilters: true,
		formSections,
		isActionsDropdown: true,
		options: { title: "asd", description: "asd" },
	},
};
</script>
<template>
	<Datalist :context="tableProps.context" />
</template>
