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
    line-height: 60px;
    position: relative;
  }

  .site-title {
    font-size: 31px;
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
    line-height: 60px;
  }

  .page-link {
    color: #111;
    line-height: 1.5;
    margin-left: 30px;
    font-size: 18px;
  }

  .page-link:hover {
    text-decoration: none;
    color: #111;
  }
</style>