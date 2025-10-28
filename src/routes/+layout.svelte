<script>
  import Header from '$lib/components/Header.svelte';
  import Footer from '$lib/components/Footer.svelte';
  import '../app.css';

  export const prerender = true;
</script>

<Header />

<main class="page-content" aria-label="Content">
  <div class="wrapper">
    <slot />
  </div>
</main>

<Footer />