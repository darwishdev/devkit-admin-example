<script setup lang="ts">
import type {
  AuthLoginRequest,
  AuthLoginResponse,
} from "@buf/ahmeddarwish_devkit-api.bufbuild_es/devkit/v1/accounts_auth_pb";
import AppForm, { type AppFormProps } from "devkit-admin/form";

// export type AppFormProps<TKey extends string, TFormRequest extends StringUnkownRecord = StringUnkownRecord, TApiRequest extends StringUnkownRecord = TFormRequest, TApiResponse extends StringUnkownRecord = StringUnkownRecord, TFindRequestPropName extends string | undefined = 'recordId', TFindResponsePropName extends string | undefined = 'request', TFindCallbakResponse = unknown, TCallbakResponse = unknown> = {
const loginFormProps: AppFormProps<
  "login",
  AuthLoginRequest,
  AuthLoginRequest,
  AuthLoginResponse
> = {
  context: {
    title: "login",
    formKey: "login",
    resetOnSuccess: true,
    isLazy: true,
    options: {},
    submitHandler: {
      endpoint: "authLogin",
      redirectRoute: "dashboard",
      callback: (response) => {
        if (response.navigationBar)
          localStorage.setItem(
            "sidebar",
            JSON.stringify(response.navigationBar),
          );
        // 2. Cache the access token
        if (response.loginInfo) {
          localStorage.setItem("token", response.loginInfo.accessToken);
        }
        // 3. Cache the user info
        if (response.user)
          localStorage.setItem("user_info", JSON.stringify(response.user));
      },
    },
    sections: {
      user_info: {
        isTitleHidden: true,
        isTransparent: true,
        inputs: [
          {
            $formkit: "text",
            prefixIcon: "tools",
            outerClass: "col-12 sm:col-6 md:col-5",
            name: "loginCode",
            validation: "required",
            placeholder: "user name",
            label: "userName",
          },
          {
            $formkit: "password",
            prefixIcon: "tools",
            outerClass: "col-12 sm:col-6 md:col-5",
            name: "userPassword",
            validation: "required",
            placeholder: "password",
            label: "password",
          },
        ],
      },
    },
  },
};
</script>
<template>
  <div class="card flex justify-center">
    <AppForm :context="loginFormProps.context" />
  </div>
</template>
