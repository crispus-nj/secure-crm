<!-- eslint-disable vue/multi-word-component-names -->
<!-- eslint-disable @typescript-eslint/no-unused-vars -->
<!-- eslint-disable vue/no-reserved-component-names -->
<script setup lang="ts">
import { Form, Field } from 'vee-validate'
import type { PropType } from 'vue'

interface FieldSchema {
  name: string
  label: string
  as: string
}

interface FormSchema {
  fields: FieldSchema[]
}

const props = defineProps<{
  schema: FormSchema
}>()
</script>

<template>
  <Form>
    <div v-for="field in schema.fields" :key="field.name">
      <label :for="field.name">{{ field.label }}</label>
      <Field :as="field.as" :id="field.name" :name="field.name" />
    </div>
    <button>Submit</button>
  </Form>
</template>
