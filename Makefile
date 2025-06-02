help:
	cat Makefile

################################################################################

build:
	bundle install

serve:
	bundle exec jekyll serve --watch

################################################################################

.PHONY: \
	build \
	serve \