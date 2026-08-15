<script lang="ts">
  import Section from './Section.svelte';
  import Entry from './Entry.svelte';
</script>

<Section title="Consulting">
  <Entry
    title="American Beauty Institute"
    links={[
      { text: 'GitHub', url: 'https://github.com/AmericanBeautyInstitute/data-platform' },
      { text: 'Documentation', url: 'https://americanbeautyinstitute.readthedocs.io/' }
    ]}
    imageSrc="/assets/images/american-beauty-institute.png"
  >
    <p>I am a Data Engineering Consultant for American Beauty Institute, a cosmetology school
    that offers certification education for various beauty-related fields, building their data
    platform from scratch to support their rapidly growing business as they expand in multiple
    locations.</p>
  </Entry>

  <Entry
    title="At The Table"
    links={[
      { text: 'GitHub', url: 'https://github.com/andrewwkimm/doe-high-school-scorecard/tree/nodejs-express' },
      { text: 'Demo', url: 'https://doe-high-school-scorecard.onrender.com/' }
    ]}
    imageSrc="/assets/images/at-the-table.webp"
  >
    <p>At The Table connects foster youth with educational resources. The executive director
    maintained multiple versions of a scorecard spreadsheet for partner organizations, a
    time-consuming process that took away from directly serving students. I developed a
    centralized web application that replaced the fragmented spreadsheet system with an
    intuitive interface accessible to non-technical audiences.</p>

    <p>This web app serves not only the staff and students in At The Table, but also
    <a href="https://fairfuturesny.org" target="_blank">Fair Futures</a> and students in
    <a href="https://www.cuny.edu/about/administration/offices/student-affairs/programs-services/foster-youth-college-success-initiative-fycsi/" target="_blank">CUNY's Foster Youth College Success Initiative</a>,
    among many other partner non-profits and foster care advocacy organizations.</p>
  </Entry>
</Section>

<Section title="Projects">
  <Entry
    title="koffee"
    links={[
      { text: 'GitHub', url: 'https://github.com/andrewwkimm/koffee' },
      { text: 'Documentation', url: 'https://andrewwkimm.github.io/koffee' }
    ]}
    imageSrc="/assets/images/koffee.png"
  >
    <p>koffee is a lightweight CLI tool that translates a given video file to the target
    language, outputting a translated subtitle file.</p>

    <p>It was developed for myself and friends at a Discord community where there are many
    fans of K-pop and Anime, serving dozens of users weekly.</p>
  </Entry>

  <Entry
    title="Qubeley"
    links={[{ text: 'GitHub', url: 'https://github.com/andrewwkimm/qubeley' }]}
    imageSrc="/assets/images/qubeley.png"
  >
    <p>Qubeley is a real-time systems metrics pipeline that continuously collects
    CPU, memory, temperature, and log data from a host machine and stores it in a
    queryable time-series database, written purely in Go.</p>

    <p>Unlike built-in system monitors that only show the current moment, Qubeley
    retains historical data so you can query, visualise, and analyse trends over
    time. It is designed to be self-hosted, lightweight, and easy to run locally
    with no external dependencies beyond Docker and Go.</p>
  </Entry>

  <Entry
    title="RAWG Video Game Data Pipeline"
    links={[{ text: 'GitHub', url: 'https://github.com/andrewwkimm/RAWG-Data-Pipeline' }]}
    imageSrc="/assets/images/rawg.png"
  >
    <p>I built this data pipeline as I was getting into the Data Engineering space to playtest
    various tools I found interesting, but to also pique my curiosity on video game trends.
    It sources data from RAWG's public API and is ultimately fed into a Streamlit web app
    to visualize the trends.</p>
  </Entry>
</Section>

<Section title="Open Source Contributions">
  <Entry
    title="Dagster"
    links={[
      { text: 'Pull Request', url: 'https://github.com/dagster-io/dagster/pull/33544' },
      { text: 'Issue', url: 'https://github.com/dagster-io/dagster/issues/6238' }
    ]}
    imageSrc="/assets/images/dagster.svg"
  >
    <p>I resolved a long-standing issue where dynamically mapped Dagster steps failed to
    load ML models from S3, originally reported by a user who noticed Dagster's dynamic
    step names contain square brackets which S3 accepts, but Spark interprets as glob
    wildcards, making files unreadable despite being present in storage.</p>

    <p>My fix finally automated path sanitization for dynamic mapping, unblocking anyone
    persisting ML models or serialized objects to S3 and removing the need for users
    to build their own workarounds.</p>

  </Entry>

  <Entry
    title="LlamaIndex"
    links={[
      { text: 'Pull Request', url: 'https://github.com/run-llama/llama_index/pull/16108' },
      { text: 'Issue', url: 'https://github.com/run-llama/llama_index/issues/16030' }
    ]}
    imageSrc="/assets/images/llama-index.jpeg"
  >
    <p>I added support for pathlib objects to one of the most commonly used data loading
    modules in LlamaIndex, the <code>SimpleDirectoryReader</code>, after I noticed it only
    accepted string paths.</p>
  </Entry>
</Section>