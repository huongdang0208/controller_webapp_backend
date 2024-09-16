/*
  Warnings:

  - A unique constraint covering the columns `[device_name]` on the table `device` will be added. If there are existing duplicate values, this will fail.
  - A unique constraint covering the columns `[email]` on the table `user` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX `device_device_name_key` ON `device`(`device_name`);

-- CreateIndex
CREATE UNIQUE INDEX `user_email_key` ON `user`(`email`);
