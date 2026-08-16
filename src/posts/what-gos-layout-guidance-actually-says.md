---
title: What Go's layout guidance actually says
date: '2026-05-02'
summary: Most layout advice online is repository archaeology. The official guidance is shorter and more permissive than people assume.
tags:
  - engineering
---

Search for Go project layout and you will find a template repository with fourteen top-level
directories, none of which the toolchain requires. The official guidance is shorter, and it
permits far more than the folklore suggests.

## A command can live at the root

The layout guide shows a basic command as `auth.go`, `auth_test.go`, `client.go`, and
`main.go`, all declaring `package main` at the module root. It also notes that putting `func
main` in a file named `main.go` is a convention rather than a rule.[^1]

`cmd/` enters when a repository holds more than one binary, or when the root needs to stay
importable. Neither is true for most single-purpose programs.

## internal is a boundary, not a folder for application code

The toolchain enforces `internal`: nothing outside the parent of that directory can import
what lives inside it. That makes it the right tool when a module publishes a public API and
needs to keep the rest private.

> If you cannot come up with a package name that is a meaningful prefix for the package's
> contents, the package abstraction boundary may be wrong.

Using `internal` as a synonym for "my code" gets you the import path length without the
benefit.[^2]

## pkg has no toolchain meaning at all

Unlike `internal`, `pkg` does nothing. It is a naming convention some repositories adopted
and others did not.

## What survives the scrutiny

- Read the official layout guide before reading any repository.
- Treat repository counts as evidence of popularity, not correctness.
- Add a package when it hides complexity, and not when it merely files code.

[^1]: The same document shows `hash.go` paired with `hash_test.go`, which is where the file-per-subject test convention comes from.
[^2]: A package whose exported surface restates its implementation is a forwarding layer. Deleting it usually makes the program easier to read.
