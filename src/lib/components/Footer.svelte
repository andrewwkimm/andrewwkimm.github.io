<script lang="ts">
  type SocialLink = {
    platform: string;
    url: string;
    username: string;
    icon: string;
  };
  const socialLinks: SocialLink[] = [
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
    {
      platform: 'Discord',
      url: 'https://discord.com/users/1156466317705084948',
      username: 'andrewwkimm',
      icon: 'fa-brands fa-discord'
    }
  ];

  const currentYear = new Date().getFullYear();
</script>

<footer
  class="
    border-t
    border-[var(--color-border)]
    bg-[var(--color-bg)]
    pt-[25px]
    pb-5
    mt-auto
  "
>
  <div class="wrapper">
    <div class="
      grid
      grid-cols-1
      md:grid-cols-[1fr_1.58fr]
      gap-10
      md:gap-10
      mb-5
    ">
      <!-- Social Links -->
      <div>
        <ul class="list-none p-0">
          {#each socialLinks as link (link.url)}
            <li>
              <a
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                class="
                  text-[var(--color-gray)]
                  flex items-center gap-2
                  no-underline
                  hover:text-[var(--color-text)] hover:no-underline
                "
              >
                <i class="{link.icon} w-[18px] text-center"></i>
                <span>{link.platform}</span>
              </a>
            </li>
          {/each}
        </ul>
      </div>

      <!-- Bio -->
      <div>
        <p class="
          text-[var(--color-gray)]
          text-[17px]
          leading-normal
        ">
          I am a Korean-American Software Engineer based in New York City building data apps, platforms, and tooling.
        </p>
      </div>
    </div>

    <!-- Copyright -->
    <div class="text-center">
      <p class="
        text-[var(--color-gray)]
        text-[15px]
        pb-3
      ">
        © Andrew Kim {currentYear}
      </p>
    </div>
  </div>
</footer>