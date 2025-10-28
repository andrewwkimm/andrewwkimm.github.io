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
    }
  ];

  const currentYear = new Date().getFullYear();
  const bio = "I am a Korean-American Data Engineer based in New York City building data apps, platforms, and tooling.";
</script>

<footer class="mt-auto border-t border-border pt-[30px] pb-5 bg-bg">
  <div class="wrapper">
    <!-- Social links and bio -->
    <div class="grid grid-cols-1 md:grid-cols-[1fr_1.58fr] gap-10 mb-5">
      <!-- Social links -->
      <div>
        <ul class="list-none p-0">
          {#each socialLinks as { platform, url, username, icon }}
            <li>
              <a
                href={url}
                target="_blank"
                rel="noopener noreferrer"
                class="text-gray hover:text-text hover:no-underline flex items-center gap-2 transition-colors"
                aria-label={platform}
              >
                <i class="{icon} w-[18px] text-center" aria-hidden="true"></i>
                <span>{username}</span>
              </a>
            </li>
          {/each}
        </ul>
      </div>

      <!-- Bio -->
      <div>
        <p class="text-gray text-[17px] leading-normal">
          {bio}
        </p>
      </div>
    </div>

    <!-- Copyright -->
    <div class="text-center pb-5">
      <p class="text-gray text-[15px]">
        © Andrew Kim {currentYear}
      </p>
    </div>
  </div>
</footer>