package com.storekit.enumeration;

public enum ArticleCategory {
    TSHIRT("T-shirt"),
    SWEATSHIRT("Sweatshirt"),
    JEANS("Jeans"),
    JACKET("Jacket"),
    BAG("Bag"),
    SHOES("Shoes"),
    ACCESSORY("Accessory"),
    OTHER("Other");

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
