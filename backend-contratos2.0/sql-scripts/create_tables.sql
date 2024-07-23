-- Table for storing authorities



CREATE TABLE `authority_entity`
(
    `id`   int NOT NULL AUTO_INCREMENT,
    `name` varchar(255) DEFAULT NULL,
    PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5
    DEFAULT CHARSET=utf8mb4
    COLLATE=utf8mb4_0900_ai_ciLLATE=utf8mb4_0900_ai_citf8mb4
    COLLATE=utf8mb4_0900_ai_ciNT=5
    DEFAULT CHARSET=utf8mb4
    COLLATE=utf8mb4_0900_ai_ci

-- Table for storing contact us messages
CREATE TABLE `contact_us_entity`
(
    `id`      int NOT NULL AUTO_INCREMENT,
    `email`   varchar(255) DEFAULT NULL,
    `message` varchar(255) DEFAULT NULL,
    `name`    varchar(255) DEFAULT NULL,
    PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci

-- Table for storing contracts
CREATE TABLE `contract_entity`
(
    `id`            int NOT NULL AUTO_INCREMENT,
    `name`          varchar(255) DEFAULT NULL,
    `start_date`    date         DEFAULT NULL,
    `authority_id`  int          DEFAULT NULL,
    `contractor_id` int          DEFAULT NULL,
    PRIMARY KEY (`id`),
    KEY             `FK6mr13ty9l2a19lcoxfgvmtpf2` (`authority_id`),
    KEY             `FKsp5rcoqem1jwj98fioc142vis` (`contractor_id`),
    CONSTRAINT `FK6mr13ty9l2a19lcoxfgvmtpf2` FOREIGN KEY (`authority_id`) REFERENCES `authority_entity` (`id`),
    CONSTRAINT `FKsp5rcoqem1jwj98fioc142vis` FOREIGN KEY (`contractor_id`) REFERENCES `contractor_entity` (`id`)

) ENGINE=InnoDB AUTO_INCREMENT=23 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci

-- Table for storing contracting entities
CREATE TABLE `contractor_entity`
(
    `id`   int NOT NULL AUTO_INCREMENT,
    `name` varchar(255) DEFAULT NULL,
    PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=5 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci

-- Table for storing users
CREATE TABLE `user_entity`
(
    `id`       int NOT NULL AUTO_INCREMENT,
    `email`    varchar(255) DEFAULT NULL,
    `password` varchar(255) DEFAULT NULL,
    PRIMARY KEY (`id`)
) ENGINE=InnoDB AUTO_INCREMENT=87 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_0900_ai_ci
