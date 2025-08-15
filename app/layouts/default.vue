<script setup lang="ts">
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
  navigationMenuTriggerStyle,
} from "@/components/ui/navigation-menu";

class HeaderComponents {
  public title: string;
  public description: string;

  public img: string;

  public components: {
    title: string;
    href: string;
    description: string;
  }[];

  constructor(
    title: string,
    description: string,
    img: string,
    components: { title: string; href: string; description: string }[]
  ) {
    this.title = title;
    this.description = description;
    this.img = img;
    this.components = components;
  }
}

const components: HeaderComponents[] = [
  new HeaderComponents(
    "adam",
    "(about me🤸‍♂️)",
    "https://www.reka-ui.com/logo.svg",
    [
      {
        title: "my story",
        href: "/me/story",
        description: "Return to the homepage.",
      },
      {
        title: "my ambitions",
        href: "/me/ambitions",
        description: "Learn more about me.",
      },
      {
        title: "contact me",
        href: "/me/contact",
        description: "Get in touch with me.",
      },
    ]
  ),

  new HeaderComponents(
    "hacker",
    "(projects 💻)",
    "https://www.reka-ui.com/logo.svg",
    [
      {
        title: "my story",
        href: "/me/story",
        description: "Return to the homepage.",
      },
      {
        title: "my ambitions",
        href: "/me/ambitions",
        description: "Learn more about me.",
      },
      {
        title: "contact me",
        href: "/me/contact",
        description: "Get in touch with me.",
      },
    ]
  ),

  new HeaderComponents(
    "etc.",
    "(other 📸)",
    "https://www.reka-ui.com/logo.svg",
    [
      {
        title: "photography",
        href: "/me/story",
        description: "Return to the homepage.",
      },
      {
        title: "my ambitions",
        href: "/me/ambitions",
        description: "Learn more about me.",
      },
      {
        title: "contact me",
        href: "/me/contact",
        description: "Get in touch with me.",
      },
    ]
  ),
];
</script>

<template>
  <div>
    <header
      class="sticky top-0 left-0 right-0 z-50 flex w-full items-center justify-between p-4"
    >
      <div class="grow"></div>

      <NavigationMenu>
        <NavigationMenuList>
          <template v-for="component in components" :key="component.title">
            <NavigationMenuItem>
              <NavigationMenuTrigger>
                <span class="font-black">{{ component.title }}&nbsp;</span
                >{{ component.description }}
              </NavigationMenuTrigger>

              <NavigationMenuContent>
                <ul
                  class="grid gap-3 p-6 md:w-[400px] lg:w-[500px] lg:grid-cols-[minmax(0,.75fr)_minmax(0,1fr)]"
                >
                  <li class="row-span-3">
                    <NavigationMenuLink as-child>
                      <a
                        class="flex h-full w-full select-none flex-col justify-end rounded-md bg-gradient-to-b from-muted/50 to-muted p-6 no-underline outline-none focus:shadow-md"
                        href="/"
                      >
                        <img
                          src="https://www.reka-ui.com/logo.svg"
                          class="h-6 w-6"
                        />
                        <!-- <div class="mb-2 mt-4 text-lg font-medium">shadcn/ui</div>
                      <p class="text-sm leading-tight text-muted-foreground">
                        Beautifully designed components built with Radix UI and
                        Tailwind CSS.
                      </p> -->
                      </a>
                    </NavigationMenuLink>
                  </li>

                  <li v-for="item in component.components">
                    <NavigationMenuLink as-child>
                      <a
                        :href="item.href"
                        class="block select-none space-y-1 rounded-md p-3 leading-none no-underline outline-none transition-colors hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground"
                      >
                        <div class="text-sm font-medium leading-none">
                          {{ item.title }}
                        </div>
                        <p
                          class="line-clamp-2 text-sm leading-snug text-muted-foreground"
                        >
                          {{ item.description }}
                        </p>
                      </a>
                    </NavigationMenuLink>
                  </li>
                </ul>
              </NavigationMenuContent>
            </NavigationMenuItem>
          </template>
        </NavigationMenuList>
        <NavigationMenuViewport />
      </NavigationMenu>

      <div class="grow"></div>
    </header>

    <slot />
  </div>
</template>

<style scoped>
.vertical-bar {
  width: 1px;
  height: 50px;
  background-color: black;
}
</style>
