--- schema: mydb2

SET @OLD_UNIQUE_CHECKS=@@UNIQUE_CHECKS, UNIQUE_CHECKS=0;
SET @OLD_FOREIGN_KEY_CHECKS=@@FOREIGN_KEY_CHECKS, FOREIGN_KEY_CHECKS=0;
SET @OLD_SQL_MODE=@@SQL_MODE, SQL_MODE='ONLY_FULL_GROUP_BY,STRICT_TRANS_TABLES,NO_ZERO_IN_DATE,NO_ZERO_DATE,ERROR_FOR_DIVISION_BY_ZERO,NO_ENGINE_SUBSTITUTION';
-- -----------------------------------------------------
-- -----------------------------------------------------
-- Schema mydb2
-- -----------------------------------------------------
CREATE SCHEMA IF NOT EXISTS `mydb2` DEFAULT CHARACTER SET utf8mb4 COLLATE utf8mb4_0900_ai_ci ;
USE `mydb2` ;

-- -----------------------------------------------------
-- Table `mydb2`.`authority_entity`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb2`.`authority_entity` (
                                                          `id` INT NOT NULL AUTO_INCREMENT,
                                                          `name` VARCHAR(255) NULL DEFAULT NULL,
    `priority` VARCHAR(255) NULL DEFAULT NULL,
    `status` VARCHAR(255) NULL DEFAULT NULL,
    PRIMARY KEY (`id`))
    ENGINE = InnoDB
    AUTO_INCREMENT = 6
    DEFAULT CHARACTER SET = utf8mb4
    COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `mydb2`.`contractor_entity`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb2`.`contractor_entity` (
                                                           `id` INT NOT NULL AUTO_INCREMENT,
                                                           `name` VARCHAR(255) NULL DEFAULT NULL,
    `company` VARCHAR(255) NULL DEFAULT NULL,
    `phone_number` VARCHAR(255) NULL DEFAULT NULL,
    `status` ENUM('ACTIVE', 'INACTIVE') NULL DEFAULT NULL,
    PRIMARY KEY (`id`))
    ENGINE = InnoDB
    AUTO_INCREMENT = 6
    DEFAULT CHARACTER SET = utf8mb4
    COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `mydb2`.`contract_entity`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb2`.`contract_entity` (
                                                         `id` INT NOT NULL AUTO_INCREMENT,
                                                         `name` VARCHAR(255) NULL DEFAULT NULL,
    `start_date` DATE NULL DEFAULT NULL,
    `authority_id` INT NULL DEFAULT NULL,
    `contractor_id` INT NULL DEFAULT NULL,
    `end_date` DATE NULL DEFAULT NULL,
    PRIMARY KEY (`id`),
    INDEX `authority_id` (`authority_id` ASC) VISIBLE,
    INDEX `contractor_id` (`contractor_id` ASC) VISIBLE,
    CONSTRAINT `FK_contract_authority`
    FOREIGN KEY (`authority_id`)
    REFERENCES `mydb2`.`authority_entity` (`id`)
    ON DELETE SET NULL
    ON UPDATE CASCADE,
    CONSTRAINT `FK_contract_contractor`
    FOREIGN KEY (`contractor_id`)
    REFERENCES `mydb2`.`contractor_entity` (`id`)
    ON DELETE SET NULL
    ON UPDATE CASCADE)
    ENGINE = InnoDB
    AUTO_INCREMENT = 6
    DEFAULT CHARACTER SET = utf8mb4
    COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `mydb2`.`roles_entity`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb2`.`roles_entity` (
                                                      `id` INT NOT NULL AUTO_INCREMENT,
                                                      `description` VARCHAR(255) NULL DEFAULT NULL,
    `name` VARCHAR(255) NULL DEFAULT NULL,
    PRIMARY KEY (`id`))
    ENGINE = InnoDB
    AUTO_INCREMENT = 11
    DEFAULT CHARACTER SET = utf8mb4
    COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `mydb2`.`user_entity`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb2`.`user_entity` (
                                                     `id` INT NOT NULL AUTO_INCREMENT,
                                                     `email` VARCHAR(255) NULL DEFAULT NULL,
    `first_name` VARCHAR(255) NULL DEFAULT NULL,
    `last_name` VARCHAR(255) NULL DEFAULT NULL,
    `password` VARCHAR(255) NULL DEFAULT NULL,
    `phone_number` VARCHAR(255) NULL DEFAULT NULL,
    `administrator_id` INT NULL DEFAULT NULL,
    `role_id` INT NULL DEFAULT NULL,
    `authority_id` INT NULL DEFAULT NULL,
    PRIMARY KEY (`id`),
    INDEX `administrator_id` (`administrator_id` ASC) VISIBLE,
    INDEX `role_id` (`role_id` ASC) VISIBLE,
    INDEX `FK9bhg0mvjtea3ad23u035ua97` (`authority_id` ASC) VISIBLE,
    CONSTRAINT `FK9bhg0mvjtea3ad23u035ua97`
    FOREIGN KEY (`authority_id`)
    REFERENCES `mydb2`.`authority_entity` (`id`)
    ON DELETE SET NULL
    ON UPDATE CASCADE,
    CONSTRAINT `FK_user_administrator`
    FOREIGN KEY (`administrator_id`)
    REFERENCES `mydb2`.`administrator` (`id`)
    ON DELETE SET NULL
    ON UPDATE CASCADE,
    CONSTRAINT `FK_user_role`
    FOREIGN KEY (`role_id`)
    REFERENCES `mydb2`.`roles_entity` (`id`)
    ON DELETE SET NULL
    ON UPDATE CASCADE)
    ENGINE = InnoDB
    AUTO_INCREMENT = 7
    DEFAULT CHARACTER SET = utf8mb4
    COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `mydb2`.`administrator`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb2`.`administrator` (
                                                       `id` INT NOT NULL AUTO_INCREMENT,
                                                       `email` VARCHAR(255) NULL DEFAULT NULL,
    `authority_id` INT NULL DEFAULT NULL,
    `user_id` INT NULL DEFAULT NULL,
    `roles_id` INT NULL DEFAULT NULL,
    `contratos_id` INT NULL DEFAULT NULL,
    PRIMARY KEY (`id`),
    UNIQUE INDEX `UKn6d01o511b7qtbh46ulcfolgq` (`contratos_id` ASC, `authority_id` ASC, `user_id` ASC) VISIBLE,
    INDEX `roles_foreignKey_idx` (`roles_id` ASC) VISIBLE,
    INDEX `FK62yc586qgnqe2aqkf06tahx55` (`user_id` ASC) VISIBLE,
    INDEX `FKb9bjviljcjb997v07bp8o8mda` (`authority_id` ASC) VISIBLE,
    CONSTRAINT `FK4p6hfo2mka8wo8fke1ucc0mvd`
    FOREIGN KEY (`contratos_id`)
    REFERENCES `mydb2`.`contract_entity` (`id`)
    ON DELETE SET NULL
    ON UPDATE CASCADE,
    CONSTRAINT `FK62yc586qgnqe2aqkf06tahx55`
    FOREIGN KEY (`user_id`)
    REFERENCES `mydb2`.`user_entity` (`id`)
    ON DELETE SET NULL
    ON UPDATE CASCADE,
    CONSTRAINT `FKb9bjviljcjb997v07bp8o8mda`
    FOREIGN KEY (`authority_id`)
    REFERENCES `mydb2`.`authority_entity` (`id`)
    ON DELETE SET NULL
    ON UPDATE CASCADE,
    CONSTRAINT `roles_foreignKey`
    FOREIGN KEY (`roles_id`)
    REFERENCES `mydb2`.`roles_entity` (`id`)
    ON DELETE SET NULL
    ON UPDATE CASCADE)
    ENGINE = InnoDB
    AUTO_INCREMENT = 12
    DEFAULT CHARACTER SET = utf8mb4
    COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `mydb2`.`contact_us_entity`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb2`.`contact_us_entity` (
                                                           `id` INT NOT NULL AUTO_INCREMENT,
                                                           `email` VARCHAR(255) NULL DEFAULT NULL,
    `message` VARCHAR(255) NULL DEFAULT NULL,
    `name` VARCHAR(255) NULL DEFAULT NULL,
    PRIMARY KEY (`id`))
    ENGINE = InnoDB
    DEFAULT CHARACTER SET = utf8mb4
    COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `mydb2`.`contratos_inventory`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb2`.`contratos_inventory` (
                                                             `id` INT NOT NULL AUTO_INCREMENT,
                                                             `item_name` VARCHAR(255) NULL DEFAULT NULL,
    `quantity` INT NULL DEFAULT NULL,
    `total_value` DECIMAL(38,2) NULL DEFAULT NULL,
    `unit_price` DECIMAL(38,2) NULL DEFAULT NULL,
    `contrato_id` INT NULL DEFAULT NULL,
    PRIMARY KEY (`id`),
    INDEX `contrato_id` (`contrato_id` ASC) VISIBLE,
    CONSTRAINT `FK_inventory_contract`
    FOREIGN KEY (`contrato_id`)
    REFERENCES `mydb2`.`contract_entity` (`id`)
    ON DELETE SET NULL
    ON UPDATE CASCADE)
    ENGINE = InnoDB
    DEFAULT CHARACTER SET = utf8mb4
    COLLATE = utf8mb4_0900_ai_ci;


-- -----------------------------------------------------
-- Table `mydb2`.`file_upload`
-- -----------------------------------------------------
CREATE TABLE IF NOT EXISTS `mydb2`.`file_upload` (
                                                     `id` INT NOT NULL AUTO_INCREMENT,
                                                     `file` LONGTEXT NULL DEFAULT NULL,
                                                     `file_name` VARCHAR(255) NULL DEFAULT NULL,
    `type` VARCHAR(255) NULL DEFAULT NULL,
    `contract_id` INT NULL DEFAULT NULL,
    PRIMARY KEY (`id`),
    INDEX `contract_id` (`contract_id` ASC) VISIBLE,
    CONSTRAINT `FK_file_contract`
    FOREIGN KEY (`contract_id`)
    REFERENCES `mydb2`.`contract_entity` (`id`)
    ON DELETE SET NULL
    ON UPDATE CASCADE)
    ENGINE = InnoDB
    DEFAULT CHARACTER SET = utf8mb4
    COLLATE = utf8mb4_0900_ai_ci;


SET SQL_MODE=@OLD_SQL_MODE;
SET FOREIGN_KEY_CHECKS=@OLD_FOREIGN_KEY_CHECKS;
SET UNIQUE_CHECKS=@OLD_UNIQUE_CHECKS;
