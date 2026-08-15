<script lang="ts">
  type SocialLink = { platform: string; url: string };

  const socialLinks: SocialLink[] = [
    { platform: 'Email', url: 'mailto:andrewkimka@gmail.com' },
    { platform: 'GitHub', url: 'https://github.com/andrewwkimm' },
    { platform: 'LinkedIn', url: 'https://www.linkedin.com/in/andrewwkimm/' },
    { platform: 'Discord', url: 'https://discord.com/users/1156466317705084948' },
    { platform: 'RSS', url: '/rss.xml' }
  ];

  const currentYear = new Date().getFullYear();
</script>

<footer class="site-footer">
  <div class="wrapper">
    <div class="footer-grid">
      <ul class="social-list">
        {#each socialLinks as link (link.url)}
          <li>
            <a href={link.url} rel={link.url.startsWith('http') ? 'noopener noreferrer' : null}>
              {#if link.platform === 'Email'}
                <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M2.4 5.5A2.5 2.5 0 0 1 4.9 3h14.2a2.5 2.5 0 0 1 2.5 2.5v13a2.5 2.5 0 0 1-2.5 2.5H4.9a2.5 2.5 0 0 1-2.5-2.5v-13Zm2.1.2 7.5 5.6 7.5-5.6H4.5Zm14.8 13.1V8.4L12 13.9 4.7 8.4v10.4h14.6Z"/></svg>
              {:else if link.platform === 'GitHub'}
                <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M12 .7a11.5 11.5 0 0 0-3.6 22.4c.6.1.8-.2.8-.5v-2.2c-3.4.7-4.1-1.4-4.1-1.4-.6-1.4-1.4-1.8-1.4-1.8-1.1-.8.1-.8.1-.8 1.2.1 1.9 1.3 1.9 1.3 1.1 1.9 2.9 1.3 3.6 1 .1-.8.4-1.3.8-1.6-2.7-.3-5.5-1.4-5.5-5.7 0-1.3.4-2.3 1.2-3.1-.1-.3-.5-1.6.1-3.1 0 0 1-.3 3.2 1.2a11 11 0 0 1 5.8-.8c1 0 2 .1 2.9.4 2.2-1.5 3.2-1.2 3.2-1.2.6 1.5.2 2.8.1 3.1.8.8 1.2 1.8 1.2 3.1 0 4.4-2.8 5.4-5.5 5.7.4.4.8 1.1.8 2.2v3.3c0 .3.2.6.8.5A11.5 11.5 0 0 0 12 .7Z"/></svg>
              {:else if link.platform === 'LinkedIn'}
                <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M20.5 2H3.5A1.5 1.5 0 0 0 2 3.5v17A1.5 1.5 0 0 0 3.5 22h17a1.5 1.5 0 0 0 1.5-1.5v-17A1.5 1.5 0 0 0 20.5 2ZM8 19H5V9.5h3V19ZM6.5 8.2A1.75 1.75 0 1 1 6.5 4.7a1.75 1.75 0 0 1 0 3.5ZM19 19h-3v-4.6c0-1.1 0-2.5-1.5-2.5s-1.8 1.2-1.8 2.4V19h-3V9.5h2.9v1.3c.4-.8 1.4-1.6 2.8-1.6 3 0 3.6 2 3.6 4.6V19Z"/></svg>
              {:else if link.platform === 'Discord'}
                <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M19.5 5.3A17.5 17.5 0 0 0 15.3 4l-.5 1a15.4 15.4 0 0 0-5.6 0l-.5-1a17.7 17.7 0 0 0-4.2 1.3C1.8 9.3 1.1 13.2 1.5 17a17 17 0 0 0 5.2 2.7l1.3-1.8c-.7-.3-1.4-.7-2-1.2l.5-.4c3.8 1.8 8 1.8 11.8 0l.5.4c-.6.5-1.3.9-2 1.2l1.3 1.8a17 17 0 0 0 5.2-2.7c.5-4.4-.8-8.2-3.8-11.7ZM8.8 14.8c-1 0-1.9-1-1.9-2.3 0-1.2.8-2.2 1.9-2.2s1.9 1 1.9 2.2c0 1.3-.8 2.3-1.9 2.3Zm6.4 0c-1 0-1.9-1-1.9-2.3 0-1.2.8-2.2 1.9-2.2s1.9 1 1.9 2.2c0 1.3-.8 2.3-1.9 2.3Z"/></svg>
              {:else}
                <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M4.3 3v3.1a14.6 14.6 0 0 1 14.6 14.6H22C22 11 14 3 4.3 3Zm0 6.1v3.1a8.5 8.5 0 0 1 8.5 8.5h3.1c0-6.4-5.2-11.6-11.6-11.6ZM6.4 16.4a2.3 2.3 0 1 0 0 4.6 2.3 2.3 0 0 0 0-4.6Z"/></svg>
              {/if}
              <span>{link.platform}</span>
            </a>
          </li>
        {/each}
      </ul>

      <div class="footer-right">
        <div class="footer-bio">
          <p>
            I am a Korean-American Software Engineer based in New York City building data apps,
            platforms, and tooling.
          </p>
        </div>
        <p class="subscribe-lede">New posts by email. Nothing else, and you can leave in one click.</p>
        <form
          class="subscribe-form"
          action="https://buttondown.com/api/emails/embed-subscribe/andrewwkimm"
          method="post"
          target="_blank"
        >
          <input
            type="email"
            name="email"
            placeholder="you@example.com"
            aria-label="Email address"
            required
          />
          <input type="hidden" name="embed" value="1" />
          <button type="submit">Subscribe</button>
        </form>
      </div>
    </div>

    <p class="copyright">© Andrew Kim {currentYear}</p>
  </div>
</footer>
