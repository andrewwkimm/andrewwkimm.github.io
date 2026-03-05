<script lang="ts">
  import Entry from "./Entry.svelte";
  import Section from "./Section.svelte";
</script>

<Section name="PROFESSIONAL EXPERIENCE">
  <Entry
    title="Data Engineer"
    organization="Ovative Group"
    url="https://ovative.com/"
    dates="February 2026 – Present"
    location="New York, NY"
  >
    <li>
      Building and maintaining various internal tooling for other engineers
      and data pipelines for clients.
    </li>
  </Entry>

  <Entry
    title="Data Engineering Consultant"
    organization="American Beauty Institute"
    url="https://beautyinstitute.us/"
    dates="2025 - Present"
    location="New York, NY"
  >
    <li>
      I am a part-time consultant at American Beauty Institute, a cosmetology school
      where I am building an end-to-end data platform on Google Cloud Platform,
      integrating their digital marketing, payments, and operations data into BigQuery.
    </li>
    <li>
      <strong>Links:</strong>
      <a class="link" href="https://americanbeautyinstitute.readthedocs.io/" target="_blank" rel="noopener noreferrer">
        Documentation
      </a>,
      <a class="link" href="https://github.com/AmericanBeautyInstitute/data-platform" target="_blank" rel="noopener noreferrer">
        Source Code
      </a>
    </li>
  </Entry>

  <Entry
    title="Data Engineer"
    organization="Elevance Health"
    url="https://www.elevancehealth.com/"
    dates="February 2023 – July 2024"
    location="New York, NY"
  >
    <li>
      Designed and developed a centralized ingestion framework for a data migration
      project which can be run via CLI or scheduled Airflow runs, replacing manual
      processes of ad hoc scripts and queries
    </li>
    <li>
      Developed dynamic compute allocation feature for the framework that automatically
      adjusts AWS and Snowflake settings based on the input data volume to save cloud
      compute costs
    </li>
    <li>
      Established a previously near-nonexistent data quality, monitoring, and testing
      suite throughout the pipeline, eliminating duplicate data incidents and reducing
      ime spent on data quality issues each sprint
    </li>
    <li>
      Built a Streamlit dashboard deployed on Snowflake that gave visibility into data
      quality and observability reports to stakeholders and engineers
    </li>
    <li>
      Owned the documentation for the ingestion framework, data quality and validations,
      and unit and integration testing; guided other engineers and analysts on best
      practices and onboarded new members
    </li>
  </Entry>
</Section>

<Section name="SKILLS & INTERESTS">
  <p class="mb-0"><strong>Programming:</strong> Python, SQL</p>
  <p class="mb-0"><strong>Databases:</strong> Snowflake, BigQuery, PostgreSQL</p>
  <p class="mb-0"><strong>Technologies:</strong> Airflow, AWS, GCP, dbt, Docker, GitHub Actions, PySpark, Prefect, FastAPI, Terraform</p>
  <p class="mb-0"><strong>Interests:</strong> Murder mysteries, Military history, Retro video games, Singing</p>
</Section>

<Section name="EDUCATION">
  <Entry
    title="B.A. Mathematics, Minor in Computer Science"
    organization="Baruch College"
    url="https://www.baruch.cuny.edu/"
    dates="Graduated January 2021"
    location="Gramercy Park, NY"
  />
</Section>

<Section name="MISCELLANEOUS">
  <Entry
    title="Alumni"
    organization="At The Table"
    url="https://atthetable.org/"
    dates="September 2020 – Present"
    location="Brooklyn, NY"
  >
    <li>
      Formerly a student at At The Table, a non-profit organization that provides
      academic and socio-emotional support for foster youth
    </li>
  </Entry>
</Section>
