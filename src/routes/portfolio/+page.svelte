<script>
  import Entry from "./Entry.svelte";

  const consulting = [
    {
      title: "American Beauty Institute",
      description: `
        I am a Data Engineering Consultant for American Beauty Institute, a cosmetology school that offers certification education for various beauty-related fields, building their data platform from scratch to support their rapidly growing business as they expand in multiple locations.
      `,
      image: "/assets/images/american-beauty-institute.png",
      links: [
        { label: "GitHub", url: "https://github.com/AmericanBeautyInstitute/data-platform" },
        { label: "Documentation", url: "https://americanbeautyinstitute.readthedocs.io/" }
      ]
    },
    {
      title: "At The Table",
      description: `
        At The Table connects foster youth with educational resources. The executive director maintained multiple versions of a scorecard spreadsheet for partner organizations, a time-consuming process that took away from directly serving students. I developed a centralized web application that replaced the fragmented spreadsheet system with an intuitive interface accessible to non-technical audiences.
        <br><br>
        This web app serves not only the staff and students in At The Table, but also <a href="https://fairfuturesny.org" target="_blank">Fair Futures</a> and students in <a href="https://www.cuny.edu/about/administration/offices/student-affairs/programs-services/foster-youth-college-success-initiative-fycsi/" target="_blank">CUNY's Foster Youth College Success Initiative</a>, among many other non-profits and foster care support organizations.
      `,
      image: "/assets/images/at-the-table.webp",
      links: [
        { label: "GitHub", url: "https://github.com/andrewwkimm/doe-high-school-scorecard/tree/nodejs-express" },
        { label: "Website", url: "https://doe-high-school-scorecard.onrender.com/" }
      ]
    }
  ];

  const projects = [
    {
      title: "koffee",
      description: `
        koffee is a lightweight CLI tool that translates a given video file to the target language, outputting a translated file with the subtitle embedded into it.
        <br><br>
        It was developed for myself and friends at a Discord community where there are many fans of K-pop and Anime, serving dozens of users weekly.
      `,
      image: "/assets/images/koffee.png",
      links: [
        { label: "GitHub", url: "https://github.com/andrewwkimm/koffee" }
      ]
    },
    {
      title: "RAWG Video Game Data Pipeline",
      description: `
        I built this data pipeline as I was getting into the Data Engineering space to playtest various tools I found interesting, but to also pique my curiosity on video game trends.
        <br><br>
        It sources data from RAWG's public API and is ultimately fed into a Streamlit web app to visualize the trends.
      `,
      image: "/assets/images/rawg.png",
      links: [
        { label: "GitHub", url: "https://github.com/andrewwkimm/RAWG-Data-Pipeline" }
      ]
    }
  ];

  const contributions = [
    {
      title: "LlamaIndex",
      description: `
        I added support for <code>pathlib</code> objects to one of the most commonly used modules in LlamaIndex, the <code>SimpleDirectoryReader</code>, after I noticed it only accepted string paths.
      `,
      image: "/assets/images/llama-index.jpeg",
      links: [
        { label: "Pull Request", url: "https://github.com/run-llama/llama_index/pull/16108" },
        { label: "Issue", url: "https://github.com/run-llama/llama_index/issues/16030" }
      ]
    }
  ];
</script>

<section class="wrapper py-10">
  <div class="space-y-16">

    <div>
      <h2 class="text-2xl font-bold mb-8">Consulting</h2>
      <div class="space-y-12">
        {#each consulting as entry}
          <Entry {...entry} />
        {/each}
      </div>
    </div>

    <div>
      <h2 class="text-2xl font-bold mb-8">Projects</h2>
      <div class="space-y-12">
        {#each projects as entry}
          <Entry {...entry} />
        {/each}
      </div>
    </div>

    <div>
      <h2 class="text-2xl font-bold mb-8">Open Source Contributions</h2>
      <div class="space-y-12">
        {#each contributions as entry}
          <Entry {...entry} />
        {/each}
      </div>
    </div>

  </div>
</section>
