<script lang="ts">
  import PortfolioSection from './PortfolioSection.svelte';
  import PortfolioItem from './PortfolioItem.svelte';
</script>

<PortfolioSection title="Consulting">
  <PortfolioItem
    title="American Beauty Institute"
    description="I am a Data Engineering Consultant for American Beauty Institute, a cosmetology school that offers certification education for various beauty-related fields, building their data platform from scratch to support their rapidly growing business as they expand in multiple locations."
    links={[
      { text: 'GitHub', url: 'https://github.com/AmericanBeautyInstitute/data-platform' },
      { text: 'Documentation', url: 'https://americanbeautyinstitute.readthedocs.io/' }
    ]}
    imageSrc="/assets/images/american-beauty-institute.png"
  />

  <PortfolioItem
    title="At The Table"
    description="At The Table connects foster youth with educational resources. The executive director maintained multiple versions of a scorecard spreadsheet for partner organizations, a time-consuming process that took away from directly serving students. I developed a centralized web application that replaced the fragmented spreadsheet system with an intuitive interface accessible to non-technical audiences."
    additionalInfo="This web app serves not only the staff and students in At The Table, but also <a href='https://fairfuturesny.org' target='_blank'>Fair Futures</a> and students in <a href='https://www.cuny.edu/about/administration/offices/student-affairs/programs-services/foster-youth-college-success-initiative-fycsi/' target='_blank'>CUNY’s Foster Youth College Success Initiative</a>, among many other non-profits and foster care advocacy organizations."
    links={[
      { text: 'GitHub', url: 'https://github.com/andrewwkimm/doe-high-school-scorecard/tree/nodejs-express' },
      { text: 'Website', url: 'https://doe-high-school-scorecard.onrender.com/' }
    ]}
    imageSrc="/assets/images/at-the-table.webp"
  />
</PortfolioSection>

<PortfolioSection title="Projects">
  <PortfolioItem
    title="koffee"
    description="koffee is a lightweight CLI tool that translates a given video file to the target language, outputting a translated file with the subtitled embedded into it."
    additionalInfo="It was developed for myself and friends at a Discord community where there are many fans of K-pop and Anime, serving dozens of users weekly."
    links={[
      { text: 'GitHub', url: 'https://github.com/andrewwkimm/koffee' }
    ]}
    imageSrc="/assets/images/koffee.png"
  />

  <PortfolioItem
    title="RAWG Video Game Data Pipeline"
    description="I built this data pipeline as I was getting into the Data Engineering space to playtest various tools I found interesting, but to also pique my curiosity on video game trends. It sources data from RAWG's public API and is ultimately fed into a Streamlit web app to visualize the trends."
    links={[
      { text: 'GitHub', url: 'https://github.com/andrewwkimm/RAWG-Data-Pipeline' }
    ]}
    imageSrc="/assets/images/rawg.png"
  />
</PortfolioSection>

<PortfolioSection title="Open Source Contributions">
  <PortfolioItem
    title="LlamaIndex"
    description="I added support for pathlib objects to one of the most commonly used modules in LlamaIndex, the SimpleDirectoryReader, after I noticed it only accepted string paths."
    links={[
      { text: 'Pull Request', url: 'https://github.com/run-llama/llama_index/pull/16108' },
      { text: 'Issue', url: 'https://github.com/run-llama/llama_index/issues/16030' }
    ]}
    imageSrc="/assets/images/llama-index.jpeg"
  />
</PortfolioSection>