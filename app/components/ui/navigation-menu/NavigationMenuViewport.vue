<script setup lang="ts">
import type { NavigationMenuViewportProps } from "reka-ui";
import type { HTMLAttributes } from "vue";
import { reactiveOmit } from "@vueuse/core";
import { NavigationMenuViewport, useForwardProps } from "reka-ui";
import { cn } from "@/lib/utils";

const props = defineProps<
  NavigationMenuViewportProps & { class?: HTMLAttributes["class"] }
>();

const delegatedProps = reactiveOmit(props, "class");

const forwardedProps = useForwardProps(delegatedProps);
</script>

<template>
  <div class="absolute top-full flex justify-center w-full">
    <NavigationMenuViewport
      v-bind="forwardedProps"
      :class="
        cn(
          // removed mt-1.5 below for margin, border for border, md:w-[--reka-navigation-menu-viewport-width]
          'origin-top-center relative h-[--reka-navigation-menu-viewport-height] w-full overflow-hidden rounded-md bg-popover text-popover-foreground  data-[state=open]:animate-in data-[state=closed]:animate-out data-[state=closed]:zoom-out-95 data-[state=open]:zoom-in-90',
          props.class
        )
      "
    />
  </div>
</template>
