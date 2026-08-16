---
title: Building a reliable data pipeline
date: '2026-08-12'
summary: Idempotent stages, explicit contracts between them, and what actually breaks at three in the morning.
tags:
  - engineering
  - data
---

Most pipeline failures are not interesting. A file arrives late, a schema changes without
warning, or a retry runs a step that was [never safe to run
twice](https://en.wikipedia.org/wiki/Idempotence).[^1] The interesting part is what the
pipeline does next.

## Make every stage idempotent

A stage you can run twice with the same result is a stage you can retry without thinking.
That single property removes most of the reasoning you would otherwise do at three in the
morning.

> If a retry requires a human to decide whether the retry is safe, the stage is not finished.

![The checksum gate sits between staging and commit, so a retry that produces identical bytes never writes twice.](/assets/images/pipeline-architecture.png)

## Write the contract down

Each stage should declare what it reads and what it guarantees on the way out. Once those are
explicit, a change that breaks a downstream consumer fails at the boundary rather than four
steps later in a report nobody checks.[^2]

- Validate on write, not on read.
- Fail the batch, not the row, unless partial output is genuinely useful.
- Record the input version alongside the output.[^3]

## An example

```python
# Load one partition, exactly once.
def load_partition(self, day: date) -> LoadResult:
    staged = self.stage(day)
    if staged.checksum == self.last_checksum(day):
        return LoadResult(skipped=True)
    return self.commit(staged)
```

![](/assets/images/retry-log.png)

None of this is novel. It is just the set of decisions that stop being negotiable once you
have been paged for the same bug twice.

[^1]: The third one is the only real bug. The first two are operations problems wearing an engineering costume.
[^2]: This is the part everyone skips, because writing the contract down means admitting you did not know what it was.
[^3]: A checksum is enough. You are not trying to reconstruct history, only to answer whether this exact input has already been processed.
