package com.storekit.enumeration;

public enum ArticleCondition {
    NEW_WITH_TAGS("New with tags"),
    NEW_NO_TAGS("New no tags"),
    VERY_GOOD("Very good"),
    GOOD("Good"),
    SATISFYING("Satisfying");

    private final String value;
    ArticleCondition(final String value) {
        this.value = value;
    }

    public String getValue() {
        return value;
    }

    public static ArticleCondition fromValue(String value) {
        for (ArticleCondition condition : ArticleCondition.values()) {
            if (condition.getValue().equalsIgnoreCase(value)) {
                return condition;
            }
        }
        throw new IllegalArgumentException("Unknown condition value: " + value);
    }

    @Override
    public String toString() {
        return this.getValue();
    }
}
