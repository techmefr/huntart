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
    dateCreated DATETIME DEFAULT CURRENT_TIMESTAMP,
    jwt VARCHAR
        (255),
    lastLogin DATETIME,
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
    dateAdded DATETIME DEFAULT CURRENT_TIMESTAMP,
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
                        (userId),
    FOREIGN KEY
                        (authorId) REFERENCES author
                        (authorId)
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
    datePosted DATETIME DEFAULT CURRENT_TIMESTAMP,
    isDeleted BOOLEAN DEFAULT FALSE,
    FOREIGN KEY
                                        (userId) REFERENCES user
                                        (userId),
    FOREIGN KEY
                                        (streetArtId) REFERENCES streetart
                                        (streetArtId)
);

                                        CREATE INDEX idx_comment_userId ON comment(userId);
                                        CREATE INDEX idx_comment_streetArtId ON comment(streetArtId);
                                        CREATE INDEX idx_comment_datePosted ON comment(datePosted);

                                        CREATE TABLE favorite
                                        (
                                                userId INT NOT NULL,
                                                streetArtId INT NOT NULL,
                                                PRIMARY KEY (userId, streetArtId),
                                                FOREIGN KEY (userId) REFERENCES user(userId),
                                                FOREIGN KEY (streetArtId) REFERENCES streetart(streetArtId)
                                        );

                                        CREATE INDEX idx_favorite_userId ON favorite(userId);
                                        CREATE INDEX idx_favorite_streetArtId ON favorite(streetArtId);

                                        CREATE TABLE `like`
                                        (
    userId INT NOT NULL,
    streetArtId INT NOT NULL,
    PRIMARY KEY
                                        (userId, streetArtId),
    FOREIGN KEY
                                        (userId) REFERENCES user
                                        (userId),
    FOREIGN KEY
                                        (streetArtId) REFERENCES streetart
                                        (streetArtId)
);

                                        CREATE INDEX idx_like_userId ON `like`
                                        (userId);
                                        CREATE INDEX idx_like_streetArtId ON `like`
                                        (streetArtId);

                                        CREATE TABLE sanction
                                        (
                                                sanctionId INT
                                                AUTO_INCREMENT PRIMARY KEY,
    userId INT NOT NULL,
    type ENUM
                                                ('login_failure', 'misbehavior') NOT NULL,
    duration INT NOT NULL,
    dateStart DATETIME DEFAULT CURRENT_TIMESTAMP,
    dateEnd DATETIME NOT NULL,
    FOREIGN KEY
                                                (userId) REFERENCES user
                                                (userId)
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
    dateReported DATETIME DEFAULT CURRENT_TIMESTAMP,
    status ENUM
                                                        ('pending', 'resolved') DEFAULT 'pending',
    FOREIGN KEY
                                                        (userId) REFERENCES user
                                                        (userId),
    FOREIGN KEY
                                                        (streetArtId) REFERENCES streetart
                                                        (streetArtId)
);

                                                        CREATE INDEX idx_report_userId ON report(userId);
                                                        CREATE INDEX idx_report_streetArtId ON report(streetArtId);
                                                        CREATE INDEX idx_report_dateReported ON report(dateReported);

                                                        CREATE TABLE streetart_tag
                                                        (
                                                                streetArtId INT NOT NULL,
                                                                tagId INT NOT NULL,
                                                                PRIMARY KEY (streetArtId, tagId),
                                                                FOREIGN KEY (streetArtId) REFERENCES streetart(streetArtId),
                                                                FOREIGN KEY (tagId) REFERENCES tag(tagId)
                                                        );

                                                        CREATE TABLE login_attempt
                                                        (
                                                                attemptId INT
                                                                AUTO_INCREMENT PRIMARY KEY,
    userId INT NOT NULL,
    attemptTime DATETIME NOT NULL,
    FOREIGN KEY
                                                                (userId) REFERENCES user
                                                                (userId)
);

                                                                CREATE INDEX idx_login_attempt_userId ON login_attempt(userId);
                                                                CREATE INDEX idx_login_attempt_attemptTime ON login_attempt(attemptTime);