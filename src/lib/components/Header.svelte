<script>
  const navigation = [
    { name: 'Blog', href: '/blog' },
    { name: 'Resume', href: '/resume' },
    { name: 'Portfolio', href: '/portfolio' },
    { name: 'Reading List', href: '/reading_list' }
  ];
</script>

<header
  class="
    border-t-[5px]
    border-t-[var(--color-dark-gray)]
    border-b
    border-b-[var(--color-border)]
    min-h-[55.95px]
    leading-[60px]
    flex-shrink-0
  "
>
  <div class="
    wrapper
    flex
    justify-between
    items-center
  ">
    <a
      class="
        text-[31px]
        text-[var(--color-gray)]
        font-light
        tracking-tight
        no-underline
        hover:underline
      "
      href="/"
    >
      Andrew Kim
    </a>

    <nav class="space-x-[30px]">
      {#each navigation as item}
        <a
          class="
            text-[var(--color-gray)]
            no-underline hover:underline
          "
          href={item.href}
        >
          {item.name}
        </a>
      {/each}
    </nav>
  </div>
</header>