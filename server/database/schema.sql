DROP DATABASE IF EXISTS huntArtDb;
CREATE DATABASE huntArtDb;
USE huntArtDb;

CREATE TABLE user
(
        userId INT
        AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR
        (50) UNIQUE NOT NULL,
    email VARCHAR
        (100) UNIQUE NOT NULL,
    password VARCHAR
        (255) NOT NULL,
    dateCreated TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    lastLogin TIMESTAMP NULL,
    role ENUM
        ('admin', 'moderator', 'standard_user') DEFAULT 'standard_user'
);

        CREATE INDEX idx_user_username ON user(username);
        CREATE INDEX idx_user_email ON user(email);
        CREATE INDEX idx_user_role ON user(role);

        CREATE TABLE author
        (
                authorId INT
                AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR
                (100) UNIQUE NOT NULL
);

                CREATE TABLE streetart
                (
                        streetArtId INT
                        AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR
                        (100) NOT NULL,
    description TEXT,
    authorId INT NOT NULL,
    location VARCHAR
                        (255) NOT NULL,
    dateAdded TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    postedBy INT NOT NULL,
    photoUrlSmall VARCHAR
                        (255),
    photoUrlMedium VARCHAR
                        (255),
    photoUrlLarge VARCHAR
                        (255),
    status ENUM
                        ('active', 'removed') DEFAULT 'active',
    FOREIGN KEY
                        (postedBy) REFERENCES user
                        (userId) ON
                        DELETE CASCADE,
    FOREIGN KEY (authorId)
                        REFERENCES author
                        (authorId) ON
                        DELETE
                        SET NULL
                        );

                        CREATE INDEX idx_streetart_authorId ON streetart(authorId);
                        CREATE INDEX idx_streetart_postedBy ON streetart(postedBy);
                        CREATE INDEX idx_streetart_dateAdded ON streetart(dateAdded);
                        CREATE INDEX idx_streetart_location ON streetart(location);

                        CREATE TABLE tag
                        (
                                tagId INT
                                AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR
                                (50) UNIQUE NOT NULL
);

                                CREATE TABLE comment
                                (
                                        commentId INT
                                        AUTO_INCREMENT PRIMARY KEY,
    userId INT NOT NULL,
    streetArtId INT NOT NULL,
    content TEXT NOT NULL,
    datePosted TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    isDeleted BOOLEAN DEFAULT FALSE,
    FOREIGN KEY
                                        (userId) REFERENCES user
                                        (userId) ON
                                        DELETE CASCADE,
    FOREIGN KEY (streetArtId)
                                        REFERENCES streetart
                                        (streetArtId) ON
                                        DELETE CASCADE
);

                                        CREATE INDEX idx_comment_userId ON comment(userId);
                                        CREATE INDEX idx_comment_streetArtId ON comment(streetArtId);
                                        CREATE INDEX idx_comment_datePosted ON comment(datePosted);

                                        CREATE TABLE favorite
                                        (
                                                userId INT NOT NULL,
                                                streetArtId INT NOT NULL,
                                                PRIMARY KEY (userId, streetArtId),
                                                FOREIGN KEY (userId) REFERENCES user(userId) ON DELETE CASCADE,
                                                FOREIGN KEY (streetArtId) REFERENCES streetart(streetArtId) ON DELETE CASCADE
                                        );

                                        CREATE INDEX idx_favorite_userId ON favorite(userId);
                                        CREATE INDEX idx_favorite_streetArtId ON favorite(streetArtId);

                                        CREATE TABLE emotion
                                        (
                                                emotionId INT
                                                AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR
                                                (50) UNIQUE NOT NULL
);

                                                CREATE TABLE user_emotion
                                                (
                                                        userId INT NOT NULL,
                                                        streetArtId INT NOT NULL,
                                                        emotionId INT NOT NULL,
                                                        PRIMARY KEY (userId, streetArtId, emotionId),
                                                        FOREIGN KEY (userId) REFERENCES user(userId) ON DELETE CASCADE,
                                                        FOREIGN KEY (streetArtId) REFERENCES streetart(streetArtId) ON DELETE CASCADE,
                                                        FOREIGN KEY (emotionId) REFERENCES emotion(emotionId) ON DELETE CASCADE
                                                );

                                                CREATE INDEX idx_user_emotion_userId ON user_emotion(userId);
                                                CREATE INDEX idx_user_emotion_streetArtId ON user_emotion(streetArtId);
                                                CREATE INDEX idx_user_emotion_emotionId ON user_emotion(emotionId);

                                                CREATE TABLE sanction
                                                (
                                                        sanctionId INT
                                                        AUTO_INCREMENT PRIMARY KEY,
    userId INT NOT NULL,
    type ENUM
                                                        ('login_failure', 'misbehavior') NOT NULL,
    duration INT NOT NULL,
    dateStart TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    dateEnd TIMESTAMP NOT NULL,
    FOREIGN KEY
                                                        (userId) REFERENCES user
                                                        (userId) ON
                                                        DELETE CASCADE
);

                                                        CREATE INDEX idx_sanction_userId ON sanction(userId);
                                                        CREATE INDEX idx_sanction_type ON sanction(type);
                                                        CREATE INDEX idx_sanction_dateEnd ON sanction(dateEnd);

                                                        CREATE TABLE report
                                                        (
                                                                reportId INT
                                                                AUTO_INCREMENT PRIMARY KEY,
    userId INT NOT NULL,
    streetArtId INT NOT NULL,
    reason TEXT NOT NULL,
    dateReported TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status ENUM
                                                                ('pending', 'resolved') DEFAULT 'pending',
    FOREIGN KEY
                                                                (userId) REFERENCES user
                                                                (userId) ON
                                                                DELETE CASCADE,
    FOREIGN KEY (streetArtId)
                                                                REFERENCES streetart
                                                                (streetArtId) ON
                                                                DELETE CASCADE
);

                                                                CREATE INDEX idx_report_userId ON report(userId);
                                                                CREATE INDEX idx_report_streetArtId ON report(streetArtId);
                                                                CREATE INDEX idx_report_dateReported ON report(dateReported);

                                                                CREATE TABLE streetart_tag
                                                                (
                                                                        streetArtId INT NOT NULL,
                                                                        tagId INT NOT NULL,
                                                                        PRIMARY KEY (streetArtId, tagId),
                                                                        FOREIGN KEY (streetArtId) REFERENCES streetart(streetArtId) ON DELETE CASCADE,
                                                                        FOREIGN KEY (tagId) REFERENCES tag(tagId) ON DELETE CASCADE
                                                                );

                                                                CREATE TABLE login_attempt
                                                                (
                                                                        attemptId INT
                                                                        AUTO_INCREMENT PRIMARY KEY,
    userId INT NOT NULL,
    attemptTime TIMESTAMP NOT NULL,
    success BOOLEAN NOT NULL,
    FOREIGN KEY
                                                                        (userId) REFERENCES user
                                                                        (userId) ON
                                                                        DELETE CASCADE
);

                                                                        CREATE INDEX idx_login_attempt_userId ON login_attempt(userId);
                                                                        CREATE INDEX idx_login_attempt_attemptTime ON login_attempt(attemptTime);
