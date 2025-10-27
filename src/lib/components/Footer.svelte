<script>
  const socialLinks = [
    { platform: 'github', url: 'https://github.com/andrewwkimm', username: 'andrewwkimm' },
    { platform: 'instagram', url: 'https://www.instagram.com/andrewkim.io/', username: 'andrewkim.io' },
    { platform: 'linkedin', url: 'https://www.linkedin.com/in/andrewwkimm/', username: 'andrewwkimm' },
    { platform: 'twitter', url: 'https://twitter.com/andrewkimssk', username: 'andrewkimssk' }
  ];

  const currentYear = new Date().getFullYear();
</script>

<footer class="site-footer">
  <div class="wrapper">
    <div class="footer-content">
      <div class="footer-col-1">
        <ul class="social-media-list">
          {#each socialLinks as link}
            <li>
              <a href={link.url} target="_blank" rel="noopener noreferrer">
                {link.username}
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

  /* Changed grid ratio to 1fr 2fr to make the second column (description) wider */
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

  .social-media-list li {
    /* No styles needed here, uses default block spacing */
  }

  .social-media-list a {
    color: #828282;
    font-size: 18px;
  }

  .social-media-list a:hover {
    color: #111;
  }

  .footer-col-2 p {
    color: #828282;
    font-size: 17px;
    line-height: 1.5;
  }

  /* Removed border-top and adjusted padding to remove the line */
  .copyright {
    text-align: center;
    padding-top: 10px;
    padding-bottom: 20px;
  }

  .copyright p {
    color: #828282;
    font-size: 15px;
  }
</style>