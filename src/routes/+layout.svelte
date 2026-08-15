<script lang="ts">
  import { onMount } from 'svelte';
  import { afterNavigate } from '$app/navigation';
  import { analytics } from '$lib/analytics';
  import { theme } from '$lib/theme.svelte';
  import SiteHeader from '$lib/components/SiteHeader.svelte';
  import SiteFooter from '$lib/components/SiteFooter.svelte';
  import '../app.css';

  let { children } = $props();

  const GA_MEASUREMENT_ID = import.meta.env.VITE_GA_MEASUREMENT_ID;
  const isProduction = import.meta.env.PROD;

  onMount(() => {
    theme.sync();
    analytics.initialize(GA_MEASUREMENT_ID, isProduction);
    analytics.trackPageView();
  });

  afterNavigate(() => {
    analytics.trackPageView();
  });
</script>

<SiteHeader />

<main>
  <div class="wrapper page">
    {@render children()}
  </div>
</main>

<SiteFooter />
