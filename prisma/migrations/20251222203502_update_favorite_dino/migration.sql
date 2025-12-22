/*
  Warnings:

  - A unique constraint covering the columns `[user_id,dino_name]` on the table `favorite_dinos` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `favorite_dinos_user_id_dino_name_key` ON `favorite_dinos`(`user_id`, `dino_name`);
