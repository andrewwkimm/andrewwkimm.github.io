post:
	@echo "Enter the title of the post:"
	@read -r title; \
	today=$$(date +"%Y-%m-%d"); \
    filename="_posts/$$today-$$title.md"; \
	echo "---" > "$$filename"; \
    echo "title: \"$$title\"" >> "$$filename"; \
    echo "date: $$today" >> "$$filename"; \
    echo "categories:" >> "$$filename"; \
    echo "  -" >> "$$filename"; \
    echo "tags:" >> "$$filename"; \
    echo "  -" >> "$$filename"; \
    echo "---" >> "$$filename"; \
    echo "Created '$$filename'."

.PHONY: \
	post
