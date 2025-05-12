
import { createInput, defaultConfig } from '@formkit/vue'
import { DependencyManagerPlugin, OptionsGetterPlugin, Dropdown,  Datepicker } from 'devkit-admin/form'

import { rootClasses } from './formkit.theme'
import { ar, en } from '@formkit/i18n'

import type { FormKitPlugin } from '@formkit/core';
import InputEditor from './components/InputEditor.vue';

import { createProPlugin, inputs } from '@formkit/pro'
import InputImage from './components/InputImage.vue';
const pro = createProPlugin(import.meta.env.VITE_FORMKIT_TOKEN, inputs)
const isCheckboxAndRadioMultiple: FormKitPlugin = (node: any) => (node.props.type === 'checkbox' || node.props.type === 'radio') && node.props.options
const addAsteriskPlugin: FormKitPlugin = (node) => {
  node.on('created', () => {
    const isRequired = node.props.parsedRules.some((rule: any) => rule.name === 'required');
    if (!isRequired || !node.props) return
    if (!node.props.definition) return
    const isMultiOption = isCheckboxAndRadioMultiple(node)
    node.props.definition.schemaMemoKey = `required_${isMultiOption ? 'multi_' : ""}${node.props.definition.schemaMemoKey}`
    const schemaFn = node.props.definition.schema;
    node.props.definition.schema = (sectionsSchema: any = {}) => {
      if (isRequired) {
        if (isMultiOption) {
          sectionsSchema.legend = {
            children: ['$label', '*']
          }
        } else {
          sectionsSchema.label = {
            children: ['$label', '*']
          }
        }
      }
      return schemaFn(sectionsSchema);
    }
  })
}
const formKitConfig = () => {
  const plugins: FormKitPlugin[] = [
    addAsteriskPlugin,
    DependencyManagerPlugin,
    OptionsGetterPlugin,
    pro,
  ]
  const commonDropdownProps = [
    "options",
    "cacheKey",
    "cacheTimeout",
    "createRoute",
    "useLazy",
    "convertToFlat",
    "dependsOn",
    "requestPropertyName",
    'responseOptionsKey',
    "requestMapper",
    "bypassCache",
    "optionsMapper",
    "debounceInMilliSeconds",

    // Keys from FormKitInputContext
    "node",

    // Common props shared between single and multi select
    "modelValue",
    "defaultValue",
    "name",
    "options",
    "optionLabel",
    "optionValue",
    "optionDisabled",
    "optionGroupLabel",
    "optionGroupChildren",
    "scrollHeight",
    "filter",
    "filterPlaceholder",
    "filterLocale",
    "filterMatchMode",
    "filterFields",
    "placeholder",
    "size",
    "invalid",
    "disabled",
    "variant",
    "dataKey",
    "showClear",
    "fluid",
    "inputId",
    "panelStyle",
    "panelClass",
    "overlayStyle",
    "overlayClass",
    "appendTo",
    "loading",
    "clearIcon",
    "dropdownIcon",
    "filterIcon",
    "loadingIcon",
    "resetFilterOnHide",
    "resetFilterOnClear",
    "virtualScrollerOptions",
    "autoOptionFocus",
    "autoFilterFocus",
    "focusOnHover",
    "highlightOnSelect",
    "filterMessage",
    "selectionMessage",
    "emptySelectionMessage",
    "emptyFilterMessage",
    "emptyMessage",
    "tabindex",
    "ariaLabel",
    "ariaLabelledby",
    "formControl",
    "dt",
    "pt",
    "ptOptions",
    "unstyled"
  ]
  const singleDropdownProps = [
    ...commonDropdownProps,
    "editable",
    "inputStyle",
    'multiple',
    'useButtons',
    "inputClass",
    "labelId",
    "labelStyle",
    "labelClass",
    "selectOnFocus",
    "checkmark",
  ]
  const multiDropdownProps = [
    ...commonDropdownProps,
    "display",
    "selectedItemsLabel",
    "maxSelectedLabels",
    "selectionLimit",
    "showToggleAll",
    "checkboxIcon",
    "removeTokenIcon",
    "chipIcon",
    "selectAll",
  ]
  const datepickerContextKeys = [
    "disabledDates", // from DatepickerContext
    "disabledDatesRequestPropertyName", // from DatepickerContext
    "disabledDatesResponsePropertyName", // from DatepickerContext
    "dsiabledDatesRequestMapper", // from DatepickerContext
    "dsiabledDatesResponseMapper", // from DatepickerContext
    "convertToNumber", // from DatepickerContext

    "defaultValue",
    "name",
    "selectionMode",
    "dateFormat",
    "inline",
    "showOtherMonths",
    "selectOtherMonths",
    "showIcon",
    "iconDisplay",
    "icon",
    "prevIcon",
    "nextIcon",
    "incrementIcon",
    "decrementIcon",
    "numberOfMonths",
    "responsiveOptions",
    "breakpoint",
    "view",
    "minDate",
    "maxDate",
    "disabledDates",
    "disabledDays",
    "maxDateCount",
    "showOnFocus",
    "autoZIndex",
    "baseZIndex",
    "showButtonBar",
    "shortYearCutoff",
    "showTime",
    "timeOnly",
    "hourFormat",
    "stepHour",
    "stepMinute",
    "stepSecond",
    "showSeconds",
    "hideOnDateTimeSelect",
    "hideOnRangeSelection",
    "timeSeparator",
    "showWeek",
    "manualInput",
    "size",
    "invalid",
    "disabled",
    "variant",
    "readonly",
    "placeholder",

    "appendTo",
    "id",
    "inputId",
    "inputStyle",
    "inputClass",
    "panelStyle",
    "panelClass",
    "todayButtonProps",
    "clearButtonProps",
    "navigatorButtonProps",
    "timepickerButtonProps",
    "fluid",
    "ariaLabelledby",
    "ariaLabel",
    "formControl",
    "dt",
    "pt",
    "ptOptions",
    "unstyled",
  ];
  const dropdownInput = createInput(Dropdown, {
    props: singleDropdownProps,
  })


  const datePickerInput = createInput(Datepicker, {
    props: datepickerContextKeys,
  })

  const editorInput = createInput(InputEditor, {
    props: ['primeProps'],
  })

  const imageInput = createInput(InputImage, {
    props: [''],
  })
  // const imageInput = createInput(InputImage, {
  //   props: [''],
  // })

  const inputs = {
    'devkitDropdown': dropdownInput,
    'devkitDatepicker': datePickerInput,
    'devkitEditor': editorInput,
    'devkitImage': imageInput
    // 'devkitImage': imageInput,

  }
  return defaultConfig({
    inputs,
    locales: { en, ar },
    plugins,
    locale: 'en',
    config: {
      rootClasses,
    }
  })
}
export default formKitConfig
