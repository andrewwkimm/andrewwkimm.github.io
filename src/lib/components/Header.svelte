<script>
  const navigation = [
    { name: 'Blog', href: '/blog' },
    { name: 'Resume', href: '/resume' },
    { name: 'Portfolio', href: '/portfolio' },
    { name: 'Reading List', href: '/reading_list' }
  ];
</script>

<header class="site-header">
  <div class="wrapper">
    <a class="site-title" href="/">Andrew Kim</a>

    <nav class="site-nav">
      {#each navigation as item}
        <a class="page-link" href={item.href}>{item.name}</a>
      {/each}
    </nav>
  </div>
</header>

<style>
  .site-header {
    border-top: 5px solid #424242;
    border-bottom: 1px solid #e8e8e8;
    min-height: 55.95px;
    line-height: 54px;
    position: relative;
  }

  .site-title {
    font-size: 26px;
    font-weight: 300;
    letter-spacing: -1px;
    margin-bottom: 0;
    float: left;
    color: #424242;
  }

  .site-title:hover {
    text-decoration: none;
  }

  .site-nav {
    float: right;
    line-height: 54px;
  }

  .page-link {
    color: #111;
    line-height: 1.5;
    margin-left: 20px;
  }

  .page-link:hover {
    text-decoration: none;
    color: #111;
  }
</style>