<script lang="ts">
  import { page } from '$app/stores';
</script>

<div class="space-y-4">
  <h1>{$page.status}: {$page.error?.message ?? 'Something went wrong'}</h1>
  <p><a href="/">Return home</a></p>
</div>