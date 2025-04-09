<script lang="ts" setup>
import Editor, { type EditorProps } from 'primevue/editor';
import { watchEffect, h, ref, } from "vue";
import { useFormKitContext } from "@formkit/vue";
import { type FormKitNode } from "@formkit/core";
export type InputEditorProps = {
  context: {
    node: FormKitNode
    primeProps: EditorProps
  }
}
const { context } =
  defineProps<InputEditorProps>();
const emit = defineEmits<{
  (e: "valueChange", value: unknown): void;
}>();
const {
  node,
} = context;

const formValue = ref<string>(node.value as string);

const onValueChange = (value: any) => {
  if (formValue.value !== value) {
    formValue.value = value;
    node.input(value)
  }
};
const renderInputEditor = () => {
  return h(
    Editor,
    {
      ...context.primeProps,
      modelValue: formValue.value,
      "onUpdate:modelValue": onValueChange,
    },

  );
};
</script>
<template>
  <component :is="renderInputEditor" />
</template>
