package com.storekit.enumeration;

public enum ArticleCategory {
    TSHIRT("T-shirt"),
    SWEATSHIRT("Sweatshirt"),
    JEANS("Jeans"),
    JACKET("Veste"),
    BAG("Sac"),
    SHOES("Chaussures"),
    ACCESSORY("Accessoire"),
    OTHER("Autre");

    private final String value;
    ArticleCategory(final String value) {
        this.value = value;
    }

    public String getValue() {
        return value;
    }

    public static ArticleCategory fromValue(String value) {
        for (ArticleCategory category : ArticleCategory.values()) {
            if (category.getValue().equalsIgnoreCase(value)) {
                return category;
            }
        }
        throw new IllegalArgumentException("Unknown category value: " + value);
    }

    @Override
    public String toString() {
        return this.getValue();
    }
}
