<script>
  import { onMount } from 'svelte';
  import { afterNavigate } from '$app/navigation';
  import { analytics } from '$lib/analytics';
  import Header from '$lib/components/Header.svelte';
  import Footer from '$lib/components/Footer.svelte';
  import '../app.css';

  const GA_MEASUREMENT_ID = 'G-HQYDFZ9L6R';

  const isProduction = import.meta.env.PROD;

  onMount(() => {
    analytics.initialize(GA_MEASUREMENT_ID, isProduction);
    analytics.trackPageView();
  });

  afterNavigate(() => {
    analytics.trackPageView();
  });
</script>

<Header />

<main class="py-10">
  <div class="wrapper">
    <slot />
  </div>
</main>

<Footer />