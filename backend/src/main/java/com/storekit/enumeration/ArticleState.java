package com.storekit.enumeration;

public enum ArticleState {
    IN_STOCK("In stock"),
    SOLD("Sold"),
    WAITING_FOR_EDIT("Waiting for edit"),
    RETURN_ASKED("Return asked"),
    LOST("Lost");

    private final String value;
    ArticleState(final String value) {
        this.value = value;
    }

    public String getValue() {
        return value;
    }

    public static ArticleState fromValue(String value) {
        for (ArticleState state : ArticleState.values()) {
            if (state.getValue().equalsIgnoreCase(value)) {
                return state;
            }
        }
        throw new IllegalArgumentException("Unknown state value: " + value);
    }

    @Override
    public String toString() {
        return this.getValue();
    }
}