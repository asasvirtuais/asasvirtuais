
create table paragraphs (
    id VARCHAR(36) PRIMARY KEY,
    index INT NOT NULL,
    content TEXT NOT NULL,
    message VARCHAR(36) NOT NULL,
    saved BOOLEAN NOT NULL
);
