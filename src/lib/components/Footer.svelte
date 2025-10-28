<script>
  const socialLinks = [
    {
      platform: 'Email',
      url: 'mailto:andrewkimka@gmail.com',
      username: 'andrewkimka@gmail.com',
      icon: 'fa-solid fa-envelope'
    },
    {
      platform: 'GitHub',
      url: 'https://github.com/andrewwkimm',
      username: 'andrewwkimm',
      icon: 'fa-brands fa-github'
    },
    {
      platform: 'LinkedIn',
      url: 'https://www.linkedin.com/in/andrewwkimm/',
      username: 'andrewwkimm',
      icon: 'fa-brands fa-linkedin'
    },
  ];

  const currentYear = new Date().getFullYear();
</script>

<footer class="site-footer">
  <div class="wrapper">
    <div class="footer-content">
      <div class="footer-col-1">
        <ul class="social-media-list">
          {#each socialLinks as { platform, url, username, icon }}
            <li>
              <a href={url} target="_blank" rel="noopener noreferrer">
                <i class={icon}></i>
                <span>{username}</span>
              </a>
            </li>
          {/each}
        </ul>
      </div>
      <div class="footer-col-2">
        <p>I am a Korean-American Data Engineer based in New York City building data apps, platforms, and tooling.</p>
      </div>
    </div>
    <div class="copyright">
      <p>© Andrew Kim {currentYear}</p>
    </div>
  </div>
</footer>

<style>
  .site-footer {
    border-top: 1px solid #e8e8e8;
    padding: 30px 0 20px 0;
    margin-top: auto;
    background-color: #fdfdfd;
  }

  .footer-content {
    display: grid;
    grid-template-columns: 1fr 1.58fr;
    gap: 40px;
    margin-bottom: 20px;
  }

  @media screen and (max-width: 600px) {
    .footer-content {
      grid-template-columns: 1fr;
      gap: 20px;
    }
  }

  .social-media-list {
    list-style: none;
    margin: 0;
    padding: 0;
  }

  .social-media-list a {
    color: #828282;
    font-size: 18px;
    display: flex;
    align-items: center;
    gap: 8px;
  }

  .social-media-list a:hover {
    color: #111;
  }

  .social-media-list i {
    width: 18px;
    text-align: center;
  }

  .footer-col-2 p {
    color: #828282;
    font-size: 17px;
    line-height: 1.5;
    margin: 0;
  }

  .copyright {
    text-align: center;
    padding-bottom: 20px;
  }

  .copyright p {
    color: #828282;
    font-size: 15px;
    margin: 0;
  }
</style>