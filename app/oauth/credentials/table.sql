-- Then, create the table using this function
CREATE TABLE credentials (
    -- Headers
    id VARCHAR(36) PRIMARY KEY,
    provider VARCHAR(255) NOT NULL,
    -- TokenData
    access_token TEXT NOT NULL,
    expires_in INT NOT NULL,
    refresh_token TEXT NOT NULL,
    token_type VARCHAR(255) NOT NULL,
    scope TEXT NOT NULL,
    -- Metadata
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- User reference.
ALTER TABLE credentials ADD COLUMN "user" VARCHAR(255);