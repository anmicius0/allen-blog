<template>
  <div class="flex flex-col items-center justify-center space-y-4 text-center">
    <q-avatar
      size="150px"
      src="/Tater.gif"
      alt="Avatar of Tater eating a potato"
    >
      <img src="/Tater.gif" />
    </q-avatar>
    <h1 class="py-4 text-3xl font-bold">{{ $t("pages.home.title") }}</h1>
  </div>
  <div class="mx-auto px-10 py-8">
    <ul class="w-full space-y-4">
      <li>👋 {{ $t("pages.home.subtitle") }}</li>
      <li>
        🛠️ Currently making:
        <NuxtLink :to="localePath('tw2024')" class="underline">{{
          $t("pages.home.making")
        }}</NuxtLink>
      </li>
    </ul>
  </div>
</template>

<script setup>
const { t } = useI18n();
const localePath = useLocalePath();

const pageTitle = t("pages.home.title");
const pageDescription = t("pages.home.subtitle");

useSeoMeta({
  title: pageTitle,
  ogTitle: pageTitle,
  description: pageDescription,
  ogDescription: pageDescription,
  robots: "index, follow",
  ogType: "website",
});
</script>
