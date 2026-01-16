package com.storekit.enumeration;

public enum ArticleSize {
    XS,
    S,
    M,
    L,
    XL,
    XXL,
    ONE_SIZE("One Size");

    private final String value;
    ArticleSize(final String value) {
        this.value = value;
    }

    ArticleSize() {
        this.value = this.name();
    }

    public String getValue() {
        return value;
    }

    public static ArticleSize fromValue(String value) {
        for (ArticleSize size : ArticleSize.values()) {
            if (size.getValue().equalsIgnoreCase(value)) {
                return size;
            }
        }
        throw new IllegalArgumentException("Unknown size value: " + value);
    }

    @Override
    public String toString() {
        return this.getValue();
    }
}