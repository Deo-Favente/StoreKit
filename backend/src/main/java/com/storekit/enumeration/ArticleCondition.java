package com.storekit.enumeration;

public enum ArticleCondition {
    NEW_WITH_TAGS("Neuf avec étiquettes"),
    NEW_NO_TAGS("Neuf sans étiquettes"),
    VERY_GOOD("Très bon état"),
    GOOD("Bon état"),
    SATISFYING("Satisfaisant");

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
