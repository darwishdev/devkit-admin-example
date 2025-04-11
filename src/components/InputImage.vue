<script lang="ts" setup>
import { ref } from 'vue'
import { type FormKitNode } from '@formkit/core'
import { apiClient } from '@/api/apiClient'
export type UploadFileValue = {
  name: string
  type: string
  size: number
  file: Uint8Array
}

export type InputUploaderProps = {
  context: {
    node: FormKitNode
  }
}

const { context } = defineProps<InputUploaderProps>()

const { node } = context
const fileInput = ref<HTMLInputElement | null>(null)

const handleFileChange = (event: Event) => {
  console.log("filte changed", event);
  // console.log(datalistStore.modelFiltersRef.bucketId)
  const bucketId = { value: "images" };
  if (!bucketId.value) {
    console.error("bucket should be selected to be able to upload");
    return;
  }
  const target = event.target as HTMLInputElement;
  if (!target.files || target.files.length === 0) return;
  console.log("should handle the upload", bucketId.value);
  uploadFiles(target.files);
}



const uploadFiles = async (files: FileList) => {
  console.log("uploading", files);
  try {
    const file = files[0];
    const filePath = file.name; // Adjust based on your needs
    const fileType = file.type;
    const bucketName = 'abchotels';
    if (!bucketName) return;
    const reader = new FileReader();
    reader.onload = () => {
      if (reader.result instanceof ArrayBuffer) {
        const fileRequest = {
          path: filePath,
          bucketName: bucketName as string,
          reader: new Uint8Array(reader.result),
          fileType: fileType,
        };
        apiClient.fileCreate(fileRequest).then((response) => {
          node.input(response.path)
        });
        console.log("FileCreateRequest:", fileRequest);
      }
    };

    reader.readAsArrayBuffer(file);
  } catch (error) {
    console.error("Upload failed:", error);
  }
}

</script>

<template>
  <input ref="fileInput" type="file" @change="handleFileChange" :accept="node.props.accept || '*/*'" />
</template>
